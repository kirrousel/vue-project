<template>
  <div>
    <BaseDialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p> {{ error }}</p>
    </BaseDialog>
    <section>
     <CoachFilter
       @change-filter="setFilters"
     />
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="setCoaches(true)">
            Refresh
          </BaseButton>
          <BaseButton
            link
            to="/register"
            v-if="showRegisterButton"
          >
            Register as a Coach
          </BaseButton>
          <BaseButton
              link
              to="/auth?redirect=register"
              v-if="!isLoggedIn"
          >
            Login to Register as Coach
          </BaseButton>
        </div>
        <div v-if="isLoading">
          <BaseSpinner/>
        </div>
        <ul v-else-if="!isLoading && hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :coach="coach"
          />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CoachItem from "../../components/coaches/CoachItem";
import CoachFilter from "../../components/coaches/CoachFilter";
import BaseSpinner from "../../components/ui/BaseSpinner";

export default {
  name: 'CoachesList',
  components: { BaseSpinner, CoachFilter, CoachItem },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: null,
    }
  },
  computed: {
    ...mapGetters({
      coaches: 'coaches/coaches',
      hasCoaches: 'coaches/hasCoaches',
      isCoach: 'coaches/isCoach',
      isLoggedIn: 'isAuthenticated',
    }),
    filteredCoaches() {
      return this.coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }

        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }

        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    showRegisterButton() {
      return this.isLoggedIn &&!this.isCoach && !this.isLoading
    },

  },
  methods: {
    ...mapActions({
      loadCoaches: 'coaches/loadCoaches',
    }),
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async setCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.loadCoaches({forceRefresh: refresh});
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    handleError() {
      this.error = null
    }
  },
  created() {
    this.setCoaches();
  },
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
