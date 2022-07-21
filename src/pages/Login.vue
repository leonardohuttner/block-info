<template>
  <q-page padding>
    <img src="~assets/wave.png" class="wave" alt="login-wave">
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
        class="col-12 col-md-6 flex content-center">
      <q-card v-bind:style="$q.screen.lt.sm ? {'width': '80%'} : {'width': '50%'}">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/lh.png" alt="avatar">
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h4 class="text-h4 text-uppercase q-my-none text-weight-regular">Login</h4>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="justify-center" @submit.prevent="handlerLogin">
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              type="email"
              label="Email"
              v-model="form.email"
              :rules="[ val => (val && val.length > 8) || 'Email invalido']"
              lazy-rules
              outline
              rounded
            />
            <q-input
              type="password"
              label="Senha"
              v-model="form.password"
              :rules="[ val => (val && val.length >= 6) || 'Senha invalida']"
              lazy-rules
              outline
              rounded
            />
            <div class="full-width q-pt-sm">
              <p>
                <a style="text-decoration:none;" href="/forgot-password">
                  Forgot your password? Click here
                  </a>
                </p>
              <q-btn
                label="Login"
                color="secondary"
                class="full-width"
                type="submit"
                outline
                rounded
              />
            </div>
            <div>
              <q-btn
                label="Register"
                color="secondary"
                class="full-width"
                to="/register"
                flat
              />
            </div>
            <div>
              <q-btn
                label="Back to site"
                color="secondary"
                class="full-width"
                to="/"
              />
            </div>
          </div>
        </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'PageLogin',
  setup () {
    const router = useRouter()
    const { notifyNegative } = useNotify()
    const form = ref({
      email: '',
      password: ''
    })
    onMounted(() => {
    })
    const handlerLogin = async () => {
      try {

        router.push({ name: 'home' })
      } catch (error) {
        notifyNegative(error.message)
      }
    }
    return {
      form,
      handlerLogin
    }
  }
})
</script>
<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
