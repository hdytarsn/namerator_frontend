<template>
  <div>
    <GamePlayScreen
      :users="users"
      :currentUser="currentUser"
      v-if="val"
    ></GamePlayScreen>

    <GameRoomScreen
      v-if="!val"
      :users="users"
      :roomConfig="roomConfig"
      :currentUser="currentUser"
      :roomHostUserId="roomHostUserId"
      :roomSlug="roomSlug"
    ></GameRoomScreen>
    <button @click="set">SET</button>
  </div>
</template>
<script>
import GamePlayScreen from "./_PlayGame";
import GameRoomScreen from "./_GameRoom";
import { getRoomConfig } from "../../requests/requests";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      users: [],
      val: false,
      roomSlug: this.$route.params.room,
      roomConfig: null,
      roomHostUserId: null,
    };
  },
  components: {
    GamePlayScreen,
    GameRoomScreen,
  },
  methods: {
    set() {
      this.val = !this.val;
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["userToken", "currentUser"]),
  },
  created() {
    getRoomConfig(this.roomSlug).then((data) => {
      this.roomConfig = data.config;
      this.roomHostUserId = data.room.created_by;
    });
    window.echo.connector.pusher.config.auth.headers["Authorization"] =
      "Bearer " + this.userToken;
    window.echo
      .join(`game.room.${this.$route.params.room}`)
      .here((users) => {
        users.forEach((user) => {
          user.point = 0;
          this.users.push(user);
          console.log("11");
        });
        console.log(this.users);
      })
      .joining((user) => {
        this.users.push(user);
        console.log("22");
      })
      .leaving((user) => {
        let index = this.users
          .map(function (user) {
            return user.id;
          })
          .indexOf(user.id);
        this.users.splice(index, 1);
      })
      .listen("StartGame", (gameStatus) => {
        if (gameStatus.IsGameStarted) {
          this.val = true;
        }
      });
  },
  beforeRouteLeave(to, from, next) {
    window.echo.leave(`game.room.${this.roomSlug}`);
    next();
  },
};
</script>
<style scoped>
</style>
