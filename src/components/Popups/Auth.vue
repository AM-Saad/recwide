<template>
  <div class="backdrop">
    <div class="inner">
      <div class="close" @click="cancel">X</div>

      <div :class="{ loader: loading }">
        <component
          :is="currentComponent"
          @toggleForms="toggleForms"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import { mapState } from "vuex";

export default {
  name: "Permissions",
  data() {
    return {
      dontShow: false,
      name: "",
      email: "",
      password: "",
      rememberMe: false,
      loading: false,
      currentComponent: "Login",
    };
  },
  components: {
    Login,
    Signup,
  },
  computed: {
    ...mapState(["micGranted", "camGranted"]),
    ...mapState("user", ["isAuth", "user"]),
  },
  mounted() {
    let authtype = this.$route.params.type || "login";
    this.$refs[authtype].classList.add("block");
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    toggleForms(visible) {
      this.currentComponent = visible;
    },
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
  z-index: 999999999;
}
.inner {
  background-color: #fff;
  border-radius: var(--l-radius);
  border: 1px solid #ccc;
  padding: var(--l-padding);
  position: absolute;
  width: 40%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.close{
  height: 27px;
  width: 27px;
  border: 1px solid var(--main-color);
  color: #000 !important;
  border-radius: 50px;
}
.close:hover{
  background-color: #eee
}

.inner .desc {
  margin: var(--m-margin) 0;
}
.inner video {
  margin: auto;
  display: block;
  max-width: 90%;
}
form a b {
  cursor: pointer;
}
form a b:hover {
  color: #888;
}
.form-group {
  margin: var(--m-margin) 0;
  margin-bottom: 20px;
}
.form-group label {
  font-size: 20px;
}

.form-control {
  width: 100%;
  height: 50px;
  padding: var(--m-padding);
  border: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  font-size: 22px;
  color: #222;
  background: #e8f0fe;
  border-radius: var(--l-radius);
}
@media only screen and (max-width: 1025px) and (min-width: 320px) {
  .inner {
    width: 90%;
  }
}
</style>
