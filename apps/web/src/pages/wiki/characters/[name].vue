<template lang="pug">
q-page(style="margin: auto; max-width: 1366px;")
  q-custom-layout-default-breadcrumbs
  .row.q-col-gutter-md
    q-custom-page-characters-avatar(:character="character.data")
    q-custom-page-characters-infos(:character="character.data")
    .col
      q-card.bg-primary(flat)
        q-card-section.q-pa-md.text-center
          .text-h6 Histoire
        q-card-section.q-pa-md(v-html="character.data.story")
</template>

<script lang="ts" setup>
const $route = useRoute()

const { data: character } = await useHttp<any>(`/wiki/characters/${$route.params.name}`)
</script>
