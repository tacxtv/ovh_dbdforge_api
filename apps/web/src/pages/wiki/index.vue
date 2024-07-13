<template lang="pug">
q-page(style="margin: auto; max-width: 1366px;")
  q-custom-layout-default-breadcrumbs
  .row.q-col-gutter-md
    .col-12.col-sm-3(v-for="item in menu")
      nuxt-link(:to="'/wiki' + item.path")
        q-card.bg-primary.q-mb-md.cursor-pointer(flat v-ripple)
          q-img(src="/img/New_Store_Huntress.webp")
            .absolute-bottom.full-width
              q-toolbar
                q-toolbar-title(v-text="item.label")
</template>

<script lang="ts" setup>
const menu = ref([
  {
    label: 'Characters',
    path: '/characters',
  },
  {
    label: 'Addons',
    path: '/addons',
  },
  {
    label: 'Perks',
    path: '/perks',
  },
  {
    label: 'Items',
    path: '/items',
  },
  {
    label: 'Offerings',
    path: '/offerings',
  },
  {
    label: 'Maps',
    path: '/maps',
  },
  {
    label: 'Dlcs',
    path: '/dlcs',
  }
])
</script>
