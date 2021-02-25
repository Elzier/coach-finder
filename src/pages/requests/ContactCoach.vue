<template>
  <base-dialog :show="!!error" @try-close="closeError" title="An error occurred!">
    <p>{{ error }}</p>
  </base-dialog>
  <form @submit.prevent="sendMessage">
    <div class="class-form">
      <label for="email">email</label>
      <input v-model.trim="email" id="email" type="email">
    </div>
    <div class="class-form">
      <label for="message">message</label>
      <textarea v-model.trim="message" id="message" rows="5"></textarea>
    </div>
    <p v-if="!isValid" class="errors">Please enter a valid email and message containing at least 5 characters.</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      email: '',
      message: '',
      isValid: true
    }
  },
  methods: {
    async sendMessage() {
      this.isValid = true
      if (this.email ==='' || !this.email.includes('@') || this.message.length < 5) {
        this.isValid = false
        return
      }
      try {
        await this.$store.dispatch('requests/contactCoach', {
          coachId: this.$route.params.id,
          userEmail: this.email,
          userMessage: this.message
        })
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
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  margin-top: 10px;
  text-align: center;
}
</style>