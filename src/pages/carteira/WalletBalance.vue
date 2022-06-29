<template>
<q-page>
  <p>Endereço Bitcoin</p>
<div class="wrapper">
  <div>
    <section>
      Transaçoes: <p>{{data.total_trasations}}
      </p>
    </section>
  </div>
  <div>
    <div>
      <section>
      Endereço: <p>{{data.address}}</p>
      </section>
      <section>
        Saldo: <p>{{this.satoshiForBtc(data.final_balance)}}</p>
        Total recebido: <p>{{this.satoshiForBtc(data.total_received)}}</p>
      </section>
    </div>
  </div>
  <div>
    <div v-for="transacao in data.txs" :key="transacao.hash">
      <section>
        Hash:{{transacao.hash}}
        Taxa: {{this.satoshiForBtc(transacao.fee)}}
      </section>
    </div>
  </div>
</div>
</q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getDataAddress } from "../../services/blockchain";

export default defineComponent ({
    setup() {
      const data = ref("");

    return {
      data,
    }
  },
  mounted() {
    this.getData(this.$route.params.addr);
  },
  computed:{

  },
  methods: {
    getData(addr) {
      getDataAddress(addr)
        .then((res) => {
          this.data = res;
          this.data.total_trasations = res.txs.length
        });
    },
    satoshiForBtc(satoshis){
      const bitcoin = Number(satoshis) / 100000000
      return bitcoin
    }
  },
});
</script>

<style></style>
