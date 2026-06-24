<template>
  <q-page class="help-page bg-dark text-white">
    <section class="help-hero q-pt-md">
      <div class="hero-copy">
        <span class="section-label">Como começar</span>
        <h1>Veja como um bloco é formado, minerado e validado.</h1>
        <p>
          Um bloco nasce quando transações chegam, fecha seu conteúdo, passa
          pela mineração e é aceito pelos validadores. Aqui a explicação é
          visual e didática para entender cada etapa.
        </p>
      </div>

      <div class="hero-visual">
        <div class="visual-title">Construção de blocos</div>

        <div class="chain-stage">
          <div class="chain-block block-prev">
            <span class="block-label">Bloco anterior</span>
            <div class="block-number">#12344</div>
            <div class="block-status">Confirmado</div>
          </div>

          <div class="chain-block block-current">
            <span class="block-label">Bloco em construção</span>
            <div class="block-body">
              <span class="tx tx-1"></span>
              <span class="tx tx-2"></span>
              <span class="tx tx-3"></span>
              <span class="tx tx-4"></span>
            </div>
            <div class="block-footer">Minerando...</div>
          </div>

          <div class="chain-block block-next">
            <span class="block-label">Próximo bloco</span>
            <div class="block-number">#12346</div>
            <div class="block-status">Aguardando</div>
          </div>
        </div>

        <div class="chain-legend">
          <div class="legend-item">
            <div class="legend-badge">1</div>
            <div>
              <strong>Transações</strong> entram no bloco e criam o conteúdo.
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-badge">2</div>
            <div>
              O bloco é fechado e o minerador calcula o hash certo para
              validá-lo.
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-badge">3</div>
            <div>
              Quando pronto, o bloco segue para os validadores e é adicionado à
              cadeia.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="help-content q-pt-md">
      <div class="help-card">
        <h2>1. Transações chegam</h2>
        <p>
          Usuários enviam transferências. Essas transações entram no mempool e
          são agrupadas para formar um bloco.
        </p>
      </div>

      <div class="help-card">
        <h2>2. Bloco é fechado</h2>
        <p>
          O bloco reúne o conjunto de transações, o hash do bloco anterior e um
          código que prova sua autenticidade.
        </p>
      </div>

      <div class="help-card">
        <h2>3. Mineração</h2>
        <p>
          Mineradores usam cálculos intensos para encontrar o hash correto. Essa
          prova de trabalho garante que o bloco não foi alterado.
        </p>
      </div>

      <div class="help-card">
        <h2>4. Validação</h2>
        <p>
          Quando o bloco está pronto, outros nós da rede verificam o resultado.
          Se estiver válido, o bloco é registrado na blockchain.
        </p>
      </div>

      <div class="help-card wide-card">
        <h2>5. O que você vê no BlockInfo</h2>
        <p>
          Aqui você acompanha como os blocos se conectam, vê transações, hashes
          e entende por que cada novo bloco fortalece a segurança da rede.
        </p>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelpPage",
});
</script>

<style scoped>
.help-page {
  color: #fff;
  width: 100%;
  max-width: none;
  margin: 0 auto;
  padding: 0;
  min-height: calc(100vh - 80px);
  box-sizing: border-box;
  background: linear-gradient(180deg, #090b12 0%, #11151f 100%);
}

.help-page > section {
  width: min(1200px, calc(100vw - 32px));
  margin: 0 auto;
}

.help-hero {
  width: 100%;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2rem;
  align-items: start;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 34px;
  padding: 3rem;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
}

.section-label {
  display: inline-flex;
  margin-bottom: 1rem;
  color: #f7dd9c;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.8rem;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 3.4rem);
  line-height: 1.05;
}

.hero-copy p {
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.85;
  max-width: 560px;
}

.hero-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 420px;
  background: radial-gradient(
      circle at top left,
      rgba(247, 147, 26, 0.12),
      transparent 24%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(38, 50, 85, 0.95),
      transparent 30%
    );
  border-radius: 28px;
  padding: 1.8rem;
}

.visual-title {
  color: #f7dd9c;
  font-size: 0.85rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.chain-stage {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 1rem;
  align-items: stretch;
}

.chain-block {
  padding: 1.4rem;
  min-height: 230px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
}

.block-label {
  color: #f7dd9c;
  font-weight: 700;
  margin-bottom: 1rem;
}

.block-number {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.block-status {
  margin-top: 0.75rem;
  color: rgba(255, 255, 255, 0.78);
}

.block-body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 22px;
  background: rgba(24, 28, 44, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 160px;
}

.tx {
  width: 100%;
  min-height: 56px;
  border-radius: 18px;
  background: rgba(255, 185, 74, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 10px 24px rgba(255, 145, 0, 0.12);
  animation: tx-zigzag 4s ease-in-out infinite;
  display: inline-grid;
  place-items: center;
}

.tx-1 {
  animation-delay: 0s;
  min-height: 60px;
  border-radius: 24px 16px 16px 24px;
}

.tx-2 {
  animation-delay: 0.35s;
  min-height: 48px;
  border-radius: 16px 24px 24px 16px;
}

.tx-3 {
  animation-delay: 0.7s;
  min-height: 68px;
  border-radius: 22px 22px 10px 10px;
}

.tx-4 {
  animation-delay: 1.05s;
  min-height: 52px;
  border-radius: 10px 24px 24px 10px;
}

.block-footer {
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  background: rgba(247, 147, 26, 0.15);
  color: #fff;
  font-weight: 700;
  text-align: center;
  animation: pulse 2.2s ease-in-out infinite;
}

.chain-legend {
  display: grid;
  gap: 0.9rem;
}

.legend-item {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
  padding-left: 0.8rem;
  border-left: 3px solid rgba(247, 147, 26, 0.8);
}

.legend-badge {
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background: rgba(247, 147, 26, 0.22);
  color: #f7dd9c;
  display: grid;
  place-items: center;
  font-weight: 700;
}

.help-content {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.help-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.16);
}

.wide-card {
  grid-column: span 1;
}

.help-card h2 {
  margin: 0 0 1rem;
  font-size: 1.55rem;
}

.help-card p {
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.8;
}

@media (max-width: 1120px) {
  .help-hero {
    grid-template-columns: 1fr;
  }

  .chain-stage {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .help-page {
    padding: 1.5rem 1rem 3rem;
  }

  .help-card {
    padding: 1.5rem;
  }

  .block-body {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .block-body {
    grid-template-columns: 1fr;
  }
}

@keyframes tx-zigzag {
  0% {
    transform: translate(0, -24px) rotate(-2deg) scale(0.96);
    opacity: 0.4;
  }
  25% {
    transform: translate(6px, -8px) rotate(1deg) scale(1.02);
    opacity: 0.75;
  }
  50% {
    transform: translate(-8px, 0px) rotate(2deg) scale(1.05);
    opacity: 1;
  }
  75% {
    transform: translate(6px, -6px) rotate(-1deg) scale(1.03);
    opacity: 0.9;
  }
  100% {
    transform: translate(0, -12px) rotate(0deg) scale(1);
    opacity: 0.95;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(247, 147, 26, 0.3);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 0 18px rgba(247, 147, 26, 0.06);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-12px) scale(1.02);
  }
  50% {
    transform: translateY(-20px) scale(1.03);
  }
  75% {
    transform: translateY(-12px) scale(1.01);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}
</style>
