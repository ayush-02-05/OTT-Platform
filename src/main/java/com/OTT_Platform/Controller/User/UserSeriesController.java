package com.OTT_Platform.Controller.User;

import com.OTT_Platform.DTO.SeriesDTO;
import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Service.SeriesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserSeriesController {
    private final SeriesService seriesService;
    UserSeriesController(SeriesService seriesService){
        this.seriesService = seriesService;
    }

    @GetMapping("/api/series")
    public List<SeriesDTO> series(){
        return seriesService.getAllSeriesDTO();
    }

    @GetMapping("/api/series/{seriesId}")
    public SeriesDTO movieDetails(@PathVariable int seriesId) {
        return seriesService.seriesDetails(seriesId);
    }

    @GetMapping("/api/series/${seriesId}/seasons")

}
