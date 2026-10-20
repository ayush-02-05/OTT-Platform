package com.OTT_Platform.Service;

import com.OTT_Platform.DTO.MyListRequestDTO;
import com.OTT_Platform.DTO.MyListResponseDTO;
import com.OTT_Platform.Model.MyList;
import com.OTT_Platform.Model.User;
import com.OTT_Platform.Repository.MyListRepository;
import com.OTT_Platform.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MyListService {

    private final MyListRepository myListRepository;
    private final UserRepository userRepository;

    public MyListService(MyListRepository myListRepository, UserRepository userRepository) {
        this.myListRepository = myListRepository;
        this.userRepository = userRepository;
    }

    public MyListResponseDTO addToMyList(MyListRequestDTO request, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        if (myListRepository.existsByUserAndContentTypeAndContentId(
                user, request.getContentType(), request.getContentId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already in My List");
        }

        MyList myList = new MyList();   // hamesha naya object, to id client se aa hi nahi sakti
        myList.setUser(user);
        myList.setContentType(request.getContentType());
        myList.setContentId(request.getContentId());

        return toDTO(myListRepository.save(myList));
    }

    public List<MyListResponseDTO> getMyList(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return myListRepository.findByUser(user).stream().map(this::toDTO).toList();
    }

    public void removeFromMyList(int myListId, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        MyList myList = myListRepository.findById(myListId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found"));

        if (myList.getUser().getUserId() != user.getUserId()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }
        myListRepository.delete(myList);
    }

    private MyListResponseDTO toDTO(MyList myList) {
        return new MyListResponseDTO(myList.getId(), myList.getContentType(), myList.getContentId());
    }
}