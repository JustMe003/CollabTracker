<script setup lang="ts">
import { GitTokenCookie } from '../../authorization/cookies/GitTokenCookie';
import { RequestGithub } from '../../requestGithub';
import { GitRefreshCookie } from '../../authorization/cookies/GitRefreshCookie';
import router from '../../router/router';

// const res = ref("");

async function test() {
  console.log(GitTokenCookie.getGitTokenCookie());
  console.log(await RequestGithub.sendGetRequest(
    "https://api.github.com/user",
    new Map<string, string>(),
    GitTokenCookie.getGitTokenCookie() as string));
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