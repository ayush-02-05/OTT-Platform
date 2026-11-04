package com.OTT_Platform.Exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message){
        super(message);
    }
}
