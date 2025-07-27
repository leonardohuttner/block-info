<template>
  <div class="card">
    <div class="cards">
      <q-item>
        <q-item-section avatar>
          <q-icon name="img:bitcoin_icon.png" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Bitcoin</q-item-label>
          <q-item-label>{{ formatarMoeda(bitcoin.bid) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption
            >Max 24h {{ formatarMoeda(bitcoin.high) }}</q-item-label
          >
          <q-item-label caption
            >Min 24h {{ formatarMoeda(bitcoin.low) }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </div>
    <div class="cards">
      <q-item>
        <q-item-section avatar>
          <q-icon name="img:/ethereum.png" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Etherium</q-item-label>
          <q-item-label>{{ formatarMoeda(ether.bid) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption
            >Max 24h {{ formatarMoeda(ether.high) }}</q-item-label
          >
          <q-item-label caption
            >Min 24h {{ formatarMoeda(ether.low) }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </div>
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
    return {
      bitcoin,
      ether,
    };
  },
  mounted() {
    this.timer(false);
  },
  methods: {
    formatarMoeda(valor) {
      if (!valor) return "R$ 0,00";
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);
    },

    timer(value = false) {
      console.log(value);
      if (value) {
        setInterval(() => {
          this.getData();
        }, 30000);
      } else {
        this.timer(true);
        this.getData();
      }
    },
    getData() {
      getCurrency("BTC-BRL,ETH-BRL,USD-BRL").then((res) => {
        this.bitcoin = res.BTCBRL;
        this.ether = res.ETHBRL;
      });
    },
  },
});
</script>
<style scoped>
.card {
  background: rgba(247, 245, 245, 0.418);
  border-radius: 12px;
  z-index: 10;
  box-shadow: 2px 2px 5px rgba(50, 50, 50, 0.534);
}

@media (max-width: 1140px) {
  .card {
    display: flex;
    flex-direction: column;
    z-index: 10;
  }
}
@media (max-width: 475px) {
  .card {
    display: flex;
    flex-direction: column;
    z-index: 10;
  }
}
</style>
