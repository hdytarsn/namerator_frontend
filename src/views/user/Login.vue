<template>
  <section class="section section-shaped section-lg my-0 vh100">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
            <template>
              <div class="text-center">
                <router-link slot="brand" to="/">
                  <img src="img/brand/blue.png" class="logo" alt="logo">
                </router-link>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4 mt-2">
                <small>Namerator Hesabınıza Giriş Yapın!</small>
              </div>
              <form role="form" @keyup.enter="login">
                <base-input alternative required v-model="email"  @click="errorMessage=''"
                            class="mb-3"
                            placeholder="Email"
                            addon-left-icon="ni ni-email-83">
                </base-input>
                <base-input alternative required v-model="password" @click="errorMessage=''"
                            type="password"
                            placeholder="Password"
                            addon-left-icon="ni ni-lock-circle-open">
                </base-input>
                <base-alert type="danger" v-text="errorMessage" v-if="errorMessage"></base-alert>
                <div class="text-center">
                  <base-button @click.prevent="login" type="primary" class="my-2">GİRİŞ</base-button>
                </div>
              </form>
              <div class="text-center small text-muted mt-2">
               Hesabınız yok mu? <router-link :to="{name:'register'}">Hesap Oluştur</router-link>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      email: "",
      password: "",
      errorMessage:""
    }
  },
  methods: {
    login () {
      this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password
          })
          .then((e) => {
            this.$router.push({ name: 'profile' })
          })
          .catch((err) => {
            this.errorMessage=err.response.data.message[0];
          })
    }
  }
};
</script>
<style>
</style>
