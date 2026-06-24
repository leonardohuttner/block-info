<template>
  <div class="transaction-page">
    <section class="transaction-hero">
      <h1>Como funciona uma transação</h1>
      <p>
        Uma transação na blockchain é o registro de envio e recebimento de
        bitcoins entre endereços. Cada transação agrupa entradas (fundos que
        saem) e saídas (destinos dos fundos), criando um histórico imutável na
        rede.
      </p>
      <div class="transaction-steps">
        <div>
          <strong>TXID</strong>
          <p>Hash única que identifica cada transação na blockchain.</p>
        </div>
        <div>
          <strong>Entradas</strong>
          <p>De onde os bitcoins vieram (endereços que gastaram fundos).</p>
        </div>
        <div>
          <strong>Saídas</strong>
          <p>Para onde os bitcoins foram enviados.</p>
        </div>
      </div>
    </section>

    <section class="transaction-search">
      <h2>Pesquisar uma transação</h2>
      <p>Cole um TXID e veja o recibo completo da transação.</p>

      <div class="search-row">
        <input
          v-model="txid"
          placeholder="Cole um TXID válido"
          @keyup.enter="search"
        />
        <button class="primary" @click="search" :disabled="!txid">
          Abrir transação
        </button>
      </div>

      <div v-if="loading" class="loading-state">Carregando transação...</div>
      <div v-else-if="error" class="error">{{ error }}</div>

      <div class="examples">
        <span>Exemplos rápidos:</span>
        <button
          @click="
            useExample(
              'b6f6991d9e3d1f36f2c0e8d6b59e9c9c8a8d1be3a585d5c1f12f0d5d7a4f2a77'
            )
          "
        >
          b6f699...
        </button>
        <button
          @click="
            useExample(
              '4b8e2a3bdb4139e33b19c76c1f3f1b44bdf4e2b7a2755a7a1c3f5b6d8e9c0d1f'
            )
          "
        >
          4b8e2a...
        </button>
      </div>

      <div v-if="previewData" class="preview-card">
        <div class="preview-header">
          <h3>TXID:</h3>
          <strong>{{ shortHash(previewData.txid || txid) }}</strong>
        </div>

        <div class="preview-body">
          <div><strong>Bloco:</strong> {{ previewData.height || "—" }}</div>
          <div>
            <strong>Confirmações:</strong>
            {{ previewData.confirmations || "—" }}
          </div>
          <div>
            <strong>Entradas:</strong> {{ previewData.inputs?.length || 0 }}
          </div>
          <div>
            <strong>Saídas:</strong> {{ previewData.outputs?.length || 0 }}
          </div>
          <div><strong>Taxa:</strong> {{ formatBTC(previewData.fee) }} BTC</div>
        </div>

        <div class="preview-actions">
          <router-link :to="`/transacao/${txid}`" class="open-full"
            >Abrir detalhes</router-link
          >
        </div>
      </div>

      <div v-if="error" class="error">{{ error }}</div>
    </section>
  </div>
</template>

<script>
import { getDataTransation } from "src/services/blockchain";

export default {
  name: "TransacaoIndex",
  data() {
    return {
      txid: "",
      previewData: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    search() {
      if (!this.txid) return;
      this.$router.push(`/transacao/${encodeURIComponent(this.txid)}`);
    },
    shortHash(value) {
      if (!value) return "-";
      return `${value.slice(0, 12)}...`;
    },
    formatBTC(value) {
      const amount = Number(value) || 0;
      return (amount / 1e8).toFixed(8);
    },
    useExample(value) {
      this.txid = value;
      this.preview();
    },
    preview() {
      if (!this.txid) return;
      this.error = null;
      this.previewData = null;
      this.loading = true;
      getDataTransation(this.txid)
        .then((res) => {
          this.previewData = res;
        })
        .catch(() => {
          this.error = "Não foi possível buscar a transação.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    txid(newVal) {
      if (!newVal) {
        this.previewData = null;
        this.error = null;
      }
    },
  },
};
</script>

<style scoped>
.transaction-page {
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

.transaction-hero h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.transaction-hero p {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 1rem;
}

.transaction-steps {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.transaction-steps div {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem;
  border-radius: 12px;
  flex: 1;
}

.transaction-search {
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.search-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 1rem;
}

.search-row input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
}

.search-row button {
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(90deg, #ffb24d, #ff8b00);
  color: #111;
  font-weight: 700;
  cursor: pointer;
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
  gap: 1rem;
}

.preview-body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

@media (max-width: 720px) {
  .preview-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .transaction-steps {
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

.preview-actions {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.open-full {
  color: #ffb24d;
  font-weight: 700;
}

.loading-state {
  margin-top: 1rem;
  color: #ffd369;
}

@media (max-width: 720px) {
  .transaction-steps {
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

.error {
  color: #ff6b6b;
  margin-top: 0.75rem;
}
</style>
