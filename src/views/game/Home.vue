<template>
  <div>
    <section class="section-hero section-shaped my-0">
      <div class="shape shape-style-1 shape-primary">
        <span class="span-150"></span>
        <span class="span-50"></span>
        <span class="span-50"></span>
        <span class="span-75"></span>
        <span class="span-100"></span>
        <span class="span-75"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
      </div>
      <div class="container shape-container d-flex align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-7 text-center pt-lg">
              <img src="img/brand/white.png" style="width: 200px;" class="img-fluid">
              <p class="lead text-white mt-4 mb-5"><b>Nameratör</b> bilgisayara karşı ya da arkadaşlarınızla oynayabileceğiniz bir isim bulma oyunudur.</p>
              <div class="btn-wrapper">
                <router-link :to="{name:'gameSettings' , params:{type:'single-player'}}" class="btn btn-info">Bilgisayara Karşı Oyna</router-link>
                <router-link :to="{name:'gameSettings' , params:{type:'multi-player'}}" class="btn btn-white">Arkadaşlarınla Oyna</router-link>
              </div>
            </div>
          </div>
          <div class="row align-items-center justify-content-around stars-and-coded">
            <div class="col-sm-12 text-center">
              <a href="https://www.atolye15.com/" target="_blank"
                 title="Atölye 15">
                <img class="brand-logo" src="https://assets.website-files.com/5da70381d683d96229e885d1/5f69ea42727b7b2fce2526d6_atolye15_logo_horizontal_rgb.svg">
              </a>
              <a href="https://www.atolye15.com/" target="_blank"
                 title="Atölye 15">
                <img class="brand-logo" src="https://cdn.sanity.io/images/9kdepi1d/production/65c832d202a503b15d99e628f4313782f3ef50db-300x62.png">
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>


export default {
  name: "components",
  components: {}
};
</script>
<style scoped>
.brand-logo{
  height: 30px;
  width: auto;
  padding: 0 10px;
}
</style>
