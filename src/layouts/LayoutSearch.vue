<template>
  <q-layout view="hhh LpR fFf">
    <q-header reveal elevated >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          text-color="black"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="row">
          <img
            alt="Logo"
            src="~assets/logo.png"
            style="height: 35px"
          >
          <span class="text-black">LOCKINFO</span>
        </q-toolbar-title>

        <div>
          <q-input
            rounded
            dense
            outlined
            color="secondary"
            label-color="secondary"
            label="HASH"
            v-model="hash"
            @keyup.enter="buscar"
          />
        </div>
        <div>
          <q-btn
            flat
            dense
            round
            @click="toggleDarkMode"
            text-color="black"
            :icon="isDarkmode ? 'nightlight_round' : 'wb_sunny'"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <MenuLateral/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { getDataTransation, getDataAddress } from '../services/blockchain'
import { useRouter } from 'vue-router'
import { defineComponent, ref } from "vue";
import { useQuasar } from 'quasar'
import MenuLateral from "../components/MenuLateral.vue";

export default defineComponent({
  name: "MainLayout",
  components: { MenuLateral },

  setup() {
    const router = useRouter()
    const leftDrawerOpen = ref(false);
    let isDarkmode = ref(false)
    let hash = ref('')
    const $q = useQuasar()

    return {
      leftDrawerOpen,
      isDarkmode,
      hash,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleDarkMode(){
        isDarkmode.value = $q.dark.isActive
        console.log(isDarkmode)
        $q.dark.toggle()
      },
      buscar(){
        try {
          getDataAddress(hash.value)
          .then(()=>{
            console.log('aqui',this.$route)
            router.push(`/carteira/${hash.value}`)
          })
          .catch(()=>{
            getDataTransation(hash.value)
              .then(()=>{
                router.push(`/transacao/${hash.value}`)
              })
          })
        } catch (error) {
          console.log(error)
        }
      }
    };
  },
});
</script>
