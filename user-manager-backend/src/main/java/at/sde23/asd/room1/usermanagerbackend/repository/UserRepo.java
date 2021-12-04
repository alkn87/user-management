package at.sde23.asd.room1.usermanagerbackend.repository;

import at.sde23.asd.room1.usermanagerbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    void deleteUserById(Long id);

    Optional<User> findUserByUsername(String username);
}
