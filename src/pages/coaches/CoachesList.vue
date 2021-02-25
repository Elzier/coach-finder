<template>
  <div>
    <section>
      <coaches-filter @filter-params="setFilter"></coaches-filter>
    </section>
    <section>
      <base-card>
        <base-dialog :show="!!error" @try-close="closeErrorDialog" title="An error occurred!">
          <p>{{ error }}</p>
        </base-dialog>
        <div class="controls">
          <base-button mode="outline" @click="uploadCoaches(true)">Refresh</base-button>
          <base-button v-if="authenticated && !isCoach" link to="/register">Register as a coach</base-button>
          <base-button v-if="!authenticated" link to="/auth?redirect=register">Login and became a coach!</base-button>
        </div>
        <base-spinner v-if="loadSpinner"></base-spinner>
        <ul v-else>
          <coaches-item v-for="coach in filteredCoaches"
                        :key="coach.id"
                        :id="coach.id"
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas"
          ></coaches-item>
        </ul>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachesItem from '@/components/coaches/CoachesItem'
import CoachesFilter from '@/components/coaches/CoachesFilter'

export default {
  components: {
    CoachesItem,
    CoachesFilter
  },
  data() {
    return {
      error: null,
      loadSpinner: false,
      filterParams: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  async created() {
    await this.uploadCoaches()
  },
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'].filter(coach => {
        if (this.filterParams.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (this.filterParams.backend && coach.areas.includes('backend')) {
          return true
        }
        return this.filterParams.career && coach.areas.includes('career')
      })
    },
    authenticated() {
      return this.$store.getters.isAuthenticated
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  methods: {
    setFilter(filterSettings) {
      this.filterParams = filterSettings
    },
    async uploadCoaches(refresh = false) {
      this.loadSpinner = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', refresh)
      } catch (error) {
        this.error = error.message || 'Something went wrong :('
      }
      this.loadSpinner = false

    },
    closeErrorDialog() {
      this.error = null
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>