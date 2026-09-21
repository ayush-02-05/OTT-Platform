package com.OTT_Platform.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;

import java.util.*;

@Entity
@Table(name="Series")
public class Series {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "series_id")
    private int seriesId;

    @Column(name = "title")
    @NotBlank
    private String title;

    @Column(name = "Genre")
    @NotBlank
    private String Genre;

    @Column(name = "Rating")
    @DecimalMin("0.1")
    @Max(10)
    private float rating;

    @Column(name = "poster_url")
    @NotBlank
    private String posterURL;

    @Column(name = "synopsis", columnDefinition = "TEXT")
    @NotBlank
    private String Synopsis;

    @OneToMany(mappedBy = "series", cascade = CascadeType.ALL)
    private List<Season> seasons = new ArrayList<>();

    public int getSeriesId() {
        return seriesId;
    }

    public void setSeriesId(int seriesId) {
        this.seriesId = seriesId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return Genre;
    }

    public void setGenre(String genre) {
        Genre = genre;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getPosterURL() {
        return posterURL;
    }

    public void setPosterURL(String posterURL) {
        this.posterURL = posterURL;
    }

    public String getSynopsis() {
        return Synopsis;
    }

    public void setSynopsis(String synopsis) {
        Synopsis = synopsis;
    }

    public List<Season> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Season> seasons) {
        this.seasons = seasons;
    }
}
