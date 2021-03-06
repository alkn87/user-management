package at.sde23.asd.room1.usermanagerbackend.repository;


import at.sde23.asd.room1.usermanagerbackend.entity.Ping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository()
public interface PingRepository extends JpaRepository<Ping, Long> {

    @Override
    List<Ping> findAll();

}
