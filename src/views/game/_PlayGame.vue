<template>
  <section>
    <div class="container pt-lg-md my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <div class="row">
              <div class="col-md-6 border-right">
                <count-down
                  v-show="isMyTurn"
                  :paused="false"
                  label="Saniye"
                  :initial-value="gameSettings.gameDuration"
                  :size="150"
                  @finish="timeIsUp"
                  @update="countDownUpdated"
                  ref="countDown"
                ></count-down>
                <div class="text-center">
                  <div v-show="!isMyTurn">
                    <img
                      v-lazy="activePlayer.img"
                      alt="Circle image"
                      class="img-fluid rounded-circle shadow"
                      style="width: 150px"
                    />
                  </div>
                  <span class="badge badge-primary mt-3 d-block"
                    >Şu Anda Oynayan</span
                  >
                  {{ activePlayer.name }}
                </div>
              </div>
              <div class="col-md-6 center-items">
                <span class="badge badge-primary wd-100p">Şu Anki Harf</span>
                <div class="currentWord">
                  <span>{{ lastChar }}</span>
                  <br /><small>{{
                    gameSettings.currentWord.toUpperCase()
                  }}</small>
                </div>
              </div>
            </div>
          </card>
          <card
            type="secondary mt-4"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <div class="row">
              <div class="col-md-4 border-right">
                <div class="text-center">
                  <img
                    src="/img/icons/mic.png"
                    alt="Circle image"
                    class="img-fluid rounded-circle shadow"
                    :class="!isMyTurn ? 'disabledSpeech' : ''"
                    style="width: 80px"
                  />
                  <p class="mt-2 font-weight-700">
                    {{ this.$store.state.game.speech.currentState }}
                  </p>
                </div>
              </div>
              <div class="col-md-8 center-items text-center">
                <span class="badge badge-primary wd-100p">İsim Seçiminiz:</span>
                <div class="diagnosis">
                  <p>{{ this.$store.state.game.speech.diagnosis }}</p>
                </div>
                <div class="row" v-if="isMyTurn">
                  <button
                    @click="listen"
                    class="btn btn-danger"
                    v-if="
                      this.$store.state.game.speech.currentState === 'Complated'
                    "
                  >
                    Tekrar Dinle
                  </button>
                </div>
              </div>
            </div>
          </card>
        </div>
        <div class="col-md-6">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <td></td>
                    <td>Kullanıcı Adı</td>
                    <td>Puan</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id" class="">
                    <td>
                      <count-down
                        v-show="activePlayer.id === user.id"
                        :ref="'countDown' + user.id"
                        :initial-value="gameSettings.gameDuration"
                        :size="40"
                        :stroke-width="2"
                        :padding="0"
                        :run-count-down="false"
                      ></count-down>
                      <div v-show="!isMyTurn">
                        <img
                          v-lazy="user.img"
                          alt="Circle image"
                          class="img-fluid rounded-circle shadow"
                          style="width: 40px"
                        />
                      </div>
                    </td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.point }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BaseInput from "../../components/BaseInput";
import CountDown from "../../components/CountDown";
import recognition from "../../logic/recognition";
import { getLastCharOfString } from "../../helpers/helpers";


export default {
  props: {
    users: Array,
    currentUser: Object,
  },
  data() {
    return {
      gameSettings: {
        round: 1,
        gameDuration: 10,
        isPaused: false,
        currentWord: "",
        activePlayerIndex: 0
      },
    }
  },
  methods: {
    listen() {
      let diagnosis = new recognition({ lang: "tr" });
      diagnosis.startListen();
    },
    isMyTurn(){
      return this.activePlayer.id===this.currentUser.id?true:false;
    },
    timeIsUp() {
      this.$store.state.game.speech.diagnosis
        ? (this.gameSettings.currentWord = this.$store.state.game.speech.diagnosis)
        : "";
        console.log('index:'+this.gameSettings.activePlayerIndex)
        

      //kelimeyi dbye kaydet

       if (this.users[this.gameSettings.activePlayerIndex + 1]) {
        this.gameSettings.activePlayerIndex++;
      }else{
        this.gameSettings.activePlayerIndex =0
      }
     
      this.$refs[`countDown`].updateTime(this.gameSettings.gameDuration);
    },
    countDownUpdated(status) {
      this.$refs[
        `countDown${this.activePlayer.id}`
      ][0].updateManuel(status.value);
    },
  },
  created() {
    console.log(this.gameSettings);
  },
  computed: {
    activePlayer(){
return this.users[this.gameSettings.activePlayerIndex];
    },
    lastChar() {
      return getLastCharOfString(this.gameSettings.currentWord);
    },
  },
  watch: {
    activePlayer() {
      this.isMyTurn() ? this.listen() : "";
    },
  },
  mounted() {},
  components: {
    BaseInput,
    CountDown,
  },
};
</script>
<style scoped>
.currentWord {
  text-align: center;
}

.currentWord > span {
  font-size: 6rem;
  font-weight: 900;
}

tbody > tr > td:first-child {
  text-align: center;
}

.disabledSpeech {
  filter: grayscale(100%);
}

.diagnosis > p {
  padding: 3px 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 30px;
  line-height: normal;
  font-weight: 700;
  background: #a3fca0;
}
</style>
