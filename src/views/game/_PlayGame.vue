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
                  v-show="isMyTurn()"
                  :paused="gameRoom.isGamePaused"
                  label="Saniye"
                  :initial-value="gameDuration"
                  :size="150"
                  @finish="timeIsUp"
                  @update="countDownUpdated"
                  ref="countDown"
                ></count-down>
                <div class="text-center">
                  <div v-show="!isMyTurn()">
                    <img
                      v-lazy="'/img/user/gamer-boy.png'"
                      alt="Circle image"
                      class="img-fluid rounded-circle shadow"
                      style="width: 150px"
                    />
                  </div>
                  <span class="badge badge-primary mt-3 d-block"
                    >Şu Anda Oynayan</span
                  >
                  {{ activeGamePlayer.name }}
                </div>
              </div>
              <div class="col-md-6 center-items">
                <span class="badge badge-primary wd-100p">Şu Anki Harf</span>
                <div class="currentWord">
                  <span>{{ lastChar }}</span>
                  <br /><small>{{ speech.lastActiveName.toUpperCase() }}</small>
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
                    :class="!isMyTurn() ? 'disabledSpeech' : ''"
                    style="width: 80px"
                  />
                  <p class="mt-2 font-weight-700">
                    {{ speech.currentState }}
                  </p>
                </div>
              </div>
              <div class="col-md-8 center-items text-center">
                <span class="badge badge-primary wd-100p">İsim Seçiminiz:</span>
                <div class="diagnosis">
                  <p>{{ speech.diagnosis }}</p>
                </div>
                <div class="row" v-if="isMyTurn()">
                  <button
                    @click="listen"
                    class="btn btn-danger"
                    v-if="speech.currentState !== ''"
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
                  <tr v-for="user in gameUsers" :key="user.id" class="">
                    <td>
                      <count-down
                        v-show="activeGamePlayer.id === user.id"
                        :ref="'countDown' + user.id"
                        :initial-value="gameDuration"
                        :size="40"
                        :stroke-width="2"
                        :padding="0"
                        :run-count-down="false"
                      ></count-down>
                      <div v-show="activeGamePlayer.id !== user.id">
                        <img
                          v-lazy="'/img/user/gamer-boy.png'"
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

          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-4 scroll"
          >
            <template>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <td>Oyuncu</td>
                    <td>Puan</td>
                    <td>Durum</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="action in gameActions" >
                    <td>
                      {{ getUserById(action.action_result.user_id).name }}
                    </td>
                    <td>{{ action.action_result.point }}</td>
                    <td>{{ action.action_result.status }}</td>
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
import {
  getLastCharOfString,
  getGameDurationByLevelId,
} from "../../helpers/helpers";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseInput,
    CountDown,
  },
  props: {
    roomSlug: String,
    gameLang: Object,
    gameLevel: Object,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "activeGame",
      "gameSettings",
      "gameRoom",
      "gameUsers",
      "speech",
      "activeGamePlayer",
      "activeGamePlayerIndex",
      "authUser",
      "increaseActivePlayerIndex",
      "resetPlayerIndex",
      "isPauseGame",
      "gameActions",
    ]),
    lastChar() {
      return getLastCharOfString(this.speech.lastActiveName);
    },
    gameDuration() {
      return getGameDurationByLevelId(this.gameLevel.id);
    },
  },

  methods: {
    listen() {
      let diagnosis = new recognition({ lang: this.gameLang.short });
      diagnosis.startListen();
    },

    getUserById(id) {
      return this.gameUsers.filter((user) => user.id == id)[0];
    },
    isMyTurn() {
      return this.activeGamePlayer.id === this.authUser.id ? true : false;
    },
    setActivePlayer() {
      console.log('aplater');
      console.log(this.activeGamePlayerIndex);
      if (this.gameUsers[this.activeGamePlayerIndex + 1]) {
        this.$store.commit("increaseActivePlayerIndex");
      } else {
        this.$store.commit("resetPlayerIndex");
      }
    },

    timeIsUp() {
      console.log("this.speech.diagnosis");
      console.log(this.speech.diagnosis);
      if (this.isMyTurn()) {
        this.$store
          .dispatch(
            "makeNewGameAction",
            this.roomSlug,
            this.speech.diagnosis,
            this.speech.lastActiveName
          )
          .catch((err) => {
            console.log(err);
          });
      }
      this.$store.commit("isPauseGame", true);
console.log('this.gameRoom.isGamePaused');
console.log(this.gameRoom.isGamePaused);

      this.setActivePlayer();
      
      this.$refs[`countDown`].updateTime(this.gameDuration);
    },
    countDownUpdated(status) {
      this.$refs[`countDown${this.activeGamePlayer.id}`][0].updateManuel(
        status.value
      );
    },
  },

  created() {
    this.isMyTurn() ? this.listen() : "";
  },

  watch: {
    gameRoom(){
console.log('this.gameRoom.isGamePaused');
console.log(this.gameRoom.isGamePaused)
    },
    activeGamePlayer() {
      this.isMyTurn() ? this.listen() : "";
    },
  },
};
</script>
<style scoped>
.scroll{
  max-height: 250px;
  overflow-y: scroll;
}
</style>