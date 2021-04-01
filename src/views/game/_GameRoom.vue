<template>
  <section class="section section-shaped section-lg my-0 vh100">
    <div class="shape shape-style-1 bg-gradient-default">
      <span v-for="{ bgShape, index } in 8" :key="index"></span>
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
            <div class="text-center text-muted mb-4">
              <h3 class="font-weight-bold mb-4">Oyun Odası</h3>
              <span class="alert alert-success wd-100p"
                >Odaya Davet Linki: <strong>{{ invitationLink }}</strong>
              </span>
              <div class="mt-4" v-if="gameSettings">
                <p class="badge badge-info">
                  Oyun Dili: <b>{{ gameLang.name }}</b>
                </p>
                <p class="badge badge-info">
                  Zorluk Seviyesi: <b>{{ gameLevel.name }}</b>
                </p>
              </div>
            </div>
            <div class="row text-center mt-5">
              <div
                v-for="user in gameUsers"
                :key="user.id"
                class="col-md-4 room-user"
              >
                <img
                  v-lazy="'/img/user/gamer-boy.png'"
                  alt="Circle image"
                  class="img-fluid rounded-circle shadow pos-relative"
                  style="width: 150px"
                />
                <div>
                  <span class="pos-absolute">
                    {{ user.name }}
                    <i v-if="user.id === gameRoomHosterId">(Kurucu)</i>
                  </span>
                </div>
              </div>
            </div>
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
        <div class="col-lg-12">
          <base-button
            @click="startGame"
            v-if="isHost"
            class="wd-100p mt-3"
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
import { mapGetters } from "vuex";

export default {
  components: {
    BaseInput,
  },
  props: {
    roomConfig: Object,
    roomSlug: String,
    gameLang: Object,
    gameLevel: Object,
  },
  data() {
    return {
      invitationLink: window.location.href,
      errorMessage:""
    };
  },
  computed: {
    ...mapGetters([
      "authUser",
      "gameUsers",
      "gameSettings",
      "gameRoomHosterId",
    ]),
    isHost() {
      return this.authUser.id == this.gameRoomHosterId ? true : false;
    },
  },

  methods: {
    startGame() {
      if (this.gameUsers.length > 1) {
        this.$store
          .dispatch("startTheGameForEveryOne", this.roomSlug)
          .catch((err) => {
            console.log(err);
          });
      }else{
         this.errorMessage =
          "Oyuna başlayabilmek için minimum 2 kişi olmalısınız!";
        setTimeout(() => {
          this.errorMessage=""
        }, 3500);
        
      }
    },
  },
};
</script>
