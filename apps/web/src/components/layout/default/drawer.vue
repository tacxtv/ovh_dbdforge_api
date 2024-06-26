<template lang="pug">
q-drawer.q-py-md.q-pl-md(
  v-model="drawer"
  side="left" :mini="true" :breakpoint="0" :mini-width="72"
  :style="{background: $q.dark.isActive ? 'var(--q-dark-page) !important' : ''}"
  persistent
)
  q-card.full-height.bg-transparent(flat)
    .row.no-wrap.column.full-height
      q-card.bg-primary.q-mb-md(flat)
        q-toolbar.q-px-none
          q-btn.rounded-borders(icon="mdi-twitch" color="white" flat stretch)
      q-card.bg-primary.full-height.overflow-auto(flat)
        q-list
          q-item.rounded-borders(v-for="i in 5" clickable)
            q-item-section(avatar)
              q-icon(name="mdi-square-rounded")
        q-space
        q-list
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const drawer = inject('drawer')
</script>
