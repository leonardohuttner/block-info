<template>
  <div :style="{ backgroundColor: bloco.corDeFundo }" class="card-block">
    <div class="card-frame">
      <div class="card-glow"></div>
      <div class="card-content" :class="{ reverse: index % 2 !== 0 }">
        <section class="text-card">
          <div class="card-badge">{{ bloco.titulo }}</div>
          <h3>{{ bloco.titulo }}</h3>
          <p>{{ bloco.texto }}</p>
        </section>

        <div class="image-container">
          <img :src="bloco.imagem" alt="imagem ilustrativa" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBlock",
  props: {
    bloco: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-block {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.card-frame {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 32px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.2);
}

.card-glow {
  position: absolute;
  width: 260px;
  height: 260px;
  background: radial-gradient(
    circle,
    rgba(255, 189, 79, 0.35) 0%,
    transparent 70%
  );
  top: -80px;
  right: -100px;
  filter: blur(14px);
  pointer-events: none;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.card-content.reverse {
  flex-direction: row-reverse;
}

.text-card {
  flex: 1 1 330px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  padding: 2rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 280px;
}

.card-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.5rem 0.9rem;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.text-card h3 {
  font-size: 2rem;
  margin: 0;
}

.text-card p {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.92);
}

.image-container {
  flex: 1 1 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 280px;
}

.image-container img {
  width: 100%;
  max-width: 420px;
  border-radius: 28px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.25);
  animation: float 7s ease-in-out infinite;
}

@media (max-width: 900px) {
  .card-content {
    flex-direction: column;
    align-items: center;
  }

  .card-content.reverse {
    flex-direction: column;
  }

  .text-card,
  .image-container {
    width: 100%;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}
</style>
