package ru.castroy10.backend.exception;

public class UserDuplicateException extends Exception {

    public UserDuplicateException(String message) {
        super(message);
    }
}
