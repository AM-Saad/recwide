<template>
  <div class="backdrop">
    <div class="inner">
      <div class="flex">
        <div class="icon" v-if="!micGranted && !camGranted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
            enable-background="new 0 0 30 30"
            xml:space="preserve"
          >
            <g>
              <g transform="translate(-433.000000, -258.000000)">
                <path
                  fill="#F43434"
                  d="M458.725,261.273c0.364,0.367,0.364,0.958,0,1.325l-22.128,22.13    c-0.368,0.36-0.957,0.36-1.325,0c-0.364-0.366-0.364-0.957,0-1.324l2.937-2.938h-2.274c-0.515,0-0.933-0.418-0.933-0.933v-13.066    c0-0.515,0.418-0.933,0.933-0.933h16.664c0.149,0.003,0.297,0.042,0.426,0.116l4.377-4.378    C457.768,260.909,458.357,260.909,458.725,261.273z M460.607,267.166c0.244,0.173,0.391,0.458,0.391,0.763v9.286    c0,0.305-0.146,0.59-0.391,0.764s-0.558,0.213-0.834,0.105l-6.028-2.314v3.303c0,0.513-0.405,0.929-0.907,0.929h-8.84    l10.618-10.874c0.09-0.092,0.198-0.164,0.317-0.21l4.84-1.857C460.051,266.952,460.363,266.992,460.607,267.166z"
                ></path>
              </g>
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
            enable-background="new 0 0 30 30"
            xml:space="preserve"
          >
            <g>
              <g transform="translate(-480.000000, -257.000000)">
                <path
                  fill="#F43434"
                  d="M490,273.069l-2.079,1.932c-0.607-1.171-0.922-2.452-0.921-3.75    c0-0.689,0.606-1.25,1.354-1.25s1.354,0.561,1.354,1.25C489.708,271.867,489.806,272.479,490,273.069z M500,263.182l-8.938,8.819    c-0.039-0.229-0.06-0.457-0.062-0.688v-8.875c0-2.451,2.015-4.438,4.5-4.438c2.484,0,4.5,1.987,4.5,4.438V263.182z     M495.503,276.601c-1.034-0.004-2.041-0.322-2.878-0.912l-0.883,0.857c1.864,1.391,4.377,1.633,6.486,0.626    c2.107-1.007,3.445-3.089,3.451-5.372c0-0.663,0.553-1.199,1.234-1.199c0.684,0,1.234,0.536,1.234,1.199    c-0.004,4.172-3.16,7.709-7.41,8.305v2.496h0.617c0.683,0,1.235,0.537,1.235,1.2s-0.554,1.2-1.235,1.2h-3.706    c-0.682,0-1.235-0.537-1.235-1.2s0.553-1.2,1.235-1.2h0.618v-2.496c-1.575-0.222-3.056-0.86-4.28-1.848l-2.878,2.796    c-0.312,0.304-0.767,0.423-1.194,0.312c-0.426-0.11-0.76-0.436-0.874-0.85c-0.114-0.414,0.008-0.856,0.32-1.16l18.529-18.001    c0.312-0.303,0.768-0.422,1.193-0.311s0.76,0.435,0.874,0.849c0.114,0.414-0.008,0.856-0.319,1.16l-5.195,5.046v3.703    C500.443,274.451,498.232,276.601,495.503,276.601z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div class="icon" v-if="!micGranted && camGranted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
            enable-background="new 0 0 30 30"
            xml:space="preserve"
          >
            <g>
              <g transform="translate(-480.000000, -257.000000)">
                <path
                  fill="#F43434"
                  d="M490,273.069l-2.079,1.932c-0.607-1.171-0.922-2.452-0.921-3.75    c0-0.689,0.606-1.25,1.354-1.25s1.354,0.561,1.354,1.25C489.708,271.867,489.806,272.479,490,273.069z M500,263.182l-8.938,8.819    c-0.039-0.229-0.06-0.457-0.062-0.688v-8.875c0-2.451,2.015-4.438,4.5-4.438c2.484,0,4.5,1.987,4.5,4.438V263.182z     M495.503,276.601c-1.034-0.004-2.041-0.322-2.878-0.912l-0.883,0.857c1.864,1.391,4.377,1.633,6.486,0.626    c2.107-1.007,3.445-3.089,3.451-5.372c0-0.663,0.553-1.199,1.234-1.199c0.684,0,1.234,0.536,1.234,1.199    c-0.004,4.172-3.16,7.709-7.41,8.305v2.496h0.617c0.683,0,1.235,0.537,1.235,1.2s-0.554,1.2-1.235,1.2h-3.706    c-0.682,0-1.235-0.537-1.235-1.2s0.553-1.2,1.235-1.2h0.618v-2.496c-1.575-0.222-3.056-0.86-4.28-1.848l-2.878,2.796    c-0.312,0.304-0.767,0.423-1.194,0.312c-0.426-0.11-0.76-0.436-0.874-0.85c-0.114-0.414,0.008-0.856,0.32-1.16l18.529-18.001    c0.312-0.303,0.768-0.422,1.193-0.311s0.76,0.435,0.874,0.849c0.114,0.414-0.008,0.856-0.319,1.16l-5.195,5.046v3.703    C500.443,274.451,498.232,276.601,495.503,276.601z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div class="icon" v-if="micGranted && !camGranted">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
            enable-background="new 0 0 30 30"
            xml:space="preserve"
          >
            <g>
              <g transform="translate(-433.000000, -258.000000)">
                <path
                  fill="#F43434"
                  d="M458.725,261.273c0.364,0.367,0.364,0.958,0,1.325l-22.128,22.13    c-0.368,0.36-0.957,0.36-1.325,0c-0.364-0.366-0.364-0.957,0-1.324l2.937-2.938h-2.274c-0.515,0-0.933-0.418-0.933-0.933v-13.066    c0-0.515,0.418-0.933,0.933-0.933h16.664c0.149,0.003,0.297,0.042,0.426,0.116l4.377-4.378    C457.768,260.909,458.357,260.909,458.725,261.273z M460.607,267.166c0.244,0.173,0.391,0.458,0.391,0.763v9.286    c0,0.305-0.146,0.59-0.391,0.764s-0.558,0.213-0.834,0.105l-6.028-2.314v3.303c0,0.513-0.405,0.929-0.907,0.929h-8.84    l10.618-10.874c0.09-0.092,0.198-0.164,0.317-0.21l4.84-1.857C460.051,266.952,460.363,266.992,460.607,267.166z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="title" v-if="!micGranted && !camGranted">
        Webcam and microphone will not be recorded
      </div>
      <div class="title" v-if="micGranted && !camGranted">
        Webcam will not be recorded
      </div>

      <div class="title" v-if="!micGranted && camGranted">
        Microphone will not be recorded
      </div>
      <div class="desc">
        You didn't get the permissions correctly. If you continue, the content
        without permissions will not be recorded. Do you want to continue
        recording?
      </div>

      <div class="flex f-space-between">
        <button class="btn btn-gradient btn btn-gradient-info" @click="gotit">Check Permissions</button>
        <button class="btn btn-gradient" @click="continueToRec">Continue Recording</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Permissions",
  data() {
    return {
      dontShow: false,
    };
  },
  computed: {
    ...mapState(["micGranted", "camGranted"]),
  },
  created() {},
  methods: {
    gotit() {
      this.$emit("gotit");
    },
    continueToRec() {
      this.$emit("continueToRec");
    },
  },
  watch: {},
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