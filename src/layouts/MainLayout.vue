<template>
  <q-layout view="hHh lpR lFf">
    <q-header reveal elevated>
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
          <img alt="Logo" src="~assets/logo.png" style="height: 35px" />
          <a href="/">
            <span class="text-black">LOCKINFO</span>
          </a>
        </q-toolbar-title>

        <div>
          <q-btn
            icon-right="login"
            color="secondary"
            label="login"
            to="/login"
            rounded
          />
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
      <MenuLateral />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import MenuLateral from "../components/MenuLateral.vue";

export default defineComponent({
  components: { MenuLateral },
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    let isDarkmode = ref(false);
    const $q = useQuasar();

    return {
      leftDrawerOpen,
      isDarkmode,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleDarkMode() {
        isDarkmode.value = $q.dark.isActive;
        console.log(isDarkmode);
        $q.dark.toggle();
      },
    };
  },
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
