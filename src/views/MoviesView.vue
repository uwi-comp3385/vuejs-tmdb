<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
let loading = ref(false);
let movies = ref<Movie[]>([]);
const searchTerm = ref('');

const getMovies = async () => {
    loading.value = true;

    const url = `${appStore.tmdbApiUrl}/movie/now_playing?language=en-US&include_adult=false&page=1`;
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
        // console.log(data);
        movies.value = data.results;
    }).finally(() => {
        loading.value = false
    });
};

const searchMovies = () => {
    loading.value = true;

    if (searchTerm.value === '') {
        getMovies();
        return;
    }

    const url = `${appStore.tmdbApiUrl}/search/movie?query=${searchTerm.value}&language=en-US&include_adult=false&page=1`;
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
        // console.log(data);
        movies.value = data.results;
    }).finally(() => {
        loading.value = false
    });
}

onMounted(async () => {
    await getMovies();
})
</script>

<template>
    <h1>Movies</h1>
    <form action="#" @submit.prevent="searchMovies">
        <div class="mb-5 input-group w-50">
            <input type="text" class="form-control" v-model="searchTerm" @keyup.enter="searchMovies" placeholder="Enter Search Term">
            <button class="btn btn-success">Search</button>
        </div>
    </form>
    <div>
        <div v-if="loading" class="spinner-border text-primary d-block text-center mb-5" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>

        <div class="movie-grid">
            <MovieCard :movie="movie" v-for="movie in movies" :key="movie.id" />
        </div>
    </div>
</template>