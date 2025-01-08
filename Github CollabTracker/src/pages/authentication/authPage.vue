<script setup>
import { ref } from 'vue';
import { AuthPage } from './authPage';
import router from '../../router/router';

const isLoginPressed = ref(false); 
const rememberData = ref(false); 
const errorText = ref('');
const code = ref('');
let pollingInterval; // Declare outside to make it accessible

async function startAuth() {
  await AuthPage.startAuth();
  code.value = AuthPage.getCode();
  errorText.value = AuthPage.getErrorText();
}

async function openBrowser() {
  const authWindow = await AuthPage.openBrowser(); // Open the browser window
  const pollInterval = 500; // Check every 500ms

  pollingInterval = setInterval(async () => {
    if (authWindow.closed) {
      clearInterval(pollingInterval); // Stop polling
      await finishAuth();
    }
  }, pollInterval);
}

async function finishAuth() {  
  const res = await AuthPage.finishAuth(rememberData.value); // Pass the value
  if (res) {
    router.push("/Home");
  }
}

async function handleLoginClick() {
  errorText.value = '';
  isLoginPressed.value = true; // Show the Finish button and the code section
  await startAuth();
  await openBrowser();
}
</script>

<template>
  <div class="center-container">
    <div class="container-md">
      <h2>Welcome to the Github CollabTracker.</h2>
    </div>
    <div class="container-md">
      <button @click="handleLoginClick">Log in</button>
      <div class="remember-me">
        <input type="checkbox" id="rememberMe" v-model="rememberData" />
        <label for="rememberMe">Remember Me</label>
      </div>
      <p>{{ errorText }}</p>
      <div v-if="isLoginPressed && !errorText.value">
        <h3>Your code</h3>
        <p class="text-md-center">{{ code }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}
</style>
