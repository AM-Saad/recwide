<template>
  <div class="backdrop">
    <div class="inner">
      <div class="flex">
 
   
      </div>
      <div class="title" >
        Send Invitation
      </div>
      <div class="desc">
        Sending invitation to make sure that everyone is notified to attened the meeting
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" name="email" id="email" v-model="email">
      </div>
      <div class="flex f-space-between">
        <button class="btn" @click="gotit">Cancel </button>
        <button class="btn btn-gradient" @click="continueToRec">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SendInvitation",
  data() {
    return {
      email: ""
    };
  },
  props: ["meeting"],
  computed: {
    ...mapState(["url"]),
    amOrPm() {
      const time = this.currentMeeting.date.time.slice(0, 2);
      if (time > 12) {
        return "PM";
      } else {
        return "AM";
      }
    }
  },
  created() {},
  methods: {
    gotit() {
      this.$emit("gotit");
    },
    async continueToRec() {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${
          this.email
        }&su=Please join Recwide meeting&body=Join Recwide meeting by clicking on this link <a href="${
          this.url
        }/${this.meeting.invitations_url}">HERE</a>. The Meeting starts on ${
          this.meeting.date.date
        } at ${this.meeting.date.time} ${this.amOrPm} Hosted by ${
          this.meeting.host
        } `,
        "_blank"
      );

      await this.$store.dispatch({
        type: "meetings/sendInvitation",
        data: { email: this.email, id: this.meeting._id }
      });

      this.$emit("cancel");
    }
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.782);
  z-index: 999999;
}
.inner {
  background-color: #fff;
  border-radius: var(--m-radius);
  border: 1px solid #ccc;
  padding: var(--m-padding);
  position: absolute;
  width: 40%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.inner .title {
  font-weight: bold;
  margin: var(--m-margin) 0;
  font-size: 22px;
}
.inner .desc {
  margin: var(--m-margin) 0;
}
.inner video {
  margin: auto;
  display: block;
  max-width: 90%;
}
@media only screen and (max-width: 767px) and (min-width: 320px) {
  .inner {
    width: 90%;
  }
}
</style>