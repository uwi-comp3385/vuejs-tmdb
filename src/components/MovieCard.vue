<script setup lang="ts">
import { defineProps } from "vue";
import type { Movie } from "../types/movie";
// import { format } from 'date-fns';

defineProps<{
    movie: Movie;
}>();

// function formatDate(date: string) {
//     return format(date, 'LLL dd, yyyy');
// }
</script>

<template>
    <div class="card">
        <img class="card-img-top" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
        <div class="card-body">
            <h4 class="card-title fs-6">
                <RouterLink class="text-decoration-none" :to="'/movies/' + movie.id">
                    {{ movie.title }}
                </RouterLink>
            </h4>
            <p class="card-text">{{ movie.release_date }}</p>
        </div>
    </div>
</template>