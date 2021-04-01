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
        <div class="col-lg-12">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h3 class="font-weight-bold">Oyun Ayarları</h3>
              </div>
              <div class="row text-center">
                <div class="col-md-6">
                  <img
                    v-lazy="'/img/user/gamer-boy.png'"
                    class="img-fluid rounded-circle shadow"
                    style="width: 150px"
                  />
                  <base-input
                    class="mt-5"
                    v-model="gameSettings.username"
                    inputClasses=" wd-50p"
                    aria-errormessage="asd"
                    :valid="gameSettings.username ? true : false"
                    alternative
                    type="text"
                    placeholder="Kullanıcı Adı"
                    addon-left-icon="fa fa-user"
                  >
                  </base-input>
                </div>
                <div class="col-md-6">
                  <p class="badge badge-lg wd-100p badge-primary">
                    Oyun Zorluğunu Seç!
                  </p>
                  <div class="row no-gutters game-level-buttons">
                    <div
                      class="col-sm-6 px-1"
                      v-for="gameLevel in gameLevels"
                      :key="gameLevel.id"
                      @click="setGameLevel(gameLevel)"
                    >
                      <base-button
                        class="wd-100p mb-2"
                        :type="
                          gameSettings.levelId == gameLevel.id
                            ? 'success'
                            : 'neutral'
                        "
                      >
                        <img slot="icon" :src="gameLevel.img" />
                        {{ gameLevel.name }}
                      </base-button>
                    </div>
                  </div>

                  <p class="badge badge-lg wd-100p badge-primary mt-3">
                    Konuşma Dilini Seç!
                  </p>

                  <div class="row no-gutters game-level-buttons">
                    <div
                      class="col-sm-6 px-1"
                      v-for="speechLanguage in speechLanguages"
                      :key="speechLanguage.id"
                      @click="setGameLanguage(speechLanguage)"
                    >
                      <base-button
                        class="wd-100p mb-2"
                        :type="
                          gameSettings.languageId === speechLanguage.id
                            ? 'success'
                            : 'neutral'
                        "
                      >
                        <img slot="icon" :src="speechLanguage.img" />
                        {{ speechLanguage.name }}
                      </base-button>
                    </div>
                  </div>
                  <p class="badge badge-lg wd-100p badge-primary mt-3">
                    Oyun Türünü Seç!
                  </p>
                  <div class="row no-gutters game-level-buttons">
                    <div class="col-sm-6 px-1">
                      <base-button
                        @click="gameSettings.multiplayer = false"
                        class="wd-100p mb-2"
                        :type="gameSettings.multiplayer ? 'neutral' : 'success'"
                      >
                        <img slot="icon" src="" />
                        Bireysel
                      </base-button>
                    </div>
                    <div class="col-sm-6 px-1">
                      <base-button
                        @click="gameSettings.multiplayer = true"
                        class="wd-100p mb-2"
                        :type="gameSettings.multiplayer ? 'success' : 'neutral'"
                      >
                        <img slot="icon" src="" />
                        Çok Oyunculu
                      </base-button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </card>
          <div>
            <p
              v-if="errorMessage"
              class="alert text-center font-weight-bold alert-danger mt-2"
            >
              {{ errorMessage }}
            </p>
          </div>
        </div>
        <div class="col-lg-12 mt-3" v-if="gameSettings.multiplayer">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <div v-if="isLogged">
              <div class="text-center text-muted mb-4">
                <h5 class="font-weight-bold mt-2">
                  Arkadaşlarınla oynayabileceğin bir link edinmek için hemen bir
                  oda kur!
                </h5>

                <span
                  v-if="gameSettings.gameRoom.status !== 0"
                  class="badge"
                  :class="
                    gameSettings.gameRoom.status === 1
                      ? 'badge-primary'
                      : 'badge-success'
                  "
                  >{{
                    gameSettings.gameRoom.status === 1
                      ? "Odanız hazırlanıyor, lütfen bekleyiniz"
                      : "Odanız hazır, iyi eğlenceler!"
                  }}</span
                >
                <br />

                <button
                  v-if="gameSettings.gameRoom.status === 0"
                  @click="createRoom"
                  class="btn btn-primary btn-lg px-5 mt-3"
                >
                  Oda Kur
                </button>

                <button
                  v-if="gameSettings.gameRoom.status === 2"
                  @click="goToGame"
                  class="btn btn-success btn-lg px-5 mt-3"
                >
                  Odaya Gir
                </button>
              </div>
            </div>
            <div class="text-center" v-else>
              <span class="alert alert-danger font-weight-bold"
                >Çok oyunculu oyun kurmak için öncelikle üye girişi
                yapmalısınız!</span
              >
            </div>
          </card>
        </div>
        <div class="col-lg-12">
          <base-button
            v-if="!gameSettings.multiplayer"
            class="wd-100p mt-3"
            @click="goToGame"
            type="primary"
          >
            Oyunu Başlat
          </base-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BaseInput from "../../components/BaseInput";
import BaseDropdown from "../../components/BaseDropdown";
import { gameConfig } from "../../store/gameConfig";
import { checkGameSettingsToStartGame } from "../../helpers/helpers";
import { createRoomWithGameSettings } from "../../requests/requests";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      gameLevels: gameConfig.LEVELS,
      speechLanguages: gameConfig.SPEECH_LANGUAGES,
      errorMessage: "",
      gameSettings: {
        username: "",
        levelId: "",
        languageId: "",
        multiplayer: false,
        gameRoom: {
          status: 0, //1>hazırlanıyor(http request, 2>hazır)
          id: null,
          slug: null,
        },
      },
    };
  },
  components: {
    BaseInput,
    BaseDropdown,
  },
  methods: {
    setGameLevel(gameLevel) {
      this.gameSettings.levelId = gameLevel.id;
    },
    setGameLanguage(speechLanguage) {
      this.gameSettings.languageId = speechLanguage.id;
    },
    goToGame() {
      if (checkGameSettingsToStartGame(this.gameSettings)) {
        this.$store.commit("setGameSettingsData", this.gameSettings);
        this.gameSettings.multiplayer
          ? this.$router.push({
              name: "playMultiplayer",
              params: { room: this.gameSettings.gameRoom.slug },
            })
          : this.$router.push({ name: "playGame" });
      } else {
        this.errorMessage =
          "Oyuna geçmeden önce tüm alanları doldurduğunuzdan/seçtiğinizden emin olun!";
        setTimeout(() => {
          this.errorMessage=""
        }, 3500);
        
      }
    },
    createRoom() {
      this.gameSettings.gameRoom.status = 1;
      createRoomWithGameSettings(this.gameSettings).then((data) => {
        this.gameSettings.gameRoom.id = data.id;
        this.gameSettings.gameRoom.slug = data.slug;
        this.gameSettings.gameRoom.status = 2;
      });
    },
  },
  mounted() {
    //set default gameConfig
    this.gameSettings.levelId = gameConfig.LEVELS[0].id;
    this.gameSettings.languageId = gameConfig.SPEECH_LANGUAGES[0].id;
  },
  computed: {
    ...mapGetters(["isLogged"]),
  },
};
</script>
<style scoped>
.dropdown,
.dropdown > button {
  width: 100% !important;
}
</style>
