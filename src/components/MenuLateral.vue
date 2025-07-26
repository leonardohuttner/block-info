<template>
  <q-item-label header> BLOCKCHAIN </q-item-label>
  <q-list v-for="link in linksList" :key="link.link">
    <q-item :to="link.link" exact clickable v-ripple active-class="bg-yellow">
      <q-item-section avatar>
        <q-icon :name="link.icon" class="" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ link.title }}</q-item-label>
        <q-item-label caption>{{ link.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

const linksList = [
  {
    title: "Transação",
    caption: "Descubra ou rastreie uma transação.",
    icon: "swap_horiz",
    link: "/transacao",
  },
  {
    title: "Carteira",
    caption: "Descubra ou consulte o saldo de um endereço.",
    icon: "timeline",
    link: "/carteira",
  },
];

export default defineComponent({
  name: "MenuLateral",
  setup() {
    return {
      linksList,
    };
  },
});
</script>

<style>
</style>
