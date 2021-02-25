<template>
  <div>
    <base-dialog :show="isLoading" fixed title="Authorization...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error && !isLoading" @try-close="closeError" title="An error occurred!">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="userEmail">Email:</label>
          <input type="email" autocomplete="user-email" id="userEmail" v-model.trim="email">
        </div>
        <div class="form-control">
          <label for="current-password">Password:</label>
          <input type="password" autocomplete="current-password" id="current-password" v-model.trim="password">
        </div>
        <p v-if="!isValid">Please enter a valid email and password (must be at least 6 characters long)</p>
        <div class="buttons">
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button @click="changeAuthMode" mode="flat" type="button">{{ switchModeButtonCaption }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      mode: 'logIn',
      isValid: true,
      error: null,
      isLoading: false
    }
  },
  methods: {
    changeAuthMode() {
      if (this.mode === 'logIn') {
        this.mode = 'signUp'
      } else {
        this.mode = 'logIn'
      }
    },
    async submitForm() {
      const userData = {
        email: this.email,
        password: this.password
      }

      if (this.email === '' && !this.email.includes('@') && this.password.length < 6) {
        this.isValid = false
        return
      }

      this.isLoading = true

      try {
        if (this.mode === 'signUp') {
          await this.$store.dispatch('signUp', userData)
        } else {
          await this.$store.dispatch('logIn', userData)
        }
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later.'
        this.isLoading = false
        return
      }
      this.isLoading = false
      if (!this.isCoach) {
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectUrl)
      } else {
        this.$router.replace('/coaches')
      }
    },
    closeError() {
      this.error = null
    }
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'logIn') {
        return 'Login'
      } else {
        return 'Signup'
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'logIn') {
        return 'Signup instead'
      } else {
        return 'Login instead'
      }
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
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

.buttons {
 display: flex;
  justify-content: space-between;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>