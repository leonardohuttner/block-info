<template>
  <q-page padding class="bg-dark text-white flex flex-center">
    <q-card class="receipt-card" v-if="data">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">
          📄 Comprovante de Transação - Bloco {{ data.height }}
        </div>
        <q-btn
          dense
          flat
          :label="`Ver em ${moeda === 'BRL' ? 'USD' : 'BRL'}`"
          @click="alternarMoeda"
          class="bg-green-3"
        />
      </q-card-section>

      <q-separator color="grey-6" />

      <q-card-section>
        <div><strong>Data e Hora:</strong> {{ formatarData(data.time) }}</div>
        <div><strong>Confirmações:</strong> {{ data.confirmations }}</div>
        <div>
          <strong>Status:</strong>
          <q-badge :color="statusCor" text-color="white" class="q-ml-sm">
            <q-icon :name="statusIcon" class="q-mr-xs" />
            {{ statusTransacao }}
          </q-badge>
        </div>
        <div>
          <strong>Taxa:</strong> {{ formatarValor(data.fee) }} {{ moeda }}
        </div>
      </q-card-section>

      <q-separator color="grey-6" />

      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">Entradas</div>
        <q-item v-for="(entrada, index) in entradas" :key="'in' + index" dense>
          <q-item-section avatar>
            <q-icon name="arrow_back" color="red" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ entrada.endereco }}</q-item-label>
            <q-item-label caption
              >{{ formatarValor(entrada.valor) }} {{ moeda }}</q-item-label
            >
          </q-item-section>
        </q-item>

        <div class="text-subtitle2 q-mt-md q-mb-sm">Saídas</div>
        <q-item v-for="(saida, index) in saidas" :key="'out' + index" dense>
          <q-item-section avatar>
            <q-icon name="arrow_forward" color="green" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ saida.endereco }}</q-item-label>
            <q-item-label caption
              >{{ formatarValor(saida.valor) }} {{ moeda }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator color="grey-6" />

      <q-card-section class="text-right">
        <q-badge
          color="blue-8"
          text-color="white"
          align="middle"
          class="q-pa-md"
        >
          Total transacionado: {{ formatarValor(totalSaida) }} {{ moeda }}
        </q-badge>
      </q-card-section>
      <q-btn
        class="full-height bg-green-7 text-white"
        label="compartilhar transacao"
      />
    </q-card>

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
    getData(txID) {
      this.$q.loading.show();
      getCurrency("BTC-BRL,BTC-USD").then((res) => {
        this.cotacoes.BRL = res.BTCBRL.bid;
        this.cotacoes.USD = res.BTCUSD.bid;
      });
      getDataTransation(txID).then((res) => {
        this.data = res;
        this.$q.loading.hide();
      });
    },
    alternarMoeda() {
      this.moeda = this.moeda === "BRL" ? "USD" : "BRL";
    },
    formatarData(timestamp) {
      const data = new Date(Number(timestamp) * 1000);
      return data.toLocaleString("pt-BR");
    },
    formatarValor(valorBTC) {
      const cotacao = this.cotacoes[this.moeda] || 0;
      const valor = parseFloat(valorBTC) * cotacao;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: this.moeda,
      }).format(valor);
    },
  },
  mounted() {
    const txID = this.$route.params.txid;
    this.getData(txID);
  },
};
</script>

<style scoped>
.receipt-card {
  width: 100%;
  max-width: 700px;
  background: #fff8dc; /* cor papel amarelado */
  border: 1px solid #f3e6b2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #333;
  font-family: "Courier New", Courier, monospace;
  padding: 1rem;
  border-radius: 8px;
}
</style>
