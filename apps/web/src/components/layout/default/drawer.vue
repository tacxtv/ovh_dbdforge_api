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
      q-card.bg-primary.flex.column.full-height.overflow-auto.text-white(flat)
        q-list
          q-item.rounded-borders(
            v-for="(entry, key) in entries"
            :to="entry.to"
            :key="key"
            active-class="text-amber"
            clickable
          )
            q-tooltip.text-body2(anchor="center right" self="center left" v-text="entry.label")
            q-item-section(avatar)
              q-icon(:name="entry.icon || 'mdi-square-rounded'")
        q-space
        q-list
          q-item.rounded-borders(
            to="/admin"
            active-class="text-amber"
            clickable
          )
            q-tooltip.text-body2(anchor="center right" self="center left") Administration
            q-item-section(avatar)
              q-icon(name="mdi-square-rounded")
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const drawer = inject('drawer')

const entries = [
  { icon: 'mdi-home', label: 'Accueil', to: '/' },
  { icon: 'mdi-earth', label: 'Wiki', to: '/wiki' },
]
</script>
