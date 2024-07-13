<template lang="pug">
q-card.bg-gray.full-width.q-mb-md(flat)
  q-card-section.q-py-sm.q-px-md
    q-breadcrumbs
      q-breadcrumbs-el(
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.to"
        :label="breadcrumb.label"
        :to="breadcrumb.to"
      )
</template>

<script lang="ts" setup>
const $route = useRoute()

const breadcrumbs = ref($route.path.split('/').filter(Boolean).map((_, i, arr) => ({
  label: _.charAt(0).toUpperCase() + _.slice(1),
  to: '/' + arr.slice(0, i + 1).join('/'),
})))
</script>
