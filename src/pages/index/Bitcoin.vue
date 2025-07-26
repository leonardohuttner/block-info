<template>
  <div class="wave">
    <div class="wrapper">
      <section class="col text">
        <h3>Bitcoin</h3>
        <p>
          O bitcoin é a primeira moeda descentralizada do mundo. Isso significa
          que, além de não ser regulado por governos, bancos ou empresas, é
          possível comprar, enviar e receber bitcoins sem nenhum intermediário,
          como bancos ou emissores de cartão de crédito.
        </p>
        <p>
          Além disso, é uma moeda limitada. Diferentemente do real, dólar e
          euro, moedas que podem ser emitidas conforme os países sentirem
          necessidade, o bitcoin e seu código foram criados de forma que somente
          21 milhões de moedas possam ser emitidos – este é o limite. Até 2019,
          estima-se que 18 milhões de bitcoins já haviam sido emitidos.
        </p>
      </section>

      <div class="col imagem">
        <img src="~assets/btc-phone.png" alt="Bitcoin" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style scoped>
.wave {
  background-color: rgb(255, 173, 80);
  width: 100%;
  min-height: 100vh;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.text {
  flex: 1 1 400px;
  max-width: 600px;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-sizing: border-box;
}

.imagem img {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  display: block;
  margin: 0 auto;
}

/* Responsivo para telas menores */
@media (max-width: 754px) {
  .wrapper {
    flex-direction: column;
    text-align: center;
  }

  .text {
    font-size: 0.95rem;
    padding: 1rem 0.5rem;
  }
}
</style>
