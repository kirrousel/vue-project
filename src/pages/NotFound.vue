<template>
  <section>
    <BaseCard>
      <h2>Page not found</h2>
      <p>Maybe check out all our
        <router-link to="/coaches">coaches.</router-link>
      </p>
    </BaseCard>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>

</style>
