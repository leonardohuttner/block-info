<template>
  <section class="cotacoes-section">
    <div class="cotacoes-panel">
      <div class="cotacoes-copy">
        <span class="section-label">Cotações ao vivo</span>
        <h2>Preços atualizados de criptomoedas</h2>
        <p>
          Veja os valores de Bitcoin e Ethereum em tempo real, com um visual
          elegante e acessível que combina com o resto do app.
        </p>
        <div class="cotacoes-note">
          Atualização automática a cada 30 segundos.
        </div>
      </div>

      <div class="cotacoes-visual">
        <img src="~assets/cotacao.png" alt="cotacoes" />
        <div class="crypto-cloud">
          <span>₿</span>
          <span>Ξ</span>
          <span>◈</span>
          <span>$</span>
        </div>
      </div>
    </div>

    <div class="coins-wrapper">
      <Coins />
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import Coins from "./Coins.vue";

export default defineComponent({
  name: "CotacoesPage",
  components: { Coins },
});
</script>

<style scoped>
.cotacoes-section {
  width: 100%;
  max-width: 1240px;
  margin: 2rem auto 0;
  padding: 3rem 1rem;
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
}

.cotacoes-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 2rem;
  align-items: center;
  margin: 0 auto 2rem;
}

.cotacoes-copy {
  color: #fff;
}

.section-label {
  display: inline-flex;
  margin-bottom: 1rem;
  color: #f7dd9c;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.cotacoes-copy h2 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
}

.cotacoes-copy p {
  margin: 1.2rem 0 0;
  max-width: 540px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.cotacoes-note {
  margin-top: 1.5rem;
  display: inline-flex;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.cotacoes-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-width: 0;
}

.cotacoes-visual img {
  width: 100%;
  max-width: 420px;
  border-radius: 28px;
  box-shadow: 0 35px 85px rgba(0, 0, 0, 0.25);
}

.crypto-cloud {
  position: absolute;
  bottom: -12px;
  right: -12px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 0.8rem;
}

.crypto-cloud span {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  font-size: 1.4rem;
  color: #fff;
}

.coins-wrapper {
  max-width: 1240px;
  margin: 0 auto;
}

@media (max-width: 980px) {
  .cotacoes-panel {
    grid-template-columns: 1fr;
  }

  .crypto-cloud {
    position: static;
    margin-top: 1rem;
    justify-content: center;
  }
}
</style>
