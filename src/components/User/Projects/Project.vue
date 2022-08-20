<template>
  <router-link
    :to="{ name: 'project', params: { slug: project.slug } }"
    class="project"
  >
    <div class="flex f-space-between">
      <h3 class="project-title">{{ project.name }}</h3>
      <img
        class="project-mode"
        v-if="project.mode === 'screenAndWebcam'"
        src="@/assets/images/both.svg"
      />
      <img
        class="project-mode"
        v-if="project.mode === 'screen'"
        src="@/assets/images/screen.svg"
      />
      <img
        class="project-mode"
        v-if="project.mode === 'webcam'"
        src="@/assets/images/cam.svg"
      />
    </div>
    <div class="flex">
      <span>{{ project.res }}</span>
    </div>
    <span class="project-date">{{ project.date }}</span>
  </router-link>
</template>

<script>
export default {
  name: "Project",
  props: ["project"],
};
</script>
