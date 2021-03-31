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
                    :class="!isMyTurn() ? 'disabledSpeech' : ''"
                    style="width: 80px"
                  />
                  <p class="mt-2 font-weight-700">
                    {{ speechState }}
                  </p>
                </div>
              </div>
              <div class="col-md-8 center-items text-center">
                <span class="badge badge-primary wd-100p">İsim Seçiminiz:</span>
                <div class="diagnosis">
                  <p>{{ speechDiagnosis }}</p>
                </div>
                <div class="row" v-if="isMyTurn()">
                  <button
                    @click="listen"
                    class="btn btn-danger"
                    v-if="speechState !== ''"
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
                        v-show="activePlayer.id === user.id"
                        :ref="'countDown' + user.id"
                        :initial-value="gameDuration"
                        :size="40"
                        :stroke-width="2"
                        :padding="0"
                        :run-count-down="false"
                      ></count-down>
                      <div v-show="activePlayer.id !== user.id">
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

          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-5"
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
                  <tr v-for="action in gameSettings.GameActions" class="">
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
  getLangById,
  getGameDurationByLevelId,
} from "../../helpers/helpers";
import { gameAction } from "../../requests/requests";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseInput,
    CountDown,
  },
  props: {
    currentUser: Object,
    roomSlug: String,
    gameAction: Object,
  },
  data() {
    return {
      isGamePaused: false,
      gameSettings: {
        round: 1,
        
        currentWord: "",
        activePlayerIndex: 0,
        GameActions: [],
      },
    };
  },
  computed: {
    lastChar: function () {
      return getLastCharOfString(
        this.gameSettings.currentWord ? this.gameSettings.currentWord : ""
      );
    },
    gameDuration: () => {
      return getGameDurationByLevelId(this.gameSettings.levelId);
    },

    ...mapGetters([
      "gameSettings",
      "gameRoom",
      "gameUsers",
      "speechState",
      "speechDiagnosis",
      "activeGamePlayer",
      "authUser",
      "getUserById",
      "increaseActivePlayerIndex",
      "resetPlayerIndex",
      "isPauseGame",
    ]),
  },
  methods: {
    listen() {
      let diagnosis = new recognition({
        lang: getLangById(this.gameSettings.languageId).short,
      });
      diagnosis.startListen();
    },
    isMyTurn() {
      return this.activeGamePlayer[user].id === this.authUser.id ? true : false;
    },
    setActivePlayer() {
      if (this.gameUsers[activeGamePlayer[index] + 1]) {
        this.$store.commit("increaseActivePlayerIndex");
      } else {
        this.$store.commit("resetPlayerIndex");
      }
    },

    timeIsUp() {
      if (this.isMyTurn()) {
        gameAction(
          this.roomSlug,
          this.speechDiagnosis,
          this.gameSettings.currentWord
        ).then((data) => {});
      }
      this.setActivePlayer();

      this.$store.commit("isPauseGame", true);

      this.isGamePaused = true;
      this.$refs[`countDown`].updateTime(gameDuration);
    },
    countDownUpdated(status) {
      this.$refs[`countDown${this.activePlayer.id}`][0].updateManuel(
        status.value
      );
    },
  },
  created() {
    this.isMyTurn() ? this.listen() : "";
  },

  watch: {
    activeGamePlayer() {
      this.isMyTurn() ? this.listen() : "";
    },
    gameAction() {
      this.isGamePaused = false;
      if (this.gameAction.action_result.point === 30) {
        this.gameSettings.currentWord = this.gameAction.action_result.name;
      } else {
        this.gameAction.action_result.name = this.gameSettings.currentWord;
      }

      this.gameSettings.GameActions.push(this.gameAction);
    },
  },
};
</script>
