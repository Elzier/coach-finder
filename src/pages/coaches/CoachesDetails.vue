<template>
  <div>
    <div v-if="coachExists">
      <section>
        <base-card>
          <h2 @click="path">{{ fullName }}</h2>
          <h3>{{ rate }}</h3>
        </base-card>
      </section>
      <section>
        <base-card>
          <base-badge v-for="area in areas" :key="area" :type="area"></base-badge>
          <p>{{ description }}</p>
        </base-card>
      </section>
      <section>
        <base-card>
          <header>
            <h2>Interested? Reach out now!</h2>
            <base-button link :to="contactLink">Contact</base-button>
          </header>
          <router-view></router-view>
        </base-card>
      </section>
    </div>
    <not-found v-else></not-found>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCoach: null,
      coachExists: false,
      toggleContact: false
    }
  },
  props: ['id'],
  computed: {
    areas() {
      return this.selectedCoach.areas
    },
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    },
    rate() {
      return this.selectedCoach.rate
    },
    contactLink() {
      return '/coaches/' + this.id + '/contact'
    },
    description() {
      return this.selectedCoach.description
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id)
  },
  mounted() {
    if (this.selectedCoach) {
      this.coachExists = true
    }
  }
}
</script>

<style scoped>

</style>