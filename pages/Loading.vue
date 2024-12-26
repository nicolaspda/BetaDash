<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="flex justify-center">
      <img
        src="https://i.postimg.cc/DyWW65wL/dina-logo.png"
        width="200"
        :class="logoClass"
      />
    </div>
    <div class="w-80 mt-3">
      <ProgressBar
        :value="loading"
        :showValue="false"
        style="height: 7px"
      ></ProgressBar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: 0,
      interval: null,
    };
  },
  mounted() {
    this.startProgress();
  },
  methods: {
    startProgress() {
      this.interval = setInterval(() => {
        let newValue = this.loading + 18;
        if (newValue >= 100) {
          newValue = 100;
          this.endProgress();
        }
        this.loading = newValue;
      }, 1400);
    },
    endProgress() {
      clearInterval(this.interval);
      this.interval = null;
      setTimeout(() => {
        this.$router.push("/Home");
      }, 1200);
    },
  },
  computed: {
    logoClass() {
      return this.loading < 100
        ? "flex pb-3 mb-2 animate-fadein animate-duration-2000 animate-infinite"
        : "flex pb-3 mb-2 w-44 transition-all transition-duration-500 animate-delay-1000";
    },
  },
};
</script>

<style scoped></style>
