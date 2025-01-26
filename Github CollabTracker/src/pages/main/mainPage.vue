<script setup lang="ts">
import { Application } from './mainPage';

const application = new Application();
application.startMain();

</script>

<template>
  <p>Main</p>
  <button @click=application.logOut()>Log out</button>
  <button @click=application.refresh()>refresh</button>
  <button @click=application.getTotalCollaborations()>Get all of your collaborations</button>
  <button @click=application.getMaxCollaborators()>Repo most collaborations</button>
  <button @click=application.getMaxCollaborators()>Repo most collaborations</button>


</template>