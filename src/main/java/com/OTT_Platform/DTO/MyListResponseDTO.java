package com.OTT_Platform.DTO;

import com.OTT_Platform.Model.ContentType;

public class MyListResponseDTO {

    private final int id;
    private final ContentType contentType;
    private final int contentId;

    public MyListResponseDTO(int id, ContentType contentType, int contentId) {
        this.id = id;
        this.contentType = contentType;
        this.contentId = contentId;
    }

    public int getId() { return id; }
    public ContentType getContentType() { return contentType; }
    public int getContentId() { return contentId; }
}