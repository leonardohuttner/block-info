<template>
  <q-page class="flex">
    <Blockchain />
    <Bitcoin />
    <Buscador />
    <Cotacoes />
    <Halving />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Blockchain from './index/Blockchain.vue'
import Bitcoin from './index/Bitcoin.vue'
import Buscador from './index/Buscador.vue'
import Halving from './index/HalvingT.vue'
import Cotacoes from './index/Cotacoes.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { Blockchain, Bitcoin, Buscador, Halving, Cotacoes }
})
</script>
<style scoped>

</style>
