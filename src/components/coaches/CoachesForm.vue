<template>
  <form @submit.prevent="registerCoach">
    <div class="form-control">
      <label for="firstName">First Name</label>
      <input id="firstName" type="text" v-model.trim="firstName.value" @blur="validateFirstName" :class="{invalid: !firstName.valid}">
      <p class="error" v-if="!firstName.valid">Firstname must not be empty!</p>
    </div>
    <div class="form-control">
      <label for="lastName">Last Name</label>
      <input id="lastName" type="text" v-model.trim="lastName.value" @blur="validateLastName" :class="{invalid: !lastName.valid}">
      <p class="error" v-if="!lastName.valid">Lastname must not be empty!</p>
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description.value" @blur="validateDesc" :class="{invalid: !description.valid}"></textarea>
      <p class="error" v-if="!description.valid">Description must contain at least 10 characters!</p>
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input id="rate" type="number" v-model.number="hourlyRate.value" @blur="validateRate" :class="{invalid: !hourlyRate.valid}">
      <p class="error" v-if="!hourlyRate.valid">Rate must be greater than 0!</p>
    </div>
    <h3>Areas od Expertise</h3>
    <div class="form-control">
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.value">
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.value">
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.value">
        <label for="career">Career Advisory</label>
      </div>
      <p class="error" v-if="!areas.valid">At least one expertise must be selected!</p>
    </div>
    <p v-if="!isFormValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['submit-registration'],
  data() {
    return {
      firstName: {
        value: '',
        valid: true
      },
      lastName: {
        value: '',
        valid: true
      },
      description: {
        value: '',
        valid: true
      },
      hourlyRate: {
        value: null,
        valid: true
      },
      areas: {
        value: [],
        valid: true
      },
      isFormValid: true
    }
  },
  methods: {
    validateFirstName() {
      if (!this.firstName.value || this.firstName.value === '') {
        this.firstName.valid = false
        this.isFormValid = false
      } else {
        this.firstName.valid = true

      }
    },
    validateLastName() {
      if (!this.lastName.value || this.lastName.value === '') {
        this.lastName.valid = false
        this.isFormValid = false
      } else {
        this.lastName.valid = true
      }
    },
    validateDesc() {
      if (!this.description.value || this.description.value.length < 10) {
        this.description.valid = false
        this.isFormValid = false
      } else {
        this.description.valid = true
      }
    },
    validateRate() {
      if (!this.hourlyRate.value || this.hourlyRate.value < 0) {
        this.hourlyRate.valid = false
        this.isFormValid = false
      } else {
        this.hourlyRate.valid = true
      }
    },
    validateAreas() {
      if (!this.areas.value || this.areas.value.length === 0) {
        this.areas.valid = false
        this.isFormValid = false
      }
    },

    registerCoach() {
      this.isFormValid = true
      this.validateFirstName()
      this.validateLastName()
      this.validateDesc()
      this.validateRate()
      this.validateAreas()

      if (!this.isFormValid) {
        return
      }
      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        hourlyRate: this.hourlyRate.value,
        areas: Object.values(this.areas.value)
      }
      this.$emit('submit-registration', formData)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.error {
  color: #3714B0;
}

/*.invalid input,*/
/*.invalid textarea {*/
/*  border: 1px solid red;*/
/*}*/

.invalid {
  border: 1px solid red;
}
</style>