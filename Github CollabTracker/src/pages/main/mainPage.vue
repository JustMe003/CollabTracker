<script setup lang="ts">
import { Application } from './mainPage';

const application = new Application();
application.startMain();

</script>

<template>
  <p>Main</p>
  <button @click=application.logOut()>Log out</button>
  <button @click=application.refresh()>refresh</button>
</template>