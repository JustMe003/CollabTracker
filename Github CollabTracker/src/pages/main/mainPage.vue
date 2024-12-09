<script setup lang="ts">
import { ref } from 'vue';
import { GitTokenCookie } from '../../authorization/cookies/GitTokenCookie';
import { RequestGithub } from '../../requestGithub';

// const res = ref("");

async function test() {
  console.log(GitTokenCookie.getGitTokenCookie());
  console.log(await RequestGithub.sendGetRequest(
      "https://api.github.com/user",
      new Map<string, string>(),
      GitTokenCookie.getGitTokenCookie() as string));
}
</script>

<template>
  <p>Main</p>
  {{ test() }}
</template>