package com.OTT_Platform.Repository;

import com.OTT_Platform.Model.Series;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SeriesRepository extends JpaRepository<Series, Integer> {

    List<Series> findTop5ByOrderBySeriesIdDesc();

    List<Series> findByRatingGreaterThan(float Rating);

    List<Series> findByTitleContainingIgnoreCase(String title);
}