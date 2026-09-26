package com.OTT_Platform.DTO;

import com.OTT_Platform.Model.Movie;

import java.util.List;

public class SearchResponseDTO {

    private List<Movie> movies;
    private List<SeriesDTO> series;

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public List<SeriesDTO> getSeries() {
        return series;
    }

    public void setSeries(List<SeriesDTO> series) {
        this.series = series;
    }
}