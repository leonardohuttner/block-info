<template>
  <div class="wallet-page">
    <section class="wallet-hero">
      <h1>Como funciona uma Wallet</h1>
      <p>
        Uma wallet (carteira) armazena chaves que permitem controlar seus
        bitcoins. A chave pública gera endereços que recebem fundos; a chave
        privada assina transações para gastar esses fundos. As wallets exibem o
        saldo, histórico de transações e endereços associados.
      </p>
      <div class="wallet-steps">
        <div>
          <strong>Endereço</strong>
          <p>Representação pública que recebe fundos (compartilhável).</p>
        </div>
        <div>
          <strong>Chave privada</strong>
          <p>Somente você deve ter — permite gastar os fundos do endereço.</p>
        </div>
        <div>
          <strong>UTXOs</strong>
          <p>
            Unspent Transaction Outputs: pedaços de saldo que somam seu balanço.
          </p>
        </div>
      </div>
    </section>

    <section class="wallet-search">
      <h2>Pesquisar uma carteira</h2>
      <p>
        Digite um endereço (ou parte dele) e veja um preview rápido ou abra a
        página completa.
      </p>

      <div class="search-row">
        <input
          v-model="addr"
          placeholder="Cole um endereço (ex.: 1A1zP1...)"
          @keyup.enter="search"
        />
        <button @click="preview" :disabled="loading || !addr">
          Visualizar
        </button>
        <button class="primary" @click="search" :disabled="!addr">
          Abrir página
        </button>
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <div v-if="loading" class="preview-card">
        <div class="skeleton title"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line short"></div>
      </div>

      <div v-if="previewData" class="preview-card">
        <div class="preview-header">
          <h3>Endereço: {{ previewData.addr || addr }}</h3>
          <div class="balance">
            Saldo: {{ formatBTC(previewData.final_balance) }} BTC
          </div>
        </div>
        <div class="preview-body">
          <div>
            <strong>Transações:</strong>
            {{ (previewData.txs && previewData.txs.length) || 0 }}
          </div>
          <ul class="tx-list">
            <li v-for="(tx, i) in (previewData.txs || []).slice(0, 5)" :key="i">
              <router-link :to="`/transacao/${tx.hash}`">{{
                shortHash(tx.hash)
              }}</router-link>
              <span class="tx-value">{{ formatBTC(tx.value) }} BTC</span>
            </li>
          </ul>
        </div>
        <div class="preview-actions">
          <router-link :to="`/carteira/${addr}`" class="open-full"
            >Abrir página completa</router-link
          >
        </div>
      </div>

      <div class="examples">
        <span>Exemplos rápidos:</span>
        <button @click="useExample('1BoatSLRHtKNngkdXEeobR76b53LETtpyT')">
          1BoatSLR...
        </button>
        <button @click="useExample('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy')">
          3J98t1W...
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { getDataAddress } from "src/services/blockchain";

export default {
  name: "WalletIndex",
  data() {
    return {
      addr: "",
      loading: false,
      error: null,
      previewData: null,
    };
  },
  methods: {
    formatBTC(sat) {
      const v = Number(sat) || 0;
      return (v / 1e8).toFixed(8);
    },
    shortHash(h) {
      if (!h) return "-";
      return h.slice(0, 12) + "...";
    },
    search() {
      if (!this.addr) return;
      // navigate to wallet details page
      this.$router.push(`/carteira/${encodeURIComponent(this.addr)}`);
    },
    preview() {
      if (!this.addr) return;
      this.loading = true;
      this.error = null;
      this.previewData = null;
      getDataAddress(this.addr)
        .then((res) => {
          // service already normaliza arrays -> objeto
          this.previewData = res;
        })
        .catch((err) => {
          console.error(err);
          this.error = "Não foi possível buscar o endereço.";
        })
        .finally(() => (this.loading = false));
    },
    useExample(example) {
      this.addr = example;
      this.preview();
    },
  },
};
</script>

<style scoped>
.wallet-page {
  color: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: #070c15;
  border-radius: 24px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
}

.wallet-hero h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.wallet-hero p {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 1rem;
}

.wallet-steps {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .wallet-steps {
    flex-direction: column;
  }

  .search-row {
    flex-direction: column;
  }

  .search-row button {
    width: 100%;
  }

  .preview-body {
    grid-template-columns: 1fr;
  }
}

.wallet-steps div {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem;
  border-radius: 12px;
  flex: 1;
  min-width: 220px;
}

.wallet-search {
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

@media (max-width: 720px) {
  .wallet-steps {
    flex-direction: column;
  }

  .search-row {
    flex-direction: column;
  }

  .search-row button {
    width: 100%;
  }
}

.search-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.search-row input {
  flex: 1;
  min-width: 220px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.search-row button {
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  min-width: 120px;
}

.search-row button.primary {
  background: linear-gradient(90deg, #ffb24d, #ff8b00);
  color: #111;
  font-weight: 700;
}

.preview-card {
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance {
  font-weight: 700;
  color: #ffb24d;
}

.tx-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}

.tx-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.03);
}

.preview-actions {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.open-full {
  color: #ffb24d;
  font-weight: 700;
}

.examples {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.examples button {
  background: rgba(255, 255, 255, 0.04);
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.06)
  );
  border-radius: 6px;
  margin-bottom: 0.6rem;
}

.skeleton.title {
  height: 18px;
  width: 50%;
}
.skeleton.line {
  height: 12px;
  width: 100%;
}
.skeleton.line.short {
  width: 60%;
}

.error {
  color: #ff6b6b;
  margin-top: 0.75rem;
}
</style>
