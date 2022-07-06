<template>
  <q-page>
    <div class="container">

      <div class="card row">
        <div class="side-left col">
          <p>Receipt for</p>
          <p><strong>BITCOIN</strong></p>
          <hr>

          <section>
            <span>
              <q-icon name="wallet"/>
              <span>FEE:</span>
              <p><strong>{{data.fee}}</strong></p>
              <hr>
            </span>
          </section>

          <section>
            <span>
              <q-icon name="calendar_today"/>
              <span>DATE:</span>
              <p><strong>{{data.time}}</strong></p>
              <hr>
            </span>
          </section>

          <section>
            <span>
              <q-icon name="receipt"/>
              <span>CONFIRMATIONS:</span>
              <p><strong>{{data.confirmations}}</strong></p>
              <q-icon :name="data.confirmations > 6 ? 'done':'close'" :color="data.confirmations ? 'green':'red'" />
              <hr>
            </span>
          </section>
        </div>

        <div class="side-rigth col">
          <p>
            <q-icon name="monetization_on"/>
            <span>
              {{data.time}}
            </span>
          </p>
          <hr>
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { getDataTransation } from "../../services/blockchain";
import { defineComponent, ref } from "vue";
import {useQuasar} from 'quasar'

export default defineComponent({
  name: "ErrorNotFound",
  setup() {
    const $q = useQuasar();
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
      this.$q.loading.show()
      getDataTransation(txID).then((res) => {
        this.data = res.data;
        this.$q.loading.hide()
      });
    },
  },
});
</script>

<style scoped>
  .container{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .card {
    width: 600px;
    height: 600px;
    border: 1px solid;
    border-radius: 7px;
    background: rgb(161, 35, 35);
  }
  .side-left{
    background: rgb(22, 16, 16);
    color: rgb(245, 241, 241);
  }
  .side-rigth{
    background-color: white;
    color: rgb(37, 37, 37);
  }
</style>
