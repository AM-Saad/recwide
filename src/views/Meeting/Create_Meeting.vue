<template>
<div>
    <div class="wrapper">
        <AuthNav></AuthNav>
<main>

          <div class="dashborad-header">
              <a>My Account</a>
        <h2>Create Meeting</h2>
</div>
        <form @submit.prevent="createMeeting" class="create-meeting">
            <div class="form-group">
                <label for="topic">Topic</label>
                <input required class="form-control" type="text" name="topic" v-model="form.topic" id="topic">
            </div>
            <div class="form-group">
                <label for="when">When</label>
                <div class="flex">
                <input required class="form-control m-r-3" type="date" v-model="form.date.date" name="" id="when">
                <input required class="form-control m-l-3" type="time" v-model="form.date.time" name="" id="when">
               
                </div>
            </div>
            <div class="form-group">
                <label for="duration">Duration</label>
                <div class="flex">
                <div class="m-r-3">
                <select class="form-control" type="text" name="hours" v-model="form.duration.hours" id="duration">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <span class="m-l-3">Hr</span>
                </div>
                <div class="m-r-3 m-l-3">
                <select required class="form-control" type="text" name="mins" v-model="form.duration.mins" id="">
                    <option value="0">0</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
                <span class="m-l-3">Mins</span>
                </div>
                </div>
            </div>
            <div class="form-group">
                <label for="timezone">Time Zone</label>
                <select required class="form-control" type="text" name="mins" v-model="form.date.timezone" id="timezone">
                    <option v-for="time in timeZones" :key="time.text" :value="time.text">{{time.text}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="passcode">passcode</label>
                <input required class="form-control" type="text" name="passcode" v-model="form.passcode" id="passcode">
            </div>
            <button class="btn btn-main" >Create</button>
        </form>
</main>

    </div>
    </div>
</template>

<script>
import timeZones from "../../constants/time-zones.json";
import AuthNav from "@/components/Common/AuthNav.vue";
import "@/assets/css/main_dashboard.css";
import "@/assets/css/dashboardnav.css";
export default {
  name: "Create_Meeting",
  data() {
    return {
      form: {
        topic: "My Topic",
        duration: {
          hours: 1,
          mins: 0
        },
        passcode: 1234,
        date: {
          date: "",
          time: "",
          timezone: ""
        }
      }
    };
  },
  components: {
    AuthNav
  },
  computed: {
    timeZones() {
      return timeZones;
    }
  },
  methods: {
    async createMeeting() {
      const res = await this.$store.dispatch({
        type: "meetings/createMeeting",
        data: this.form
      });
      if(res){
        this.$router.push("/meeting");
      }
    }
  }
};
</script>

<style scoped>
label {
  font-size: 25px;
  color: #555;
  text-transform: capitalize;
  margin-right: 21px;
  display: inline-block;
  min-width: 200px;
}
.create-meeting {
  padding: var(--m-padding);
  background: #f9f9f9;
  border-radius: var(--m-radius);
  margin-top: var(--l-margin);
}
</style>