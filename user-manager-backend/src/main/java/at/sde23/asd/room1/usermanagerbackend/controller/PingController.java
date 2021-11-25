package at.sde23.asd.room1.usermanagerbackend.controller;


import at.sde23.asd.room1.usermanagerbackend.entity.Ping;
import at.sde23.asd.room1.usermanagerbackend.repository.PingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/ping")
public class PingController {

    private final PingRepository pingRepository;

    @Autowired
    public PingController(PingRepository pingRepository) {
        this.pingRepository = pingRepository;
    }


    @GetMapping("/hello")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Hello, this is a response!");
    }

    @GetMapping("/new")
    public ResponseEntity<Ping> addNew() {
        int value = new Random().nextInt(1, 4);
        Ping newPing = pingRepository.save(new Ping("This is random: " + value));
        return ResponseEntity.ok(newPing);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Ping>> getAll() {
        return ResponseEntity.ok(pingRepository.findAll());
    }
}
