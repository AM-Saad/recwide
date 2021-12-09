<template>
  <div>
    <div>
        <div class="wrapper">
        <AuthNav></AuthNav>
        <main class="">

            <div class="dashborad-header">
                <a>My Meetings</a>
                <div v-if="!currentMeeting">Loading...</div>
                <h2 v-if="!currentMeeting">{{currentMeeting.topic}}</h2>
              <div class="flex f-end" v-if="currentMeeting">

              <h2> </h2>
              <router-link :to="{name:'start-meeting', params:{id:currentMeeting._id}}" v-if="!starting" class="btn btn-small btn-success">Start</router-link>
              <button v-if="starting" class="btn btn-small btn-success">
                <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>
              </button>
              <button @click="deleteMeeting( $event,currentMeeting._id)" v-if="!deleteing" class="btn btn-small btn-alert">Cancel</button>
              <button v-if="deleteing" class="btn btn-small btn-alert">
                <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>
              </button>
      </div> 
            </div>
               <div class="">
              <div class="meeting-wrapper">
                    <p>Host: {{currentMeeting.host}}</p>
                    <p>When: {{currentMeeting.date.date}} {{currentMeeting.date.time}} {{amOrPm}}</p>
                    <p>Duration: {{currentMeeting.duration.hours}}Hr : {{currentMeeting.duration.mins}} mins</p>
                    <p>Passcode: {{currentMeeting.passcode}}</p>
                    <p @click="copyUrl(`${url}/${currentMeeting.invitations_url}`)">Invitation Url: <span class="copy_area"> {{this.url}}/{{currentMeeting.invitations_url}}<span class="copy-btn">copy</span></span></p>
              <hr>
                <div class="p-large">
                    <div class="flex f-space-between">

                  <h3>Invitations:</h3>
                  <button class="btn btn-small btn-info" @click="()=>{showSendInvitationModel = true}">Invite</button>
                    </div>
                    <p class="m-3" v-if="currentMeeting.parties.length === 0">No one is invited</p>
                    <div v-if="currentMeeting.parties.length > 0">
                        <p v-for="p in currentMeeting.parties" :key="p._id">
                            {{p.email}}
                        </p>
                    </div>
                </div>
              </div>
              <SendInvitation
                v-on:cancel="closeSendInvitation"
                v-if="showSendInvitationModel"
                :meeting="currentMeeting"
    />
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
import "@/assets/css/main_dashboard.css";
import "@/assets/css/dashboardnav.css";
import { mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      currentId: null,
      deleteing: false,
      starting: false,
      showSendInvitationModel: false
    };
  },
  components: {
    AuthNav,
    SendInvitation
  },
  computed: {
    ...mapState("meetings", ["meetings", "fetching", "currentMeeting"]),
    ...mapState(["url"]),
    amOrPm(){
        const time= this.currentMeeting.date.time.slice(0, 2);
        if(time > 12){
            return "PM"
        }else{
            return "AM"
        }
}
  },
  async created() {
    this.$store.commit("meetings/fetching", true);

    await this.getMeetings();
    this.currentId = this.$route.params.id;

    const currentMeeting = this.meetings.find(
      p => p._id.toString() === this.currentId
    );
    await this.$store.dispatch({
      type: "meetings/currentMeeting",
      currentMeeting
    });
  },
  methods: {
    async getMeetings() {
      if (this.meetings.length === 0) {
        await this.$store.dispatch({ type: "meetings/getMeetings" });
      }
      this.$store.commit("meetings/fetching", false);
    },
    async deleteMeeting(e, id) {
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
    copyUrl(text) {
      if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
      } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy"); // Security exception may be thrown by some browsers.
          document.querySelector(".copy-btn").innerText = "Copied.";
          setTimeout(() => {
            document.querySelector(".copy-btn").innerText = "Copy.";
          }, 2000);
        } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
        } finally {
          document.body.removeChild(textarea);
        }
      }
    },
    closeSendInvitation() {
      this.showSendInvitationModel = false;
    }
  },
  watch: {
    isAuth(val) {
      if (!val) {
        this.$router.push("/");
      }
    },
  
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