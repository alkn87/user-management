package at.sde23.asd.room1.usermanagerbackend.service;

import at.sde23.asd.room1.usermanagerbackend.entity.User;
import at.sde23.asd.room1.usermanagerbackend.exception.UserNotFoundException;
import at.sde23.asd.room1.usermanagerbackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> findAllUsers(){
        return userRepo.findAll();
    }


    public User addUser(User user){
        return userRepo.save(user);
    }


    public User updateUser(User user){
        return userRepo.save(user);
    }

    public void deleteUser(Long id){
        userRepo.deleteUserById(id);
    }

    public User findUserByUsername(String username){
        return userRepo.findUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User by Username"+ username +" was not found"));
    }

}
