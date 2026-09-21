package com.OTT_Platform.Repository;

import com.OTT_Platform.Model.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Integer> {

    public List<Episode> findBySeason_Series_SeriesId(int Id);

}