<template>
  <q-page padding class="bg-dark text-white flex justify-center">
    <div v-if="loading" class="text-white q-mt-xl">Carregando transação...</div>
    <div v-else-if="error" class="text-negative q-mt-xl">{{ error }}</div>
    <div class="receipt-shell" v-else-if="data">
      <div class="receipt-header row items-center justify-between">
        <div>
          <div class="receipt-title">RECIBO DE TRANSAÇÃO</div>
          <div class="receipt-subtitle">BlockInfo - comprovante digital</div>
        </div>
        <q-btn
          dense
          flat
          :label="`Ver em ${moeda === 'BRL' ? 'USD' : 'BRL'}`"
          @click="alternarMoeda"
          class="receipt-action"
        />
      </div>

      <div class="receipt-meta">
        <div class="meta-item">
          <span>TXID</span>
          <strong>{{ data.txid }}</strong>
        </div>
        <div class="meta-item">
          <span>Bloco</span>
          <strong>{{ data.height }}</strong>
        </div>
        <div class="meta-item">
          <span>Data</span>
          <strong>{{ formatarData(data.time) }}</strong>
        </div>
      </div>

      <div class="receipt-status row items-center justify-between">
        <div>
          <span>Status</span>
          <div class="status-badge" :data-status="statusTransacao">
            <q-icon :name="statusIcon" /> {{ statusTransacao }}
          </div>
        </div>
        <div>
          <span>Confirmações</span>
          <strong>{{ data.confirmations }}</strong>
        </div>
        <div>
          <span>Taxa</span>
          <div class="text-caption text-grey">
            {{ formatarValorComSatoshis(data.fee) }}
          </div>
        </div>
      </div>

      <div class="receipt-section">
        <div class="receipt-section-title">Entradas</div>
        <div class="receipt-lines">
          <div
            class="receipt-line"
            v-for="(entrada, index) in entradas"
            :key="'in' + index"
          >
            <span class="line-label">{{ entrada.endereco }}</span>
            <div class="line-value">
              <div>{{ formatarValor(entrada.valor) }} {{ moeda }}</div>
              <div class="text-caption text-grey">
                {{ formatarSatoshis(entrada.valor) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="receipt-section">
        <div class="receipt-section-title">Saídas</div>
        <div class="receipt-lines">
          <div
            class="receipt-line"
            v-for="(saida, index) in saidas"
            :key="'out' + index"
          >
            <span class="line-label">{{ saida.endereco }}</span>
            <div class="line-value">
              <div>{{ formatarValor(saida.valor) }} {{ moeda }}</div>
              <div class="text-caption text-grey">
                {{ formatarSatoshis(saida.valor) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="receipt-summary row items-center justify-between">
        <div>
          <div class="summary-label">Total transacionado</div>
          <div class="summary-value">
            {{ formatarValor(totalSaida) }} {{ moeda }}
          </div>
          <div class="text-caption text-grey">
            {{ formatarSatoshis(totalSaida) }}
          </div>
        </div>
        <q-btn
          class="receipt-share bg-green-7 text-white"
          label="Compartilhar"
        />
      </div>

      <div class="receipt-note">
        <strong>Nota:</strong> Este recibo mostra todas as informações
        principais da transação e serve como comprovante para o usuário.
      </div>
    </div>

    <div v-else class="text-white q-mt-xl">Carregando transação...</div>
  </q-page>
</template>

<script>
import { getDataTransation, getCurrency } from "../../services/blockchain";

export default {
  name: "TransactionReceipt",
  data() {
    return {
      data: null,
      moeda: "BRL",
      cotacoes: {
        BRL: 0,
        USD: 0,
      },
      loading: false,
      error: null,
    };
  },
  computed: {
    entradas() {
      if (!this.data || !this.data.inputs) return [];
      return this.data.inputs.map((i) => ({
        endereco: i.prev_addresses?.[0] || "Desconhecido",
        valor: parseFloat(i.prev_value),
      }));
    },
    saidas() {
      if (!this.data || !this.data.outputs) return [];
      return this.data.outputs.map((o) => ({
        endereco: o.addresses?.[0] || "Desconhecido",
        valor: parseFloat(o.value),
      }));
    },
    totalSaida() {
      return this.saidas.reduce((acc, s) => acc + s.valor, 0);
    },
    statusTransacao() {
      const conf = Number(this.data?.confirmations || 0);
      return conf > 6 ? "Confirmada" : "Pendente";
    },
    statusIcon() {
      return this.statusTransacao === "Confirmada"
        ? "check_circle"
        : "hourglass_empty";
    },
    statusCor() {
      return this.statusTransacao === "Confirmada" ? "green" : "orange";
    },
  },

  methods: {
    async getData(txID) {
      this.error = null;
      this.loading = true;
      try {
        const [cotacao, transacao] = await Promise.all([
          getCurrency("BTC-BRL,BTC-USD"),
          getDataTransation(txID),
        ]);
        // Debug: log da resposta da cotação
        console.log("Resposta getCurrency:", cotacao);
        // Validar e extrair cotações com segurança
        if (cotacao?.BTCBRL?.bid) {
          this.cotacoes.BRL = cotacao.BTCBRL.bid;
        } else {
          this.cotacoes.BRL = 0;
        }
        if (cotacao?.BTCUSD?.bid) {
          this.cotacoes.USD = cotacao.BTCUSD.bid;
        } else {
          this.cotacoes.USD = 0;
        }
        this.data = transacao;
      } catch (err) {
        console.error(err);
        this.error = "Não foi possível carregar a transação.";
      } finally {
        this.loading = false;
      }
    },
    alternarMoeda() {
      this.moeda = this.moeda === "BRL" ? "USD" : "BRL";
    },
    formatarData(timestamp) {
      const data = new Date(Number(timestamp) * 1000);
      return data.toLocaleString("pt-BR");
    },
    formatarValor(satoshis) {
      // Converter satoshis para BTC (1 BTC = 100000000 satoshis)
      const btc = parseFloat(satoshis) / 100000000;
      const cotacao = this.cotacoes[this.moeda] || 1;
      const valor = btc * cotacao;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: this.moeda,
      }).format(valor);
    },
    formatarValorComSatoshis(satoshis) {
      const btc = parseFloat(satoshis) / 100000000;
      const cotacao = this.cotacoes[this.moeda] || 1;
      const valor = btc * cotacao;
      const formattedValor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: this.moeda,
      }).format(valor);
      const formattedSatoshis = parseFloat(satoshis).toLocaleString("pt-BR");
      return `${formattedValor} (${formattedSatoshis} sat)`;
    },
    formatarSatoshis(satoshis) {
      const numSatoshis = parseFloat(satoshis);
      return `${numSatoshis.toLocaleString("pt-BR")} sat`;
    },
  },
  mounted() {
    const txID = this.$route.params.txid;
    this.getData(txID);
  },
};
</script>

<style scoped>
.receipt-shell {
  width: min(860px, 100%);
  background: #11171f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
  color: #f4f7fb;
  font-family: "Courier New", Courier, monospace;
  padding: 1.2rem 1.5rem;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
}

.receipt-shell::before,
.receipt-shell::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 18px;
  left: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.06) 10px,
    rgba(0, 0, 0, 0.06) 12px
  );
}

.receipt-shell::before {
  top: 0;
}

.receipt-shell::after {
  bottom: 0;
}

.receipt-header {
  margin-bottom: 1rem;
}

.receipt-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.receipt-subtitle {
  font-size: 0.85rem;
  color: #6d5a12;
  margin-top: 0.35rem;
}

.receipt-action {
  color: #fff;
  background: #2a7f39;
}

.receipt-meta,
.receipt-status,
.receipt-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 720px) {
  .receipt-meta,
  .receipt-status,
  .receipt-summary {
    grid-template-columns: 1fr;
  }
}

.meta-item,
.receipt-status > div {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 0.9rem 1rem;
}

.meta-item span,
.receipt-status span {
  display: block;
  font-size: 0.8rem;
  color: #b8b8b8;
}

.meta-item strong,
.receipt-status strong {
  display: block;
  margin-top: 0.45rem;
  font-size: 1rem;
  color: #f4f7fb;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.75rem;
  border-radius: 18px;
  color: #fff;
  background: #3a8f4e;
  font-weight: 700;
}

.status-badge[data-status="Pendente"] {
  background: #d47a00;
}

.receipt-section {
  margin-bottom: 1rem;
}

.receipt-section-title {
  font-size: 0.95rem;
  color: #d8c380;
  margin-bottom: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.receipt-lines {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 0.75rem;
}

.receipt-line {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
}

.receipt-line:last-child {
  border-bottom: none;
}

.line-label {
  flex: 1 1 60%;
  color: #e2eaf3;
  font-size: 0.92rem;
  overflow-wrap: anywhere;
}

.line-value {
  flex: 0 0 auto;
  font-weight: 700;
  color: #f4f7fb;
}

.summary-label {
  font-size: 0.9rem;
  color: #5c5024;
}

.summary-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: #1f1f1f;
}

.receipt-share {
  min-width: 170px;
}

.receipt-note {
  margin-top: 1.2rem;
  padding: 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.82);
  color: #403514;
  font-size: 0.9rem;
}

@media (max-width: 960px) {
  .receipt-meta,
  .receipt-status,
  .receipt-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .receipt-shell {
    padding: 1rem;
  }

  .receipt-action {
    width: 100%;
  }
}
</style>
