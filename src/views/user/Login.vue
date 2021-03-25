<template>
  <section class="section section-shaped section-lg my-0">
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
              <div class="text-center text-muted my-4">
                <h5 class="font-weight-bold">Giriş Yap</h5>
              </div>
              <form role="form">
                <base-input alternative required v-model="email"
                            class="mb-3"
                            placeholder="Email"
                            addon-left-icon="ni ni-email-83">
                </base-input>
                <base-input alternative required v-model="password"
                            type="password"
                            placeholder="Password"
                            addon-left-icon="ni ni-lock-circle-open">

                </base-input>
                <div class="text-center">
                  <base-button @click.prevent="submit" type="primary" class="my-4">GİRİŞ</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
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
      password: ""
    }
  },
  methods: {
    submit() {
      alert(this.email);
    }
  }
};
</script>
<style>
</style>
