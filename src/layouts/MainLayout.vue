<template>
  <q-layout view="hHh lpR fFf">
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
      <q-item-label header> BLOCKCHAIN </q-item-label>
      <MenuLateral
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from 'quasar'
import MenuLateral from "../components/MenuLateral.vue";

const linksList = [
    {
        title: 'Transação',
        caption: 'Descubra ou rastreie uma transação',
        icon: 'paid',
        link: 'https://forum.quasar.dev'
    },
    {
        title: 'Twitter',
        caption: '@quasarframework',
        icon: 'rss_feed',
        link: 'https://twitter.quasar.dev'
    },
    {
        title: 'Facebook',
        caption: '@QuasarFramework',
        icon: 'public',
        link: 'https://facebook.quasar.dev'
    },
    {
        title: 'Quasar Awesome',
        caption: 'Community Quasar projects',
        icon: 'favorite',
        link: 'https://awesome.quasar.dev'
    }
]

export default defineComponent({
  components: { MenuLateral },
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    let isDarkmode = ref(false)
    const $q = useQuasar()

    return {
      linksList,
      leftDrawerOpen,
      isDarkmode,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleDarkMode(){
        isDarkmode.value = $q.dark.isActive
        console.log(isDarkmode)
        $q.dark.toggle()
      }
    };
  },
});
</script>
