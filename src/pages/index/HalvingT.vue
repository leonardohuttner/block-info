<template>
    <div class="wave">
      <div class="wrapper" style="height: 90vh">
        <section class="col">
          <h3>Halving</h3>
          <p>
            Uma recompensa de novos Bitcoins é dada ao minerador que encontra a solução para interligar o
            novo bloco de informações com a sequência de dados existente, o blockchain.
          </p>
          <p>
            O halving é a redução de 50% nessa premiação, programada para ocorrer a cada 210.000 blocos,
            próximo de 4 anos de intervalo. No início da vida do Bitcoin, entre 2009 e 2012, eram gerados 50 Bitcoins por cada bloco encontrado, resultando em 7.200 novas moedas por dia.
          </p>
        </section>

        <div class="col justify-center content-center">
            <img src="~assets/halving.png" style="max-height: 400px;" class="imagem" alt="login-image">
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
  background-color: rgb(57, 160, 80);
  height: 100vh;
  width: 100%;
  z-index: -1;
}
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
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
