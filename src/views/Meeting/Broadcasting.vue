<template>
  <div>
    <div>
        <div class="wrapper">
        <main class="">
 
         
            <div class="">
                <MeetingBroadcast :ready="ready" v-on:AllowAccess="openAllowAccess('Webcam')"/>
            </div>
        </main>
        </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/Meetings/List.vue";
import AuthNav from "@/components/Common/AuthNav.vue";
import SendInvitation from "@/components/Popups/Send_Invitation.vue";
import MeetingBroadcast from "@/components/Meetings/Meeting_broadcast.vue";
import "@/assets/css/main_dashboard.css";
import "@/assets/css/dashboardnav.css";
import { mapState } from "vuex";
import { setTimeout } from "timers";
import io from "socket.io-client";
import Allowaccess from "@/components/Popups/Allow_access.vue";

export default {
  data() {
    return {
      currentId: null,
      deleteing: false,
      starting: false,
      showSendInvitationModel: false,
      socket: null,
      ready: false,
      requestedGuide: null,
      showAllowAccess: false
    };
  },
  components: {
    AuthNav,
    SendInvitation,
    MeetingBroadcast,
    Allowaccess
  },
  computed: {
    ...mapState("meetings", ["meetings", "fetching", "currentMeeting"]),
    ...mapState(["url"]),

  },
  async created() {


    this.socket = io(`${this.url}/meeting/start`);

    this.socket.emit("register", this.currentMeeting._id);
  },
  methods: {
 
    async endMeeting(e, id) {
      if (confirm("Do you really want to cancel this meeting?")) {
        this.deleteing = true;
        const res = await this.$store.dispatch({
          type: "meetings/deleteMeeting",
          id: id
        });

        if (!res.state) {
          this.deleteing = false;

          return (document.querySelector(".meeting-error").innerHTML = res.msg);
        } else {
          return this.$router.push(`/meetings`);
        }
      } else {
        e.preventDefault();
      }
    },
  
    openAllowAccess(requestedGuide) {
      this.requestedGuide = requestedGuide;
      this.showAllowAccess = true;
    },
    closeAllowAccess() {
      this.showAllowAccess = false;
    }
  },
  watch: {
    isAuth(val) {
      if (!val) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.meeting-wrapper {
  width: 100%;
  margin: var(--m-margin) 0;
  background: #fff;
  padding: var(--m-margin);
  border-radius: var(--m-radius);
  border: 1px solid #ccc;
}
.meeting-wrapper p {
  margin-bottom: var(--l-margin);
  font-size: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.meeting-wrapper p:last-child {
  margin-bottom: 0;
}
.copy_area {
  background-color: #eeeeee;
  padding: var(--s-padding);
  border-radius: var(--s-radius);
  cursor: pointer;
  font-size: 18px;
  position: relative;
  width: 691px;
  display: block;
  overflow: hidden;
  max-width: 80%;
}
.copy-btn {
  position: absolute;
  right: 0;
  top: 0;
  background-color: green;
  border-radius: var(--s-radius);
  width: 60px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
</style>