<script setup lang="ts">
import { GitTokenCookie } from '../../authorization/cookies/GitTokenCookie';
import { GitRefreshCookie } from '../../authorization/cookies/GitRefreshCookie';
import router from '../../router/router';
import { DataManager } from '../../DataManager/DataManager';

function test() {
  const dataManager = new DataManager(GitTokenCookie.getGitTokenCookie() as string);
}

function logOut() {
  console.log("Logged out");
  GitTokenCookie.removeGitCookie();
  GitRefreshCookie.removeRefreshCookie();
  router.push("/Authentication");
}
</script>

<template>
  <p>Main</p>
  <button @click=logOut()>Log out</button>
  {{ test() }}
</template>