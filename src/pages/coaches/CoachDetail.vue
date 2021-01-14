<template>
  <div>
    <section>
      <BaseCard>
        <h2> {{ fullName }}</h2>
        <h3> ${{ rate }}/hour</h3>
        <p> {{ description }}</p>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton
              link
              :to="contactLink"
          >
            Contact
          </BaseButton>
        </header>
        <router-view/>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area"/>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'CoachDetail',
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    }
  },
  computed: {
    ...mapGetters({
      coaches: 'coaches/coaches',
    }),
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    }
  },
  created() {
    this.selectedCoach = this.coaches.find(
      coach => coach.id === this.id
    );
  }
}
</script>

<style scoped>

</style>
