<script setup lang="ts">
import { ref } from 'vue'; // Import ref for reactivity
import { Application } from './mainPage';

// Create an instance of the Application class
const application = new Application();

// Call the `startMain` method to initialize
await application.startMain();

// Reactive table rows
const tableHeaders = ["ID", "Name", "All collabs"];
const tableRows = ref(await application.getRepos()); // Use ref for reactivity

// Refresh function to update table data
async function refresh() {
  application.refresh();
  tableRows.value = await application.getRepos(); // Update the reactive variable
}
</script>

<template>
  <div>
    <p>Main</p>
    <!-- Buttons for your Application methods -->
    <button @click="application.logOut()">Log out</button>
    <button @click="refresh()">Refresh</button>
    <button @click="application.getTotalCollaborations()">Get all of your collaborations</button>
    <button @click="application.getMaxCollaborators()">Repo most collaborations</button>

    <!-- Dynamic Table -->
    <table border="1">
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableRows" :key="index">
          <td>{{ row.repoID }}</td>
          <td>{{ row.name }}</td>
          <td>
            <button @click="application.listCollaboratiosnPerRepo(row.repoID)">
              Repo all collaborations
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Styling the table for better presentation */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
