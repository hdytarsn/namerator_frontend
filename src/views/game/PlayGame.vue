<template>
  <section>
    <div class="container pt-lg-md my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
            <div class="row">
              <div class="col-md-6 border-right">
                <count-down v-show="gameSettings.currentUser.id===1"
                            :paused=gameSettings.isPaused
                            label="Saniye"
                            :initial-value=gameSettings.gameDuration
                            :size="150"
                            @finish="finished"
                            @update="updated"
                            ref="countDown"
                ></count-down>
                <div class="text-center">
                  <div v-show="gameSettings.currentUser.id!==1">
                    <img v-lazy="gameSettings.currentUser.img" alt="Circle image"
                         class="img-fluid rounded-circle shadow" style="width: 150px;">
                  </div>
                  <span class="badge badge-primary mt-3 d-block">Şu Anda Oynayan</span>
                  Hidayet
                </div>

              </div>
              <div class="col-md-6 center-items">
                <span class="badge badge-primary wd-100p">Şu Anki Harf</span>
                <div class="currentWord">
                  <span>{{lastChar}}</span>
                  <br><small>{{gameSettings.currentWord.toUpperCase()}}</small>
                </div>
              </div>
            </div>

          </card>
          <card type="secondary mt-4" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
            <div class="row">
              <div class="col-md-4 border-right">

                <div class="text-center">
                  <img src="/img/icons/mic.png" alt="Circle image"
                       class="img-fluid rounded-circle shadow" :class="currentUserId!==1?'disabledSpeech':''"
                       style="width: 80px;">
                  <p class="mt-2 font-weight-700">{{ this.$store.state.game.speech.currentState }}</p>
                </div>

              </div>
              <div class="col-md-8 center-items text-center">
                <span class="badge badge-primary wd-100p">İsim Seçiminiz:</span>
                <div class="diagnosis ">
                  <p>{{ this.$store.state.game.speech.diagnosis }}</p>
                </div>
                <div class="row" v-if="currentUserId===1">
                  <button @click="listen" class="btn btn-danger"
                          v-if="this.$store.state.game.speech.currentState==='Complated'">Tekrar Dinle
                  </button>

                </div>
              </div>
            </div>

          </card>
        </div>
        <div class="col-md-6">
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">

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
                    <count-down v-show="gameSettings.currentUser.id===user.id"
                                :ref="'countDown'+user.id"
                                :initial-value=gameSettings.gameDuration
                                :size="40"
                                :stroke-width=2
                                :padding="0"
                                :run-count-down=false
                    ></count-down>
                    <div v-show="gameSettings.currentUser.id!==user.id">
                      <img v-lazy="user.img" alt="Circle image"
                           class="img-fluid rounded-circle shadow"
                           style="width: 40px;">
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
import {getLastCharOfString} from "../../helpers/helpers"
import {echo} from "../../logic/wsListener";
import {gameConfig} from "../../store/gameConfig";

export default {
  data() {
    return {
      users: [
        {id: 1, name: 'hidayet', point: 56, img: '/img/theme/team-2-800x800.jpg'},
        {id: 2, name: 'hidayet', point: 56, img: '/img/theme/team-2-800x800.jpg'},
        {id: 3, name: 'hidayet', point: 56, img: '/img/theme/team-2-800x800.jpg'},
      ],
      gameSettings: {
        round: 1,
        currentUser: {id: 1, name: 'hidayet', point: 56, img: '/img/icons/mic.png'},
        gameDuration: 10,
        isPaused: false,
        names: [],
        currentWord: ""
      }
    };
  },
  methods: {
    listen() {
      let diagnosis = new recognition({lang: "tr"});
      diagnosis.startListen();
    },
    startListener() {
      echo.channel('channel')
          .listen('Test', (e) => {
            console.log(e);
          });
    },
    finished() {
      console.log('finished')
      this.$store.state.game.speech.diagnosis?
          this.gameSettings.currentWord=this.$store.state.game.speech.diagnosis:""
      this.gameSettings.currentUser.id === 3 ?
          this.gameSettings.currentUser.id = 1 : this.gameSettings.currentUser.id++;
      if (this.gameSettings.currentUser.id === 1) {
        this.gameSettings.round++;
      }
      this.$refs[`countDown`].updateTime(this.gameSettings.gameDuration)
    },
    updated(status) {
      this.$refs[`countDown${this.gameSettings.currentUser.id}`][0].updateManuel(status.value)
    }
  },
  created() {

  },
  computed: {
    currentUserId() {
      return this.gameSettings.currentUser.id
    },
    lastChar(){
      return getLastCharOfString(this.gameSettings.currentWord)
    }
  },
  watch: {
    currentUserId() {
      this.currentUserId === 1 ? this.listen() : "";
    }
  },
  mounted() {
  },
  components: {
    BaseInput, CountDown
  }
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
