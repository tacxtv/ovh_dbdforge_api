<template lang="pug">
.col-12.col-sm-9.flex.relative.column
  .row.q-col-gutter-md.q-mb-md
    div
      q-card.bg-secondary.full-height.content-center(flat)
        q-btn.full-height(color="white" to="/wiki/characters" icon="mdi-reply" flat)
    .col
      q-card.bg-primary.q-pa-md.text-white(flat)
        div(v-text="character.name")
    div
      nuxt-link(:to="'/wiki/characters/?filters[:height]=' + character.height")
        q-card.bg-primary.q-pa-sm.full-height.content-center.text-white(flat)
          //- q-icon.q-mr-sm(name="mdi-radar" size="sm")
          span(v-text="character.height")
    div
      q-card.bg-primary.q-pa-sm.full-height.content-center.text-white(flat)
        q-icon.q-mr-sm(name="mdi-radar" size="sm")
        span 20m*
    div
      q-card.bg-primary.q-pa-sm.full-height.content-center.text-white(flat)
        q-icon.q-mr-sm(name="mdi-run-fast" size="sm")
        span 4.4 m/s*
    div
      q-card.bg-primary.q-pa-sm.full-height.content-center.text-white(flat)
        q-icon(name="mdi-gender-female" size="md")
        q-icon(name="mdi-gender-male" size="md")
    div
      q-card.bg-warning.full-height.content-center(flat)
        q-btn.full-height(color="white" flat) Voir en plus +
  .col.q-mb-md
    .row.full-height
      .col-12.col-sm-3.q-mb-xs-md.q-mb-sm-none(:class="{'full-height': $q.screen.width > 700}")
        q-card.bg-primary.full-height.q-mr-sm-md.text-white(flat)
          div
            q-img.fit(src="/img/IconPowers_huntingHatchets.webp" fit="contain")
          q-toolbar.absolute-bottom.text-center
            q-toolbar-title Hunting Hatchets
      .col-12.col-sm.full-height
        q-card.bg-primary.full-height.text-white(flat)
          q-card-section.q-pa-md.text-center
            .text-h6 A propos
          q-card-section.q-pa-md
            div(v-html="character.biography")
  q-card.bg-primary(flat)
    q-carousel.bg-transparent(
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="warning"
      infinite
      padding
      arrows
      height="200px"
      class="rounded-borders"
    )
      q-carousel-slide(:name="1" class="column no-wrap")
        .row.fit.justify-start.items-center.q-gutter-xs.q-col-gutter.no-wrap
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
      q-carousel-slide(:name="2" class="column no-wrap")
        .row.fit.justify-start.items-center.q-gutter-xs.q-col-gutter.no-wrap
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
      q-carousel-slide(:name="3" class="column no-wrap")
        .row.fit.justify-start.items-center.q-gutter-xs.q-col-gutter.no-wrap
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
          q-img.rounded-borders.col.full-height(src="/img/IconPerks_beastOfPrey.webp")
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const $q = useQuasar()
const { character } = defineProps(['character'])

const slide = ref(1)
</script>
