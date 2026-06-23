<template>
  <div class="coins-list">
    <q-item class="coin-card bitcoin-card" bordered>
      <q-item-section avatar>
        <div class="crypto-badge">₿</div>
      </q-item-section>
      <q-item-section>
        <q-item-label class="coin-title">Bitcoin</q-item-label>
        <q-item-label class="coin-price" v-if="!loadingBitcoin">{{
          formatarMoeda(bitcoin.bid)
        }}</q-item-label>
        <q-skeleton v-else type="text" width="120px" />
      </q-item-section>
      <q-item-section side class="coin-stats" v-if="!loadingBitcoin">
        <div>
          <small>Max 24h</small>
          <span>{{ formatarMoeda(bitcoin.high) }}</span>
        </div>
        <div>
          <small>Min 24h</small>
          <span>{{ formatarMoeda(bitcoin.low) }}</span>
        </div>
      </q-item-section>
      <q-item-section side v-else>
        <q-skeleton type="text" width="80px" />
      </q-item-section>
    </q-item>

    <q-item class="coin-card ether-card" bordered>
      <q-item-section avatar>
        <div class="crypto-badge">Ξ</div>
      </q-item-section>
      <q-item-section>
        <q-item-label class="coin-title">Ethereum</q-item-label>
        <q-item-label class="coin-price" v-if="!loadingEther">{{
          formatarMoeda(ether.bid)
        }}</q-item-label>
        <q-skeleton v-else type="text" width="120px" />
      </q-item-section>
      <q-item-section side class="coin-stats" v-if="!loadingEther">
        <div>
          <small>Max 24h</small>
          <span>{{ formatarMoeda(ether.high) }}</span>
        </div>
        <div>
          <small>Min 24h</small>
          <span>{{ formatarMoeda(ether.low) }}</span>
        </div>
      </q-item-section>
      <q-item-section side v-else>
        <q-skeleton type="text" width="80px" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getCurrency } from "../services/blockchain";

export default defineComponent({
  name: "CoinsPage",
  setup() {
    const bitcoin = ref({});
    const ether = ref({});
    const loadingBitcoin = ref(false);
    const loadingEther = ref(false);
    return {
      bitcoin,
      ether,
      loadingBitcoin,
      loadingEther,
    };
  },
  mounted() {
    this.timerSequencial(false);
  },
  methods: {
    formatarMoeda(valor) {
      if (!valor) return "R$ 0,00";
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);
    },
    timerSequencial(isInterval = false) {
      if (isInterval) {
        setInterval(() => {
          this.getDataSequencial();
        }, 30000);
      } else {
        this.timerSequencial(true);
        this.getDataSequencial();
      }
    },
    async getDataSequencial() {
      this.loadingBitcoin = true;

      try {
        const res = await getCurrency("BTC-BRL");
        const obj = Array.isArray(res) ? res[0] : res;
        const key = Object.keys(obj)[0];
        this.bitcoin = obj[key];
      } catch (error) {
        console.error("Erro ao buscar Bitcoin:", error);
      } finally {
        this.loadingBitcoin = false;
      }

      // Aguarda 400ms antes de carregar Ethereum
      await new Promise((resolve) => setTimeout(resolve, 400));

      this.loadingEther = true;
      try {
        const res2 = await getCurrency("ETH-BRL");
        const obj2 = Array.isArray(res2) ? res2[0] : res2;
        const key2 = Object.keys(obj2)[0];
        this.ether = obj2[key2];
      } catch (error) {
        console.error("Erro ao buscar Ethereum:", error);
      } finally {
        this.loadingEther = false;
      }
    },
  },
});
</script>

<style scoped>
.coins-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
  min-width: 0;
}

.coin-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.16);
  padding: 1.2rem;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.coin-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.22);
}

.crypto-badge {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  font-size: 1.7rem;
  font-weight: 800;
  color: #111;
  background: #fff;
}

.bitcoin-card .crypto-badge {
  background: #f7c643;
}

.ether-card .crypto-badge {
  background: #8a9cff;
}

.coin-title {
  font-weight: 700;
  color: #fff;
}

.coin-price {
  display: block;
  font-size: 1.4rem;
  margin-top: 0.35rem;
  color: #fff;
}

.coin-stats {
  display: grid;
  gap: 0.8rem;
}

.coin-stats div {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 0.85rem 0.9rem;
}

.coin-stats small {
  display: block;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8rem;
}

.coin-stats span {
  display: block;
  color: #fff;
  font-weight: 700;
  margin-top: 0.25rem;
}

@media (max-width: 860px) {
  .coins-list {
    grid-template-columns: 1fr;
  }
}
</style>
