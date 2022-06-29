<template>
  <q-page>
    <div class="container">
      <div class="card">
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label caption>Hash:</q-item-label>
              <q-item-label><strong>{{ data.txid }}</strong></q-item-label>
              <q-item-label caption>{{data.confirmations}} Confirmações</q-item-label>
              <q-icon :name="data.confirmations > 6 ? 'done':'close'" :color="data.confirmations ? 'green':'red'" />
            </q-item-section>
          </q-item>
        <p>Taxas: {{data.fee}}</p>
        <p>Entradas: {{data.inputs_count}}</p>
        <p>Saidas: {{data.outputs_count}}</p>
        <p>Tempo: {{data.time}}</p>
      </div>
    </div>

    <div class="container row">
      <div class="col item">
        Entradas:
        <div v-for="transacao in data.inputs" :key="transacao.prev_addresses[0]">
          <p>{{transacao.prev_addresses[0]}}</p>
          <p>Valor: {{transacao.prev_value}}</p>
        </div>
      </div>

      <div class="item">
        Saidas:
        <div v-for="transacao in data.outputs" :key="transacao.addresses[0]">
          <p>
          Endereço: {{transacao.addresses[0]}}
          </p>
          <p>
          Valor: {{transacao.value}}
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getDataTransation } from "../../services/blockchain";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
  setup() {
    const data = ref('')
    return {
      data
    };
  },
  mounted() {
    this.getData(this.$route.params.txid);
  },
  methods: {
    getData(txID) {
      getDataTransation(txID).then((res) => {
        this.data = res.data;
      });
    },
  },
});
</script>

<style></style>
