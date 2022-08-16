<template>
  <q-page>
    <div class="q-ma-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <q-card-section>
            <span>FEE:</span>
            <p>
              <strong>{{ data.fee }}</strong>
            </p>

            <q-icon name="calendar_today" />
            <span>DATE:</span>
            <p>
              <strong>{{ converteEpoc(data.time) }}</strong>
            </p>
            <span>CONFIRMATIONS:</span>
            <q-icon
              :name="data.confirmations > 6 ? 'done' : 'close'"
              :color="data.confirmations ? 'green' : 'red'"
            />
            <p>
              <strong>{{ data.confirmations }}</strong>
            </p>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            ENTRADAS
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expandedIn ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expandedIn = !expandedIn"
            />
          </q-card-actions>
          <q-slide-transition>
            <div v-show="expandedIn">
              <q-card-section class="text-subitle2">
                <div
                  class="item"
                  v-for="transacao in data.inputs"
                  :key="transacao.prev_addresses[0]"
                >
                  <p>Endereço: {{ transacao.prev_addresses[0] }}</p>
                  <p>Valor: {{ transacao.prev_value }}</p>
                </div>
              </q-card-section>
            </div>
          </q-slide-transition>

          <q-card-actions>
            SAIDAS
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expandedOut ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expandedOut = !expandedOut"
            />
          </q-card-actions>
          <q-slide-transition>
            <div v-show="expandedOut">
              <q-card-section class="text-subitle2">
                <div
                  class="item"
                  v-for="transacao in data.outputs"
                  :key="transacao.addresses[0]"
                >
                  <p>Endereço: {{ transacao.addresses[0] }}</p>
                  <p>Valor: {{ transacao.value }}</p>
                  <q-separator />
                </div>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { getDataTransation } from "../../services/blockchain";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ErrorNotFound",
  setup() {
    const $q = useQuasar();
    const data = ref("");
    const expandedIn = ref(false);
    const expandedOut = ref(false);
    return {
      data,
      expandedIn,
      expandedOut,
    };
  },
  mounted() {
    this.getData(this.$route.params.txid);
  },
  methods: {
    getData(txID) {
      this.$q.loading.show();
      getDataTransation(txID).then((res) => {
        this.data = res.data;
        this.$q.loading.hide();
      });
    },
    converteEpoc(time) {
      let tempoMl = new Date(time * 1000);
      const convertido = tempoMl.toLocaleString();
      return convertido;
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mycard {
  width: 100%;
  max-width: 500px;
}
.item {
  padding: 5px;
  margin-bottom: 8px;
  border: 1px solid;
  border-radius: 9px;
}
</style>
