<template>
  <div>

    <div v-if="projects.length > 0" class="content grid g-three p-large">
      <Project v-for="project in projects" :project="project" :key="project._id" />
      <router-link to="/recorder" class="project new-project">
        <div class="button">
        Create New Project
        </div>
      </router-link>
    </div>
    <div v-if="projects.length == 0">
        <div  class="content grid g-three p-large">
           <router-link to="/recorder" class="project new-project">
        <div class="button">
        Create New Project
        </div>
      </router-link>
        </div>
    </div>
  </div>

</template>

<script>
import Project from "@/components/User/Projects/Project.vue";

export default {
  name: "List",
  data() {
    return {};
  },
  props: ["projects"],
  components: {
    Project
  },
  methods: {}
};
</script>

<style >
h2 {
  margin-left: 5px;
  margin-bottom: var(--l-margin);
}
.project {
  position: relative;
  padding: var(--m-padding);
  border-radius: var(--m-radius);
  background-color: #fff;
  border: 1.2px solid #eee;
  box-shadow: var(--shadow3);
  z-index: 99;
  border-top-left-radius: 0;
}
.project::before {
  content: "";
  position: absolute;
  left: -1px;
  top: -21px;
  width: 40%;
  height: 20px;
  background-color: inherit;
  border: inherit;
  border-top-right-radius: 19px;
  border-bottom: 0;
  box-shadow: -3px -4px 9px 0px rgb(163 163 163 / 11%);
}

.project img{
  height: 30px;
}
.project h3{
    margin: var(--m-margin) 0;
    font-size: 17px;
    color: #444;
}
.project span{
  display: block;
  font-weight: bold;
  color: #555;
  text-align: right;
  font-size: 14px;
  letter-spacing: .7px
}
.new-project {
  border: 1.8px dashed #ccc;
  background-color: #eee;
}
.new-project .button {
  background-color: blue;
  padding: var(--m-padding);
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-radius: var(--m-radius);
  color: #fff;
  font-size: 12px;
}
</style>