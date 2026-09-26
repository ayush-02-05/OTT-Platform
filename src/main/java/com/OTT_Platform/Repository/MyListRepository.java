package com.OTT_Platform.Repository;

import com.OTT_Platform.Model.ContentType;
import com.OTT_Platform.Model.MyList;
import com.OTT_Platform.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyListRepository extends JpaRepository<MyList, Integer> {
    List<MyList> findByUser(User user);

    boolean existsByUserAndContentTypeAndContentId(User user, ContentType contentType, int contentId);
}
