package at.sde23.asd.room1.usermanagerbackend.controller;

import at.sde23.asd.room1.usermanagerbackend.entity.User;
import at.sde23.asd.room1.usermanagerbackend.entity.UserLogin;
import at.sde23.asd.room1.usermanagerbackend.exception.PasswordAuthFailedException;
import at.sde23.asd.room1.usermanagerbackend.exception.UserNotFoundException;
import at.sde23.asd.room1.usermanagerbackend.service.JWTService;
import at.sde23.asd.room1.usermanagerbackend.service.LoginRetryService;
import at.sde23.asd.room1.usermanagerbackend.service.UserService;
import at.sde23.asd.room1.usermanagerbackend.exception.UsernameAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    final UserService userService;
    final JWTService jwtService;
    final LoginRetryService loginRetryService;

    public UserController(
            UserService userService,
            JWTService jwtService,
            LoginRetryService loginRetryService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.loginRetryService = loginRetryService;
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) {
        try {
            userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLogin userLogin, HttpServletRequest request) {
        try {
            if (!loginRetryService.canStillTry(userLogin.getUsername(), request.getRemoteAddr())) {
                return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).build();
            }
            Long id = userService.getUserIdIfPasswordMatches(userLogin);
            loginRetryService.clearAttempts(userLogin.getUsername(), request.getRemoteAddr());
            return ResponseEntity.ok(jwtService.buildJWT(id));
        } catch (UserNotFoundException | PasswordAuthFailedException e) {
            loginRetryService.failedAttempt(userLogin.getUsername(), request.getRemoteAddr());
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

    @PatchMapping("/changePassword")
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

    @DeleteMapping("/delete")
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
