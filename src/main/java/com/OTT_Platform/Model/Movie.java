package com.OTT_Platform.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "MOVIE")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private int movieId;

    @Column(name = "title")
    @NotBlank
    private String title;

    @Column(name = "poster_url")
    @NotBlank
    private String posterURL;

    @Column(name = "rating")
    @DecimalMin("0.1")
    @Max(10)
    private float rating;

    @Column(name = "release_year")
    @Min(1900)
    @Max(2030)
    private int releaseYear;

    @Column(name = "genre")
    @NotBlank
    private String genre;

    @Column(name = "synopsis", columnDefinition = "TEXT")
    @NotBlank
    private String synopsis;

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosterURL() {
        return posterURL;
    }

    public void setPosterURL(String posterURL) {
        this.posterURL = posterURL;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    @Override
    public String toString() {
        return "Movies{" +
                "movieId=" + movieId +
                ", title='" + title + '\'' +
                ", posterURL='" + posterURL + '\'' +
                ", rating=" + rating +
                ", releaseYear=" + releaseYear +
                ", genre='" + genre + '\'' +
                ", synopsis='" + synopsis + '\'' +
                '}';
    }
}
