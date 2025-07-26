<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="column items-center q-gutter-md">
      <!-- Pesquisar outro endereço -->
      <div class="row q-gutter-sm items-center">
        <q-input
          v-model="searchAddress"
          label="Endereço Bitcoin"
          :error="invalidAddress"
          :error-message="invalidAddress ? 'Endereço inválido' : ''"
          filled
          dense
          class="bg-white rounded-borders"
        />
        <q-btn label="Buscar" color="primary" @click="onSearch" rounded />
      </div>

      <!-- QR Code do endereço -->
      <!--
      <q-card class="q-pa-md bg-white rounded-borders text-center" v-if="data.address">
        <div class="text-subtitle1">QR Code do Endereço</div>
        <qrcode-vue :value="data.address" :size="180" class="q-my-md" />
        <div class="text-caption">{{ data.address }}</div>
      </q-card>
      -->

      <!-- Loading -->
      <q-spinner color="primary" size="40px" v-if="loading" />

      <!-- Dados do endereço -->
      <q-card
        v-if="!loading && data.address"
        class="q-pa-md bg-white shadow-2 rounded-borders"
        style="max-width: 800px; width: 100%"
      >
        <q-card-section>
          <div class="text-h6">📄 Recibo de Bitcoin</div>
          <div class="text-caption text-grey">
            Endereço: <strong>{{ data.address }}</strong>
          </div>
          <div>
            <strong>Total de transações:</strong> {{ data.total_trasations }}
          </div>
          <div>
            <strong>Saldo:</strong> {{ satoshiForBtc(data.final_balance) }} BTC
          </div>
          <div>
            <strong>Total Recebido:</strong>
            {{ satoshiForBtc(data.total_received) }} BTC
          </div>
        </q-card-section>

        <q-separator />

        <!-- Paginação -->
        <q-card-section>
          <div class="text-subtitle2">
            📜 Transações ({{ paginatedTxs.length }} de
            {{ data.total_trasations }})
          </div>

          <div v-for="(tx, idx) in paginatedTxs" :key="tx.hash" class="q-my-sm">
            <q-card class="bg-grey-2 q-pa-sm rounded-borders">
              <div class="text-bold">Hash: {{ tx.hash }}</div>
              <div>Taxa: {{ satoshiForBtc(tx.fee) }} BTC</div>
              <div class="row q-gutter-md">
                <div>
                  <div class="text-caption text-bold">De:</div>
                  <div
                    v-for="input in tx.inputs"
                    :key="input.prev_out.addr"
                    class="text-blue cursor-pointer"
                    @click="getData(input.prev_out.addr)"
                  >
                    {{ input.prev_out.addr || "Desconhecido" }}
                  </div>
                </div>
                <div>
                  <div class="text-caption text-bold">Para:</div>
                  <div
                    v-for="out in tx.out"
                    :key="out.addr"
                    class="text-green cursor-pointer"
                    @click="getData(out.addr)"
                  >
                    {{ out.addr || "Desconhecido" }}
                  </div>
                </div>
              </div>
            </q-card>
          </div>

          <!-- Paginação controles -->
          <div class="row justify-center q-mt-md">
            <q-pagination
              v-model="currentPage"
              :max="totalPages"
              direction-links
              boundary-links
              color="primary"
              size="sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
// import QrcodeVue from 'qrcode.vue' // ❌ Comentado: não está sendo usado por enquanto

export default {
  // components: {
  //   QrcodeVue
  // },
  setup() {
    const data = ref({
      txs: [],
      address: "",
      total_received: 0,
      final_balance: 0,
      total_trasations: 0,
    });
    const searchAddress = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 5;
    const loading = ref(false);
    const invalidAddress = ref(false);

    const $q = useQuasar();
    const route = useRoute();

    const isValidAddress = (addr) => {
      return (
        typeof addr === "string" &&
        /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr)
      );
    };

    const satoshiForBtc = (satoshis) => {
      return (Number(satoshis) / 1e8).toFixed(8);
    };

    const totalPages = computed(() => {
      return Math.ceil(data.value.txs.length / itemsPerPage);
    });

    const paginatedTxs = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return data.value.txs.slice(start, start + itemsPerPage);
    });

    const getData = async (addr) => {
      if (!isValidAddress(addr)) {
        invalidAddress.value = true;
        return;
      }
      invalidAddress.value = false;
      loading.value = true;
      currentPage.value = 1;

      try {
        const res = await fetch(`https://blockchain.info/rawaddr/${addr}`);
        if (!res.ok) throw new Error("Endereço não encontrado");
        const json = await res.json();
        data.value = {
          ...json,
          total_trasations: json.txs.length,
        };
        searchAddress.value = addr;
      } catch (err) {
        $q.notify({ type: "negative", message: err.message });
      } finally {
        loading.value = false;
      }
    };

    const onSearch = () => {
      getData(searchAddress.value);
    };

    onMounted(() => {
      getData(route.params.addr);
    });

    return {
      data,
      getData,
      satoshiForBtc,
      searchAddress,
      currentPage,
      totalPages,
      paginatedTxs,
      loading,
      invalidAddress,
      onSearch,
    };
  },
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
</style>
