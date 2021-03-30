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
                <h3 class="font-weight-bold mb-4">Oyun Odası</h3>
                <span class="alert alert-success wd-100p"
                  >Odaya Davet Linki: <strong>{{ invitationLink }}</strong>
                </span>
                <div class="mt-4" v-if="roomConfig">
                  <p class="badge badge-info">
                    Oyun Dili: {{ roomConfig.languageId }}
                  </p>
                  <p class="badge badge-info">
                    Zorluk Seviyesi: {{ roomConfig.levelId }}
                  </p>
                </div>
              </div>
              <div class="row text-center mt-5">
                <div
                  v-for="user in users"
                  :key="user.id"
                  class="col-md-4 room-user"
                >
                  <img
                    v-lazy="'/img/theme/team-2-800x800.jpg'"
                    alt="Circle image"
                    class="img-fluid rounded-circle shadow pos-relative"
                    style="width: 150px"
                  />
                  <div>
                    <span class="pos-absolute">{{ user.name }} <i v-if="user.id==room.created_by">(Kurucu)</i> </span>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </div>
        <div class="col-lg-12">
          <base-button v-if="isHost" class="wd-100p mt-3" type="primary">
            Oyunu Başlat
          </base-button>
        </div>
      </div>
    </div>

    <button @click="leaveRoom">leave</button>
  </section>
</template>
<script>
import BaseInput from "../../components/BaseInput";
import { getRoomConfig } from "../../requests/requests";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      invitationLink: window.location.href,
      roomSlug: this.$route.params.slug,
      room: null,
      roomConfig: null,
      isHost: false,
      users: [],
    };
  },
  components: {
    BaseInput,
  },
  methods: {
    leaveRoom() {
      window.echo.leave(`game.room.${this.roomSlug}`);
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["userToken", "currentUser"]),
  },
  created() {
    console.log(this.currentUser);
    getRoomConfig(this.roomSlug).then((data) => {
      this.roomConfig = data.config;
      this.room = data.room;
      data.room.created_by == this.currentUser.id ? (this.isHost = true) : "";
    });

    window.echo.connector.pusher.config.auth.headers["Authorization"] =
      "Bearer " + this.userToken;
    window.echo
      .join(`game.room.${this.$route.params.slug}`)
      .here((users) => {
        users.forEach((user) => {
          this.users.push(user);
        });
        console.log(this.users);
      })
      .joining((user) => {
        this.users.push(user);
      })
      .leaving((user) => {
        let index = this.users
          .map(function (user) {
            return user.id;
          })
          .indexOf(user.id);
        this.users.splice(index, 1);
      });
  },
  beforeRouteLeave(to, from, next) {
    window.echo.leave(`game.room.${this.roomSlug}`);
    next();
  },
};
</script>
