package at.sde23.asd.room1.usermanagerbackend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Key;

@Service
public class JWTService {

    private final  Key signingKey;

    public JWTService() {
         signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String buildJWT(Long userID) {
        return Jwts.builder().setId(userID.toString()).signWith(signingKey).compact();
    }
}
