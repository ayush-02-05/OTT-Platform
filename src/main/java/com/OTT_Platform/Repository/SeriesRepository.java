package com.OTT_Platform.Repository;

import com.OTT_Platform.Model.Series;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeriesRepository extends JpaRepository<Series, Integer> {

    List<Series> findTop5ByOrderBySeriesIdDesc();

    List<Series> findByRatingGreaterThan(float Rating);
}