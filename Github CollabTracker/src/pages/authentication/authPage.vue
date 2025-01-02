<script setup>
import { ref } from 'vue';
import { AuthPage } from './authPage';
import router from '../../router/router';


const isLoginPressed = ref(false); 
const rememberData = ref(false); // Correct variable name used
const errorText = ref('');
const code = ref('');

async function startAuth() {
  await AuthPage.startAuth();
  code.value = AuthPage.getCode();
  errorText.value = AuthPage.getErrorText();
}

async function openBrowser() {
  isLoginPressed.value = true; // Show the Finish button and the code section
  await AuthPage.openBrowser();
}

async function finishAuth() {  
  const res = await AuthPage.finishAuth(rememberData.value); // Pass the value
  if (res) {
    router.push("/Home");
  }

}

startAuth();
</script>

<template>
  <div class="center-container">
    <div class="container-md">
      <h2>Welcome to the Github CollabTracker.</h2>
    </div>
    <div class="container-md">
      <button @click="openBrowser">Log in</button>
      <div class="remember-me">
        <!-- Correct v-model binding -->
        <input type="checkbox" id="rememberMe" v-model="rememberData" />
        <label for="rememberMe">Remember Me</label>
      </div>
      <button v-if="isLoginPressed" @click="finishAuth">Finish</button>
      <p>{{ errorText }}</p>
      <div v-if="isLoginPressed">
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
