<template>
  <li>
    <h2>{{ fullName }}</h2>
    <h3>${{ rate }}/hour</h3>
    <div>
      <base-badge v-for="area in areas" :key="area" :type="area"></base-badge>
    </div>
    <div class="actions" :class="{your: userCoachCard}">
      <base-button link mode="outline" :to="coachContactLink" v-if="!userCoachCard">Contact</base-button>
      <h4 class="your-label" v-else>Your Card</h4>
      <base-button link :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>

export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
    coachContactLink() {
      return '/coaches/' + this.id + '/contact'
    },
    coachDetailsLink() {
      return '/coaches/' + this.id
    },
    userCoachCard() {
      return this.id === this.$store.getters.userId
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3 {
  margin: 0.5rem 0;
}
h4 {
  margin: 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.your{
 justify-content: space-between;
}

.your-label {
  margin-top: 20px;
  font-size: 20px;
}
</style>