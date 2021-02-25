<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="routes" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader'

export default {
  components: {
    TheHeader
  },
  data() {
    return {}
  },
  computed: {
    isAutoLogout() {
      return this.$store.getters.autoLogout
    }
  },
  created() {
    this.$store.dispatch('tryLogin')
  },
  watch: {
    isAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/coaches')
      }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.routes-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.routes-enter-active {
  transition: all 0.3s ease-in;
}

.routes-enter-to, .routes-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.routes-leave-active {
  transition: all 0.3s ease-out;
}

.routes-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>