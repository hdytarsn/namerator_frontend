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
                  <span class="pos-absolute">
                    {{ user.name }}
                    <i v-if="user.id === roomHostUserId">(Kurucu)</i>
                  </span>
                </div>
              </div>
            </div>
          </card>
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
import { startGame } from "../../requests/requests";

export default {
  props: {
    users: Array,
    roomConfig: Object,
    currentUser: Object,
    roomHostUserId: Number,
    roomSlug: String,
  },
  data() {
    return {
      invitationLink: window.location.href,
    };
  },
  components: {
    BaseInput,
  },

  methods: {
    startGame() {
      startGame(this.roomSlug).then((data) => {
        console.log(data);
      });
    },
  },
  computed: {
    isHost() {
      return this.currentUser.id == this.roomHostUserId ? true : false;
    },
  },
};
</script>
