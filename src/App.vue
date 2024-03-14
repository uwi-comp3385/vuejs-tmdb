<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import './scss/styles.scss';

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-success">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand text-white">Movie Vue</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link active text-white" aria-current="page">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link text-white">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/movies" class="nav-link text-white">Movies</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="mt-5">
    <div class="container">
      <RouterView />
    </div>
  </main>

  <footer class="mt-5 bg-light p-3">
    <p class="text-center">© 2024 Movie Vue. All rights reserved.</p>
  </footer>
</template>

<style scoped>

</style>
