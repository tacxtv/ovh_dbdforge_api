<template lang="pug">
q-page(style="margin: auto; max-width: 1366px;")
  .row.q-col-gutter-md
    .col-12.col-sm-3(v-for="character in characters")
      nuxt-link(:to="'/wiki/characters/' + character.slug")
        q-card.bg-primary.q-mb-md.cursor-pointer(flat v-ripple)
          q-img(src="/img/New_Store_Huntress.webp")
            .absolute-bottom.full-width
              q-toolbar
                q-toolbar-title(v-text="character.name")
</template>
<script lang="ts" setup>
const { data: charactersData } = await useHttp(`/wiki/characters`)
const characters = charactersData.value.data
</script>
