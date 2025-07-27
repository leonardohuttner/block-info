<template>
  <div :style="{ backgroundColor: bloco.corDeFundo }" class="wave">
    <div class="wrapper" :class="{ reverse: index % 2 !== 0 }">
      <section class="text-card">
        <h3>{{ bloco.titulo }}</h3>
        <p>{{ bloco.texto }}</p>
      </section>

      <div class="image-container">
        <img :src="bloco.imagem" alt="imagem ilustrativa" />
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
.wave {
  width: 99vw;
  height: 96vh;
  padding: 2rem 1rem;
}

.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center; /* Alinha verticalmente */
  justify-content: center; /* Alinha horizontalmente */
  gap: 2rem;
  flex-wrap: wrap;
  height: 100%; /* Garante que a wrapper ocupe toda a altura da seção */
}

.wrapper.reverse {
  flex-direction: row-reverse;
}

.text-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  flex: 1;
  color: #fff;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza o conteúdo dentro do card */
  align-items: center;
  text-align: center; /* Centraliza o texto */
}

.text-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.text-card p {
  font-size: 1rem;
  line-height: 1.5;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; /* Alinha verticalmente */
}

.image-container img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 10px;
}

/* Responsivo */
@media (max-width: 768px) {
  .wrapper {
    flex-direction: column !important;
  }

  .image-container img {
    max-height: 300px;
  }

  .text-card {
    max-width: 90%;
  }
}
</style>
