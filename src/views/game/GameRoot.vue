<template>
  <div>
    <GameRoomScreen
      v-if="!showGameScreen"
      :roomConfig="gameRoom"
      :currentUser="authUser"
      :roomSlug="roomSlug"
    ></GameRoomScreen>
    <GamePlayScreen
      :currentUser="authUser"
      :roomSlug="roomSlug"
      :gameAction="gameAction"
      v-else
    ></GamePlayScreen>
  </div>
</template>
<script>
import GamePlayScreen from "./_PlayGame";
import GameRoomScreen from "./_GameRoom";
import { mapGetters } from "vuex";

export default {
  components: {
    GamePlayScreen,
    GameRoomScreen,
  },
  data() {
    return {
      showGameScreen: false,
      roomSlug: this.$route.params.room,
    };
  },
  computed: {
    ...mapGetters(["userToken", "authUser", "gameUsers", "gameRoom"]),
  },
  created() {
    this.$store
      .dispatch("getRoomConfigByRoomSlug", this.roomSlug)
      .catch((err) => {
        console.log(err);
      });

    window.echo.connector.pusher.config.auth.headers["Authorization"] =
      "Bearer " + this.userToken;
    window.echo
      .join(`game.room.${this.$route.params.room}`)
      .here((users) => {
        users.forEach((user) => {
          this.$store.dispatch('setGameUserWithSorting',user);
        });
      })
      .joining((user) => {
        this.$store.dispatch("setGameUserWithSorting", user);
      })
      .leaving((user) => {
        this.$store.dispatch('removeGameUserWithSorting',user);
      })
      .listen("StartGame", (gameStatus) => {
        if (gameStatus.IsGameStarted) {
          this.$store.commit("isStartGame", true);
          this.showGameScreen = true;
        }
      })
      .listen("GameActionBroadcast", (gameAction) => {
        this.$store.commit("setGameActioData", gameAction);
      });
  },
 beforeRouteLeave(to, from, next) {
    window.echo.leave(`game.room.${this.roomSlug}`); //wait until leave ws channel
    setTimeout(() => {
    next();  
    }, 1000);
  },
};
</script>
<style scoped>
</style>
