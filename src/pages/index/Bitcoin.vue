<template>
    <div class="wave">
      <div class="wrapper" style="height: 90vh">
        <section class="col">
          <h3>Bitcoin</h3>
          <p>O bitcoin é a primeira moeda descentralizada do mundo.
          Isso significa que, além de não ser regulado por governos,
          bancos ou empresas, é possível comprar, enviar e receber
          bitcoins sem nenhum intermediário, como bancos ou emissores de cartão de crédito.
          </p>
          <p>
          Além disso, é uma moeda limitada. Diferentemente do real, dólar e euro, moedas que podem ser emitidas
          conforme os países sentirem necessidade, o bitcoin e seu código foram criados de forma que somente
          21 milhões de moedas possam ser emitidas – este é o limite. Até 2019, estima-se que 18 milhões
          de bitcoins já haviam sido emitidos.
          </p>
        </section>

        <div class="col imagem">
            <img src="~assets/btc-phone.png" style="max-height: 400px;" class="imagem" alt="Bitcoin">
        </div>
      </div>

    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
<style scoped>
.wave {
  background-color: rgb(255, 173, 80);
  height: 100vh;
  width: 100%;
  z-index: -1;
}
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.imagem {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;
  }

@media (max-width: 754px) {
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
}
@media (max-width: 475px) {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .imagem {
    max-width: 350px;
    align-items: center;
  }
}
section {
  padding-left: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
}
</style>
