<script setup lang="ts">
import { logOut, test } from './mainPage';

</script>

<template>
  <p>Main</p>
  <button @click=logOut()>Log out</button>
  {{ test() }}
</template>