package at.sde23.asd.room1.usermanagerbackend.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column()
    private String password;

    @Column()
    private String firstname;

    @Column()
    private String lastname;

    public User(String username, String password, String firstname, String lastname){
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

