package com.OTT_Platform.Controller.User;

import com.OTT_Platform.DTO.MyListRequestDTO;
import com.OTT_Platform.DTO.MyListResponseDTO;
import com.OTT_Platform.Service.MyListService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/my-list")
public class MyListController {

    private final MyListService myListService;

    public MyListController(MyListService myListService) {
        this.myListService = myListService;
    }

    @PostMapping
    public ResponseEntity<MyListResponseDTO> addToMyList(@Valid @RequestBody MyListRequestDTO request,
                                                         Authentication authentication) {
        return ResponseEntity.ok(myListService.addToMyList(request, authentication.getName()));
    }

    @GetMapping
    public List<MyListResponseDTO> getMyList(Authentication authentication) {
        return myListService.getMyList(authentication.getName());
    }

    @DeleteMapping("/{myListId}")
    public void removeFromMyList(@PathVariable int myListId, Authentication authentication) {
        myListService.removeFromMyList(myListId, authentication.getName());
    }
}