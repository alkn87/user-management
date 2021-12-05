package at.sde23.asd.room1.usermanagerbackend.controller;

import at.sde23.asd.room1.usermanagerbackend.entity.User;
import at.sde23.asd.room1.usermanagerbackend.entity.UserLogin;
import at.sde23.asd.room1.usermanagerbackend.exception.PasswordAuthFailedException;
import at.sde23.asd.room1.usermanagerbackend.exception.UserNotFoundException;
import at.sde23.asd.room1.usermanagerbackend.service.JWTService;
import at.sde23.asd.room1.usermanagerbackend.service.UserService;
import at.sde23.asd.room1.usermanagerbackend.exception.UsernameAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    final UserService userService;
    final JWTService jwtService;

    public UserController(
            UserService userService,
            JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userService.register(user), HttpStatus.CREATED);
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLogin userLogin) {
        try {
            return ResponseEntity.ok(jwtService.buildJWT(userService.getUserIdIfPasswordMatches(userLogin)));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (PasswordAuthFailedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/whoami")
    public ResponseEntity<Long> whoAmI(@RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity.ok(jwtService.parseJWT(authHeader));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<User> changePassword(@RequestBody String newPassword, @RequestHeader("Authorization") String authHeader) {
        try {
            Long id = jwtService.parseJWT(authHeader);
            userService.changePassword(id, newPassword);
        } catch (UserNotFoundException e) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/delete")
    public ResponseEntity<User> delete(@RequestHeader("Authorization") String authHeader) {
        try {
            Long id = jwtService.parseJWT(authHeader);
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
