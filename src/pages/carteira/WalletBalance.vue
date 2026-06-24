<template>
  <q-page class="q-pa-md bg-dark text-white">
    <div class="column items-center q-gutter-md">
      <div
        class="q-gutter-sm items-center"
        style="max-width: 800px; width: 100%"
      >
        <q-input
          v-model="searchAddress"
          label="Endereço Bitcoin"
          class="full-width"
          :error="invalidAddress"
          :error-message="invalidAddress ? 'Endereço inválido' : ''"
          filled
          dense
          color="amber"
        />
        <q-btn
          label="Buscar"
          color="warning"
          @click="onSearch"
          rounded
          class="full-width"
        />
      </div>

      <!-- Loading -->
      <q-spinner color="primary" size="40px" v-if="loading" />

      <!-- Dados do endereço -->
      <q-card
        v-if="!loading && data.address"
        class="q-pa-md comprovante shadow-2 rounded-borders bg-grey-10 text-white"
        style="
          max-width: 800px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.12);
        "
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

          <div v-for="tx in paginatedTxs" :key="tx.hash" class="q-my-sm">
            <q-card
              class="bg-grey-10 q-pa-sm rounded-borders text-white"
              style="border: 1px solid rgba(255, 255, 255, 0.12)"
            >
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
          <div class="row justify-center q-mt-md text-white">
            <q-pagination
              v-model="currentPage"
              :max="totalPages"
              direction-links
              boundary-links
              color="amber"
              size="sm"
            />
          </div>
        </q-card-section>
      </q-card>
      <q-card
        class="q-pa-md bg-grey-10 rounded-borders text-center text-white"
        v-if="data.address"
        style="border: 1px solid rgba(255, 255, 255, 0.12)"
      >
        <div class="text-subtitle1">QR Code do Endereço</div>
        <qrcode-vue :value="data.address" :size="180" class="q-my-md" />
        <div class="text-caption">{{ data.address }}</div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
  },
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
    const routes = useRoute();

    const isValidAddress = (addr) => {
      if (typeof addr !== "string") return false;

      // Base58Check: P2PKH ou P2SH
      const base58Regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;

      // Bech32: bc1q... (P2WPKH) ou bc1p... (P2TR)
      const bech32Regex = /^(bc1)[0-9ac-hj-np-z]{11,71}$/;

      return base58Regex.test(addr) || bech32Regex.test(addr);
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
        const res = await fetch(
          `https://n8n-oracle.leonardohuttner.com.br/webhook/api/carteira?id=${addr}`
        );
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
      getData(routes.params.addr);
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
.comprovante {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  font-family: "Courier New", Courier, monospace;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
}
.rounded-borders {
  border-radius: 12px;
}
</style>
