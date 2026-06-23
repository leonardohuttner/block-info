<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="hero-badges">
            <span>Bitcoin</span>
            <span>Blockchain</span>
            <span>Cripto</span>
          </div>
          <h1>
            BlockInfo traz o universo do Bitcoin com clareza e simplicidade.
          </h1>
          <p>
            Descubra cotações reais, rastreie transações e compreenda a
            tecnologia por trás da blockchain em um design limpo, animado e
            inspirado nas cores do Bitcoin.
          </p>
          <div class="hero-actions">
            <router-link
              to="/transacao"
              class="hero-button hero-button-primary"
            >
              Buscar transação
            </router-link>
            <router-link
              to="/carteira"
              class="hero-button hero-button-secondary"
            >
              Consultar carteira
            </router-link>
          </div>
          <div class="hero-stats">
            <div>
              <strong>21M</strong>
              <span>bitcoins limitados</span>
            </div>
            <div>
              <strong>Tempo real</strong>
              <span>cotações e transações</span>
            </div>
            <div>
              <strong>Aprenda</strong>
              <span>como a blockchain funciona</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-phone">
            <img :src="heroImage" alt="App BlockInfo" />
          </div>
          <div class="crypto-cloud">
            <span>₿</span>
            <span>Ξ</span>
            <span>◈</span>
            <span>$</span>
          </div>
        </div>
      </div>
    </section>

    <section class="intro">
      <div>
        <span class="section-label">O que o app oferece</span>
        <h2>
          Entenda Bitcoin e utilize ferramentas práticas em poucos cliques.
        </h2>
        <p>
          O BlockInfo reúne informações essenciais sobre criptomoedas,
          explicações claras sobre blockchain e acesso rápido a buscas de
          transações e carteiras.
        </p>
      </div>
      <div class="intro-list">
        <div class="intro-card">
          <strong>Transparência</strong>
          <p>Visualize transações reais e explore blocos da rede.</p>
        </div>
        <div class="intro-card">
          <strong>Dados ao vivo</strong>
          <p>
            Veja preços atualizados de Bitcoin e Ethereum com estilo moderno.
          </p>
        </div>
        <div class="intro-card">
          <strong>Aprendizado</strong>
          <p>
            Descubra conceitos como halving, contratos inteligentes e
            blockchain.
          </p>
        </div>
      </div>
    </section>

    <section class="features">
      <h2>Como o app funciona</h2>
      <p class="features-description">
        Navegue por cada etapa e entenda como usar o BlockInfo para pesquisar,
        analisar e aprender.
      </p>
      <div class="steps-grid">
        <div class="step-card">
          <span class="step-number">1</span>
          <h3>Busque informações</h3>
          <p>
            Use o buscador para localizar transações e endereços na blockchain.
          </p>
        </div>
        <div class="step-card">
          <span class="step-number">2</span>
          <h3>Confira cotações</h3>
          <p>
            Veja preços em tempo real para Bitcoin e Ethereum direto na página
            inicial.
          </p>
        </div>
        <div class="step-card">
          <span class="step-number">3</span>
          <h3>Aprenda conceitos</h3>
          <p>
            Entenda o que é halving, contratos inteligentes e como os blocos se
            conectam.
          </p>
        </div>
      </div>
    </section>

    <!-- <section class="ideas">
      <h2>Ideias principais</h2>
      <div class="cards-grid">
        <CardBlock
          v-for="(item, index) in blocos"
          :key="index"
          :bloco="item"
          :index="index"
        />
      </div>
    </section> -->

    <Cotacoes />
  </div>
</template>

<script>
// import CardBlock from "../components/CardBlock.vue";
import Cotacoes from "../components/Cotacoes.vue";

export default {
  name: "IndexPage",
  components: { Cotacoes },
  // components: { CardBlock, Cotacoes },
  data() {
    return {
      heroImage: require("../assets/btc-phone.png"),
      blocos: [
        {
          titulo: "Bitcoin",
          texto: `O Bitcoin é a primeira moeda descentralizada do mundo, permitindo transações sem intermediários como bancos.
          Além disso, é uma moeda limitada: apenas 21 milhões poderão ser emitidos, dos quais cerca de 18 milhões já existiam até 2019.`,
          imagem: require("../assets/btc-phone.png"),
          corDeFundo: "rgb(223, 141, 48)",
        },
        {
          titulo: "Blockchain",
          texto:
            "Blockchain é uma rede de blocos imutáveis que registra transações e garante transparência sem intermediários.",
          imagem: require("../assets/block.png"),
          corDeFundo: "rgb(132, 185, 199)",
        },
        {
          titulo: "Buscador",
          texto:
            "Use o buscador para rastrear transações e endereços de forma rápida e visual na rede blockchain.",
          imagem: require("../assets/buscador.png"),
          corDeFundo: "rgb(48, 96, 223)",
        },
        {
          titulo: "Halving",
          texto: `Halving é a redução programada pela metade na recompensa de mineração do Bitcoin, que acontece a cada 210.000 blocos. Isso torna o ativo mais escasso e valioso ao longo do tempo.`,
          imagem: require("../assets/halving.png"),
          corDeFundo: "rgb(118, 96, 223)",
        },
        {
          titulo: "Contratos Inteligentes",
          texto:
            "Contratos inteligentes automatizam regras financeiras e processos digitais de forma segura e transparente.",
          imagem: require("../assets/buscador.png"),
          corDeFundo: "rgb(34, 34, 34)",
        },
      ],
    };
  },
};
</script>

<style scoped>
.home-page {
  font-family: "Poppins", sans-serif;
  color: #fff;
  background: #1a1a1a;
}

.hero {
  background: linear-gradient(135deg, #f7931a 0%, #d68719 34%, #111 100%);
  padding: 4rem 1rem 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  top: -100px;
  right: -100px;
}

.hero-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1240px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.hero-copy {
  flex: 1;
  min-width: 300px;
  z-index: 1;
}

.hero-badges {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.hero-badges span {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
}

.hero-copy h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.05;
  margin-bottom: 1.5rem;
  max-width: 760px;
}

.hero-copy p {
  max-width: 680px;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.92);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 170px;
  padding: 0.95rem 1.5rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.hero-button:hover {
  transform: translateY(-2px);
}

.hero-button-primary {
  background: #fff;
  color: #212121;
}

.hero-button-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(140px, 1fr));
  gap: 1rem;
  max-width: 760px;
}

.hero-stats div {
  background: rgba(255, 255, 255, 0.08);
  padding: 1rem 1.2rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.hero-stats strong {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.45rem;
}

.hero-stats span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.hero-visual {
  flex: 0 0 420px;
  position: relative;
  min-width: 320px;
  display: grid;
  place-items: center;
}

.hero-phone {
  width: 100%;
  max-width: 380px;
  padding: 1.3rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 36px;
  backdrop-filter: blur(12px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.18);
  animation: float 6s ease-in-out infinite;
}

.hero-phone img {
  width: 100%;
  display: block;
}

.crypto-cloud {
  position: absolute;
  left: -20px;
  bottom: -20px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 1rem;
}

.crypto-cloud span {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  font-size: 1.6rem;
  color: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
}

.intro,
.features,
.ideas {
  max-width: 1240px;
  margin: 0 auto;
  padding: 3rem 1rem;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.95) 0%,
    rgba(25, 25, 25, 0.98) 100%
  );
  width: 100%;
}

.intro {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: start;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.95) 0%,
    rgba(25, 25, 25, 0.98) 100%
  ) !important;
}

.section-label {
  display: inline-flex;
  margin-bottom: 1rem;
  color: #f7dd9c;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.intro h2 {
  font-size: clamp(2rem, 3vw, 2.8rem);
  margin-bottom: 1rem;
}

.intro p {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
}

.intro-list {
  display: grid;
  gap: 1rem;
}

.intro-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  padding: 1.5rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.intro-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.2);
}

.intro-card strong {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
}

.intro-card p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.75;
}

.features h2,
.ideas h2 {
  font-size: clamp(2rem, 3vw, 2.8rem);
  margin-bottom: 0.5rem;
}

.features-description {
  color: rgba(255, 255, 255, 0.78);
  max-width: 760px;
  margin-bottom: 2rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 1rem;
}

.step-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 1.8rem;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-6px);
}

.step-number {
  display: inline-flex;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: #f7931a;
  color: #111;
  font-weight: 800;
}

.step-card h3 {
  margin: 0;
}

.step-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.75;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .intro,
  .features,
  .ideas {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .hero-grid {
    flex-direction: column-reverse;
  }
  .hero-visual {
    justify-self: center;
  }
  .intro {
    grid-template-columns: 1fr;
  }
  .steps-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .hero {
    padding-top: 3rem;
  }
  .hero-copy h1 {
    font-size: 2.4rem;
  }
  .hero-stats {
    grid-template-columns: 1fr;
  }
  .crypto-cloud {
    position: static;
    grid-template-columns: repeat(4, auto);
    margin-top: 1.5rem;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-14px);
  }
}
</style>
