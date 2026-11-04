package com.OTT_Platform.Exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.OTT_Platform.DTO.ErrorResponse;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice(annotations = RestController.class)
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()));
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResource(DuplicateResourceException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(HttpStatus.CONFLICT.value(), e.getMessage()));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getBindingResult().getAllErrors().get(0).getDefaultMessage()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleUnreadableBody(HttpMessageNotReadableException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Invalid request body"));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Invalid value for " + e.getName()));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrity(DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(HttpStatus.CONFLICT.value(), "Request conflicts with existing data"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Something went wrong"));
    }
}