package at.sde23.asd.room1.usermanagerbackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message) {
      super(message);
    }
}
