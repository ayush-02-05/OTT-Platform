package com.OTT_Platform.Controller.User;

import com.OTT_Platform.DTO.SearchResponseDTO;
import com.OTT_Platform.DTO.SeriesDTO;
import com.OTT_Platform.Model.Movie;
import com.OTT_Platform.Service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public SearchResponseDTO search(@RequestParam String query) {

        List<Movie> movies = searchService.searchMovies(query);
        List<SeriesDTO> series = searchService.searchSeries(query);

        SearchResponseDTO response = new SearchResponseDTO();

        response.setMovies(movies);
        response.setSeries(series);

        return response;
    }
}