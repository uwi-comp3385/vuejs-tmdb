export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    genres: Genre[];
}

interface Genre {
    id: number;
    name: string;
}