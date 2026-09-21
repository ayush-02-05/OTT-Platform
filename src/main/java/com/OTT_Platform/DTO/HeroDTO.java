package com.OTT_Platform.DTO;

public class HeroDTO {
    private int id;
    private String title;
    private String type;
    private String posterURL;
    private float rating;
    private String genre;
    private String synopsis;

    public HeroDTO(int id, String title, String type,
                   String posterURL, float rating,
                   String genre, String synopsis) {

        this.id = id;
        this.title = title;
        this.type = type;
        this.posterURL = posterURL;
        this.rating = rating;
        this.genre = genre;
        this.synopsis = synopsis;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public String getPosterURL() {
        return posterURL;
    }

    public float getRating() {
        return rating;
    }

    public String getGenre() {
        return genre;
    }

    public String getSynopsis() {
        return synopsis;
    }
}
