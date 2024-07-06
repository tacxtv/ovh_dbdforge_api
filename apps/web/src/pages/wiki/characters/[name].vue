<template lang="pug">
q-page(style="margin: auto; max-width: 1366px;")
  .row.q-col-gutter-md
    q-custom-page-characters-avatar(:character="character")
    q-custom-page-characters-infos(:character="character")
    .col
      q-card.bg-primary(flat)
        q-card-section.q-pa-md.text-center
          .text-h6 Histoire
        q-card-section.q-pa-md(v-html="character.story")
</template>

<script lang="ts" setup>
const $route = useRoute()

const { data: characterData } = await useHttp(`/wiki/characters/${$route.params.name}`)
const character = characterData.value.data
</script>
