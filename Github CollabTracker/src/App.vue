<script setup lang="ts">
import { ref } from 'vue';
import { Authentication } from './authorization/authentication';
import { GitTokenCookie } from './authorization/cookies/GitTokenCookie';
import { GitRefreshCookie } from './authorization/cookies/GitRefreshCookie';


let code = ref("");

async function cookieChecker() {
  const gitCookie = GitTokenCookie.getGitTokenCookie();
  const refreshCookie = GitRefreshCookie.getRefreshCookie();
  if(gitCookie) {
    // go to main page
  } else if(refreshCookie) {
    // refresh token
  } else {
    const verificationData = await Authentication.startAuthentication();
    // show login page
  }
}

cookieChecker();

</script>

<template>
  <main class="container">
    <button @click="">Log in</button>

    <h3>Your code</h3>
    <p>{{ code }}</p>
  </main>
</template>
