<template>
 <section>
   <base-dialog :show="!!error" title="An error occurred!" @try-close="closeError">
     <p>{{ error }}</p>
   </base-dialog>
   <base-card>
     <header>
       <h2>Requests Received</h2>
     </header>
     <ul v-if="hasRequests">
       <request-item
           v-for="request in requests"
           :key="request.id"
           :email="request.userEmail"
           :message="request.userMessage"
       ></request-item>
     </ul>
     <h3 v-else>You haven't received any requests yet!</h3>
   </base-card>
 </section>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem'

export default {
  components: {
    RequestItem
  },
  data() {
    return {
      error: null
    }
  },
  created() {
    this.uploadRequests()
  },
  computed:{
    hasRequests() {
      return this.$store.getters['requests/doRequestExists']
    },
    requests() {
      return this.$store.getters['requests/getRequests']
    }
  },
  methods: {
    async uploadRequests() {
      try {
        await this.$store.dispatch('requests/loadRequests')
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
    },
    closeError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>