<script setup>
import { ref } from 'vue';
import { AuthPage } from './authPage';

defineProps(["clicked"]);

await AuthPage.startAuth();

const code = AuthPage.getCode();
const errorText = AuthPage.getErrorText();

async function finishAuth() {
  if(this.clicked) {
    return;
  }

  this.clicked = true;

  const res = await AuthPage.finishAuth();
  if(res) {
    this.$router.push("/Home");
  }

  setTimeout(function() {
    this.clicked = false;
  }.bind(this), AuthPage.getTimeout());
}
</script>


<template>
  <main class="container">
    <button @click="AuthPage.openBrowser()">Log in</button>
    <button @click="finishAuth()" :disabled="clicked">finish</button>

    <p>{{ errorText }}</p>
  
    <h3>Your code</h3>
    <p>{{ code }}</p>
  </main>
</template>


  