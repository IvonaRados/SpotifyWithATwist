import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', 'f541243e08msh894d0552d77fe04p1afc8ejsna1b45b3817d2');
                
                return headers;
            },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({ query: () => '/charts/world'}),
            getSongsByGenre: builder.query({ query: (genre) => 
                `/charts/genre-world?genre_code=${genre}`}),
            getSongDetails: builder.query({ query: ({songid}) => 
            `/tracks/details?track_id=${songid}`}),
            getArtistDetails: builder.query({ query: (artistId) => 
                `/artists/details?artist_id=${artistId}`}),
            getSongRelated: builder.query({ query: (songid) => `/tracks/related?
            tracks_id=${songid}`}),
            getSongsBySearch: builder.query({ query: (searchTerm) => 
                `search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
        }),
        
    });

    export const {
        useGetTopChartsQuery,
        useGetSongsByGenreQuery,
        useGetSongDetailsQuery,
        useGetArtistDetailsQuery,
        useGetSongRelatedQuery,
        useGetSongsBySearchQuery,
    } = shazamCoreApi