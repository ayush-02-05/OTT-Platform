package com.OTT_Platform.Repository;

import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Model.Series;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findTop5ByOrderByMovieIdDesc();

    List<Movie> findByRatingGreaterThan(float Rating);

    List<Movie> findByTitleContainingIgnoreCase(String title);
}
