<script setup lang="ts">
import { Application } from './mainPage';

const application = new Application();

</script>

<template>
  <p>Main</p>
  <button @click=application.logOut()>Log out</button>
</template>