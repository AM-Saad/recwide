<template>
  <div>

    <div v-if="meetings.length > 0" class="content grid g-three p-large">
      <Meeting v-for="meeting in meetings" :meeting="meeting" :key="meeting._id" />
      <router-link to="/new-meeting" class="item-box new-item">
        <div class="button">
        Create New Meeting
        </div>
      </router-link>
    </div>
    <div v-if="meetings.length == 0">
        <div  class="content grid g-three p-large">
           <router-link to="/new-meeting" class="item-box new-item">
        <div class="button">
        Create New Meeting
        </div>
      </router-link>
        </div>
    </div>
  </div>

</template>

<script>
import Meeting from "@/components/Meetings/Meeting.vue";

export default {
  name: "List",
  data() {
    return {};
  },
  props: ["meetings"],
  components: {
    Meeting
  },
  methods: {}
};
</script>

<style >
.dashborad-header {
  margin-left: 5px;
  margin-bottom: var(--l-margin);
}
.dashborad-header a{
  color: #888;
  font-weight: bold
}
.dashborad-header h2{

    margin: var(--m-margin) 0;
    font-size: 26px;
    color: #333;

}
</style>