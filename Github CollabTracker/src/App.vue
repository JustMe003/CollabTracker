<script setup lang="ts">
import Cookies from 'universal-cookie';
import { ref } from 'vue';
import { open } from '@tauri-apps/plugin-shell';
import { RequestGithub } from './requestGithub';
import { VerificationInterface } from './authorization/verificationInterface';

let code = ref("");
let intervalId: number;
const clientId = 'Iv23liDO3ngcMFSVuXF7';
const cookies = new Cookies();
const date = new Date();

let deviceCode: string;
const grantType = "urn:ietf:params:oauth:grant-type:device_code";
let userToken: string;

interface TEMP2 {
  error: string | null,
  error_description: string | null,
  error_uri: string | null,
  access_token: string | null,
  expires_in: number | null,
  refresh_token: string | null,
  refresh_token_expires_in: string | null,
  scope: string | null,
  token_type: string | null
}

async function poll_github() {
  console.log("polling...");
  const url = "https://github.com/login/oauth/access_token";
  const map = new Map<string, string>([
    ["client_id", clientId],
    ["device_code", deviceCode],
    ["grant_type", grantType]
]);
  const res: TEMP2 = await RequestGithub.sendPostRequest<TEMP2>(url, map);
  console.log(res);
  if(res.error && res.error != "authorization_pending") {
    clearInterval(intervalId);
  } else {
    if(res.access_token) {
      clearInterval(intervalId);
      userToken = res.access_token;
      console.log(userToken);
      date.setMinutes(date.getMinutes() + 1);
      cookies.set("GitToken", btoa(userToken), {expires: date});
    }
  }
}

async function logIn() {
  if(cookies.get("GitToken")){
    console.log("Cookie Found\n");
  } else {
    const url = "https://github.com/login/device/code";
    
    const map = new Map<string, string>([
      ["client_id", clientId]
    ])
    try {
      const res: VerificationInterface = await RequestGithub.sendPostRequest<VerificationInterface>(url, map);
      console.log(res);
      code.value = res.user_code;
      deviceCode = res.device_code;
      open(res.verification_uri);
      intervalId = setInterval(poll_github, 5500);
    } catch(e) {
      console.error("error! ", e);
    }
  }
}

</script>

<template>
  <main class="container">
    <button @click="logIn">Log in</button>

    <h3>Your code</h3>
    <p>{{ code }}</p>
  </main>
</template>
