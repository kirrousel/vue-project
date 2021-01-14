<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData"/>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm";
import {mapActions} from "vuex";
export default {
  name: 'CoachRegistration',
  components: {CoachForm},
  methods: {
    ...mapActions({
      registerCoach: 'coaches/registerCoach',
    }),
    saveData(data){
      this.registerCoach(data);
      this.$router.replace('/coaches');
    },
  },
}
</script>

<style scoped>

</style>
