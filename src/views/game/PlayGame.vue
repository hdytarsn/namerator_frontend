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

          <p>State:{{ this.$store.state.game.speech.currentState }}</p>
          <p> diagnosis:{{ this.$store.state.game.speech.diagnosis }}</p>
          <button @click="listen">listen</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BaseInput from "../../components/BaseInput";
import recognition from "../../logic/recognition";
import {echo} from "../../logic/wsListener";

export default {
  data() {
    return {
      gameSettings: {}
    };
  },
  methods: {
    listen() {
      let diagnosis = new recognition({lang: "tr"});
      diagnosis.startListen();
    }
  },
  created() {

  },
  mounted() {
    echo.channel('channel')
        .listen('Test', (e) => {
          console.log(e);
        });
  },
  components: {
    BaseInput
  }
};
</script>
<style>
</style>
