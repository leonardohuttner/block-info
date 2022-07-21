<template>
    <div class="wave">
      <div class="wrapper" style="height: 90vh">
        <section class="col">
          <h3>Cotações</h3>
          <p>
            Obtenha cotaçoes das principais criptos aqui mesmo!
          </p>
        </section>

        <div class="col justify-center content-center">
            <img src="~assets/cotacao.png" style="max-height: 400px;" class="imagem" alt="login-image">
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
  background-color: rgb(223, 141, 48);
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
