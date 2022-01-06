package at.sde23.asd.room1.usermanagerbackend.service;

import at.sde23.asd.room1.usermanagerbackend.entity.User;
import at.sde23.asd.room1.usermanagerbackend.entity.UserLogin;
import at.sde23.asd.room1.usermanagerbackend.exception.PasswordAuthFailedException;
import at.sde23.asd.room1.usermanagerbackend.exception.UserNotFoundException;
import at.sde23.asd.room1.usermanagerbackend.exception.UsernameAlreadyExistsException;
import at.sde23.asd.room1.usermanagerbackend.repository.UserRepo;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @SneakyThrows
    public User register(User user) throws UsernameAlreadyExistsException {

        if(userRepo.findUserByUsername(user.getUsername()).isPresent()){
            throw new UsernameAlreadyExistsException();
        }
        user.setPassword(digest(user.getPassword()));
        return userRepo.save(user);
    }

    public Long getUserIdIfPasswordMatches(UserLogin userLogin) throws UserNotFoundException, PasswordAuthFailedException {
        User user = userRepo.findUserByUsername(userLogin.getUsername()).orElseThrow(UserNotFoundException::new);
        if(!digest(userLogin.getPassword()).equals(user.getPassword())){
            throw new PasswordAuthFailedException();
        }
        return user.getId();
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    public void changePassword(Long id, String newPassword) throws UserNotFoundException{
        User user = userRepo.findUserById(id).orElseThrow(UserNotFoundException::new);
        user.setPassword(digest(newPassword));
        userRepo.save(user);
    }

    @SneakyThrows
    private String digest(String preDigest){
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        return new String(md.digest(preDigest.getBytes(StandardCharsets.UTF_8)), StandardCharsets.UTF_8);
    }

}
