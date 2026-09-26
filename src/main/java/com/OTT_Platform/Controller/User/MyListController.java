package com.OTT_Platform.Controller.User;

import com.OTT_Platform.Model.MyList;
import com.OTT_Platform.Service.MyListService;
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
    public ResponseEntity<MyList> addToMyList(@RequestBody MyList myList, Authentication authentication) {
        MyList saved = myListService.addToMyList(myList, authentication.getName());
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<MyList> getMyList(Authentication authentication) {
        return myListService.getMyList(authentication.getName());
    }

    @DeleteMapping("/{myListId}")
    public void removeFromMyList(@PathVariable int myListId, Authentication authentication) {
        myListService.removeFromMyList(myListId, authentication.getName());
    }
}
