package com.OTT_Platform.DTO;

import com.OTT_Platform.Model.ContentType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class MyListRequestDTO {

    @NotNull(message = "contentType is required")
    private ContentType contentType;

    @Positive(message = "contentId must be positive")
    private int contentId;

    public ContentType getContentType() { return contentType; }
    public void setContentType(ContentType contentType) { this.contentType = contentType; }
    public int getContentId() { return contentId; }
    public void setContentId(int contentId) { this.contentId = contentId; }
}