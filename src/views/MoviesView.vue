<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
let loading = ref(false);
let movies = ref<Movie[]>([]);
const searchTerm = ref('');;

const getMovies = async () => {
    loading.value = true;

    const url = `${appStore.tmdbApiUrl}/movie/now_playing?language=en-US&page=1`;
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
        movies.value = data.results;
    }).finally(() => {
        loading.value = false
    });
};

const searchMovies = () => {
    loading.value = true;

    const url = `${appStore.tmdbApiUrl}/search/movie?query=${searchTerm.value}&language=en-US&page=1`;
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
    <div class="mb-3">
        <input type="text" class="form-control" v-model="searchTerm" @keyup.enter="searchMovies" placeholder="Enter Search Term">
    </div>
    <div>
        <div v-if="loading" class="spinner-border text-primary d-block text-center mb-5" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>

        <div class="movie-grid">
            <!-- <div v-for="movie in movies" :key="movie.id">
                <img class="img-thumbnail" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
                <h4 class="mt-2 fs-6"><RouterLink :to="'/movies/' + movie.id">{{ movie.title }}</RouterLink></h4>
                <p>{{ movie.release_date }}</p>
            </div> -->
            <MovieCard :movie="movie" v-for="movie in movies" :key="movie.id" />
        </div>
    </div>
</template>