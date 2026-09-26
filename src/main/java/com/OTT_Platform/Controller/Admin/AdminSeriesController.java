package com.OTT_Platform.Controller.Admin;

import com.OTT_Platform.Model.Episode;
import com.OTT_Platform.Model.Season;
import com.OTT_Platform.Model.Series;
import com.OTT_Platform.Service.EpisodeService;
import com.OTT_Platform.Service.SeriesService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class AdminSeriesController {
    private final SeriesService seriesService;
    private final EpisodeService episodeService;
    public AdminSeriesController(SeriesService seriesService, EpisodeService episodeService) {
        this.seriesService = seriesService;
        this.episodeService = episodeService;
    }

    @GetMapping("/admin/series")
    public String manageSeries(Model model) {
        List<Series> seriesList = seriesService.getAllSeries();
        model.addAttribute("seriesList", seriesList);
        model.addAttribute("series", new Series());
        return "Admin/manageSeries";
    }

    @GetMapping("/admin/series/{id}")
    public String manageSeries(@PathVariable int id, Model model) {
        Series series = episodeService.getSeriesDetails(id);
        List<Episode> episodes =  episodeService.getEpisodeDetails(id);
        model.addAttribute("series", series);
        model.addAttribute("episodes", episodes);
        return "/Admin/manageEpisodes";
    }

    @PostMapping("/admin/series")
    public String saveSeries(@Valid @ModelAttribute("series") Series series, BindingResult result, @RequestParam int numberOfSeasons, @RequestParam List<Integer> seasonReleaseYears, Model model) {
        if (result.hasErrors()) return "Admin/manageSeries";

        if (numberOfSeasons < 1) {
            model.addAttribute("seriesList", seriesService.getAllSeries());
            model.addAttribute("seasonError", "Number of seasons must be at least 1");
            return "Admin/manageSeries";
        }

        if (series.getSeriesId() == 0) {
            List<Season> seasons = new ArrayList<>();
            for (int i = 0; i < numberOfSeasons; i++) {
                Season season = new Season();
                season.setSeasonNumber(i + 1);
                season.setReleaseYear(seasonReleaseYears.get(i));
                season.setSeries(series);
                seasons.add(season);
            }
            series.setSeasons(seasons);
            seriesService.saveSeries(series);
        } else {
            //Edit
            seriesService.updateSeries(series,numberOfSeasons, seasonReleaseYears);
        }
        return "redirect:/admin/series";
    }

    @DeleteMapping("/admin/series/{id}")
    @ResponseBody
    public String deleteSeries(@PathVariable int id) {
        seriesService.deleteSeries(id);
        return "success";
    }
}
