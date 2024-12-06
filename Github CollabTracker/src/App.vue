<script setup lang="ts">

</script>

<template>
  <Suspense>
    <RouterView />

    <template #fallback>
      loading...
    </template>
  </Suspense>
</template>