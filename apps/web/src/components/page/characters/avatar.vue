<template lang="pug">
.col-12.col-sm-3
  q-card.bg-primary.q-mb-md(flat)
    q-img(src="/img/New_Store_Huntress.webp")
      .absolute-bottom.full-width
        q-toolbar
          q-toolbar-title(v-text="character.name")
  q-card.bg-primary(flat)
    .row
      .col(v-for="i in 3")
        q-btn.fit(flat)
          q-avatar.gt-sm.inline(size="128px")
            q-img(src="/img/IconPerks_hexHuntressLullaby.webp")
          q-avatar.lt-md.inline(size="64px")
            q-img(src="/img/IconPerks_hexHuntressLullaby.webp")
</template>

<script lang="ts" setup>
const { character } = defineProps(['character'])
</script>
