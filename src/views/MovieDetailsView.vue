<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Movie } from '../types/movie';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

let loading = ref(false);
let movie = ref<Movie>({
    id: 0,
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    runtime: 0,
    status: '',
    genres: []
});
let movieId = useRoute().params.id;

const getMovie = async () => {
    loading.value = true;
    const url = `${appStore.tmdbApiUrl}/movie/${movieId}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
        }
    };

    fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        movie.value = data;
    }).finally(() => {
        loading.value = false
    });
};

onMounted(async () => {
    await getMovie();
})
</script>

<template>
    <div>
        <div v-if="loading" class="spinner-border text-primary d-block text-center mb-5" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>

        <div class="row mb-5" v-if="!loading">
            <div class="col-md-3">
                <img v-if="movie.poster_path" width="200" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title + ' poster'">
            </div>
            <div class="col-md-9">
                <h2>{{ movie.title }}</h2>
                <div>
                    {{ movie.release_date }}
                    <span class="mx-2">{{ movie.runtime }} min</span>
                    <span class="badge rounded-pill bg-info shadow-sm mx-2" v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</span>
                </div>
                <div>Status: {{ movie.status }}</div>
                <h3>Overview</h3>
                <p>{{ movie.overview }}</p>
            </div>
        </div>

        <div class="my-5 d-flex justify-content-between">
            <RouterLink class="btn btn-primary" to="/movies">Back</RouterLink>
            <button class="btn btn-outline-secondary" @click="appStore.increment">
                Count is: {{ appStore.count }}
            </button>
        </div>
    </div>
</template>