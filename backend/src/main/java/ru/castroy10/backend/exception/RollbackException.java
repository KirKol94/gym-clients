package ru.castroy10.backend.exception;

public class RollbackException extends Exception {
    public RollbackException(String message) {
        super(message);
    }
}
