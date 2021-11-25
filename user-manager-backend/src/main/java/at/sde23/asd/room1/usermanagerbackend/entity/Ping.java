package at.sde23.asd.room1.usermanagerbackend.entity;

import lombok.*;

import javax.persistence.*;


@Entity
@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@NoArgsConstructor
public class Ping {

    public Ping(String pingValue) {
        this.pingValue = pingValue;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column
    private String pingValue;
}
