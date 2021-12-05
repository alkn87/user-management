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

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

//    @GetMapping("/find/{username}")
//    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
//        User user = userService.findUserByUsername(username);
//        return ResponseEntity.ok(user);
//    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User newUser = null;
        try {
            newUser = userService.register(user);
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLogin userLogin) {
        Long userID;
        try {
            userID = userService.getUserIdIfPasswordMatches(userLogin);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (PasswordAuthFailedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(jwtService.buildJWT(userID));
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updateduser = userService.updateUser(user);
        return new ResponseEntity<>(updateduser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
