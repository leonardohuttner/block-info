<template>
  <div>
    <CardBlock
      v-for="(item, index) in blocos"
      :key="index"
      :bloco="item"
      :index="index"
    />
    <cotacoes />
  </div>
</template>

<script>
import CardBlock from "../components/CardBlock.vue";
import Cotacoes from "src/components/Cotacoes.vue";

export default {
  name: "IndexPage",
  components: { CardBlock, Cotacoes },
  data() {
    return {
      blocos: [
        {
          titulo: "Bitcoin",
          texto: `O Bitcoin é a primeira moeda descentralizada do mundo, permitindo transações sem intermediários como bancos.
          sAlém disso, é uma moeda limitada: apenas 21 milhões poderão ser emitidos, dos quais cerca de 18 milhões já existiam até 2019.`,
          imagem: require("../assets/btc-phone.png"),
          corDeFundo: "rgb(223, 141, 48)",
        },
        {
          titulo: "Blockchain",
          texto:
            "É um sistema que permite rastrear o envio e recebimento de informações pela internet. São blocos de dados conectados que formam uma corrente.",
          imagem: require("../assets/block.png"),
          corDeFundo: "rgb(132, 185, 199)",
        },
        {
          titulo: "Buscador",
          texto:
            "é um sistema que permite rastrear o envio e recebimento de alguns tipos de informação pela internet. São pedaços de código gerados online que carregam informações conectadas – como blocos de dados que formam uma corrente.",
          imagem: require("../assets/buscador.png"),
          corDeFundo: "rgb(48, 96, 223)",
        },
        {
          titulo: "Halving",
          texto: `Uma recompensa de novos Bitcoins é dada ao minerador que encontra a solução para interligar o
            novo bloco de informações com a sequência de dados existente, o blockchain.

            O halving é a redução de 50% nessa premiação, programada para ocorrer a cada 210.000 blocos,
            próximo de 4 anos de intervalo. No início da vida do Bitcoin, entre 2009 e 2012, eram gerados 50 Bitcoins por cada bloco encontrado, resultando em 7.200 novas moedas por dia.`,
          imagem: require("../assets/halving.png"),
          corDeFundo: "rgb(118, 96, 223)",
        },
        {
          titulo: "Contratos Inteligentes",
          texto:
            "Automatize processos com contratos digitais autoexecutáveis baseados em blockchain.",
          imagem: require("../assets/buscador.png"),
          corDeFundo: "rgb(34, 34, 34)",
        },
      ],
    };
  },
};
</script>
