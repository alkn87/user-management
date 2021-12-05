package at.sde23.asd.room1.usermanagerbackend.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JWTService {

    private final  Key signingKey;

    public JWTService() {
         signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String buildJWT(Long userID) {
        return Jwts.builder()
                .setSubject(userID.toString())
                .signWith(signingKey)
                .compact();
    }

    public Long parseJWT(String jwt) throws Exception{
        Jws<Claims> parsedJwt = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(jwt);
        return Long.valueOf(parsedJwt.getBody().getSubject());
    }
}
