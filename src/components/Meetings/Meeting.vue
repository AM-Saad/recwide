<template>
  <router-link :to="{name:'meeting', params:{slug:meeting._id}}" class="item-box">

    <!-- <img class="meeting-icon" src="@/assets/images/nav/record_g.png" /> -->
       <div class="flex f-space-between">
   <h3 class="item-box-title"> {{ meeting.topic }}</h3>
      <img class="item-box-mode" v-if="meeting.mode === 'screenAndWebcam'" src="@/assets/images/both.svg">
      <img class="item-box-mode" v-if="meeting.mode === 'screen'" src="@/assets/images/screen.svg">
      <img class="item-box-mode" v-if="meeting.mode === 'webcam'" src="@/assets/images/cam.svg">
    </div>
  <div class="flex">
    <span>{{meeting.res}}</span>
  </div>
    <span class="meeting-date">{{meeting.date.date}}</span>
  </router-link>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "meeting",
  data() {
    return {};
  },
  props: ["meeting"],
  components: {},
  computed: {
    ...mapState("user", ["meetings", "fetching", "isAuth"])
  },

};
</script>

<style scoped>
</style>