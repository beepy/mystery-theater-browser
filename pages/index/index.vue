<template>
  <div v-relative-slide="{ value: 1, type: 'episodes' }">
    <PageOfEpisodes :page="1" />
    <!-- not used, except to force desired route to be generated -->
  </div>
</template>
