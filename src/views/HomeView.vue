<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import logo from '@/assets/logo.svg';

const appStore = useAppStore();
</script>

<template>
  <img class="d-block mx-auto mb-4" :src="logo" alt="" width="72" height="57">
  <h1 class="display-5 fw-bold text-body-emphasis text-success text-center">Welcome to VueJS Demo</h1>
  <div class="col-lg-6 mx-auto">
    <p class="lead mb-4">VueJS is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.</p>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <a href="https://vuejs.org" target="_blank" class="btn btn-success btn-lg px-4 gap-3">Learn more</a>
      <button class="btn btn-outline-secondary" @click="appStore.count++">
        Count is: {{ appStore.count }}
      </button>
    </div>
  </div>
</template>
