<script setup lang="ts">
import { invoke } from '@tauri-apps/api/core';
import { ref } from 'vue';
import { open } from '@tauri-apps/plugin-shell';

let code = ref("");

interface TEMP {
  device_code: string,
  user_code: string,
  verification_uri: string,
  expires_in: number,
  interval: number
}

async function logIn() {
  const url = "https://github.com/login/device/code";
  const clientId = 'Iv23liDO3ngcMFSVuXF7';
  const map = {
    client_id: clientId
  }
  try {
    const res: TEMP = JSON.parse(await invoke('fetch_github_code', { url: url, queryParams: map })) as TEMP;
    console.log(res);
    code = ref(res.user_code);
    open(res.verification_uri);
  } catch(e) {
    console.error("error! ", e);
  }
}

</script>

<template>
  <main class="container">
    <button @click="logIn">Log in</button>
    <button @click="{{ console.log(code); }}">test</button>

    <h3>Your code</h3>
    <p>{{ code }}</p>
  </main>
</template>
