<template>
  <section>
    <base-dialog :show="!!error" @try-close="closeError" title="An error occurred!">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coaches-form @submit-registration="registerNewCoach"></coaches-form>
    </base-card>
  </section>
</template>

<script>
import CoachesForm from '@/components/coaches/CoachesForm'

export default {
  components: {
    CoachesForm
  },
  data() {
    return {
      error: null
    }
  },
  methods: {
    async registerNewCoach(data) {
      try {
        await this.$store.dispatch('coaches/addNewCoach', data)
      } catch (error) {
        this.error = error.message || 'Something went wrong :('
      }
      if (this.error === null) {
        await this.$router.replace('/coaches')
      }
    },
    closeError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>