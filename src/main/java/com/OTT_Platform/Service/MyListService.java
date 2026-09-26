package com.OTT_Platform.Service;

import com.OTT_Platform.Model.MyList;
import com.OTT_Platform.Model.User;
import com.OTT_Platform.Repository.MyListRepository;
import com.OTT_Platform.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyListService {

    private final MyListRepository myListRepository;
    private final UserRepository userRepository;

    public MyListService(MyListRepository myListRepository, UserRepository userRepository) {
        this.myListRepository = myListRepository;
        this.userRepository = userRepository;
    }

    public MyList addToMyList(MyList myList, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        boolean alreadyExists = myListRepository.existsByUserAndContentTypeAndContentId(user, myList.getContentType(), myList.getContentId());

        if (alreadyExists) {
            throw new RuntimeException("Already in My List");
        }
        myList.setUser(user);
        return myListRepository.save(myList);
    }

    public List<MyList> getMyList(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return myListRepository.findByUser(user);
    }

    public void removeFromMyList(int myListId, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        MyList myList = myListRepository.findById(myListId).orElseThrow();

        if (myList.getUser().getUserId() != user.getUserId()) {
            throw new RuntimeException("Unauthorized");
        }
        myListRepository.delete(myList);
    }
}
