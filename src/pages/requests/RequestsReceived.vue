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
    <BaseCard>
      <header>
        <h2>Requests Received</h2>
      </header>
      <BaseSpinner v-if="isLoading"/>
      <ul v-if="hasRequests && !isLoading">
        <RequestItem
          v-for="request in requests"
          :key="request.id"
          :message="request.message"
          :email="request.userEmail"
        />
      </ul>
      <h3 v-if="!hasRequests && !isLoading">
        You haven't received any requests yet!
      </h3>
    </BaseCard>
  </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import RequestItem from "../../components/requests/RequestItem";
import BaseSpinner from "../../components/ui/BaseSpinner";

export default {
  name: 'RequestsReceived',
  components: {BaseSpinner, RequestItem},
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      requests: 'requests/requests',
      hasRequests: 'requests/hasRequests',
    }),
  },
  methods: {
    ...mapActions({
      fetchRequests: 'requests/fetchRequests',
    }),
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.fetchRequests();
        this.isLoading = false;
      } catch(error) {
        this.error = error.message || 'Sorry, something went wrong!'
      }
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadRequests();
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
