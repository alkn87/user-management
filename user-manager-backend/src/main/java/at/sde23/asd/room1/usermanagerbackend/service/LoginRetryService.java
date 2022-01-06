package at.sde23.asd.room1.usermanagerbackend.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginRetryService {
    private final ConcurrentHashMap<String, Integer> loginTries;

    private static final int NUMBER_OF_FAILED_ATTEMPTS_ALLOWED = 3;
    private static final int BLOCKED_IN_MINUTES = 1;
    private static final int MAX_TRIES = 3;
    private static final int FACTOR_MILLS_TO_MIN = 60000;

    public LoginRetryService() {
        this.loginTries = new ConcurrentHashMap<>();
    }

    public boolean canStillTry(String username, String remoteAddr) {
        int tries = loginTries.getOrDefault(username + remoteAddr, 0);
        return tries < NUMBER_OF_FAILED_ATTEMPTS_ALLOWED;
    }

    public void clearAttempts(String username, String remoteAddr) {
        loginTries.remove(username+remoteAddr);
    }

    public void failedAttempt(String username, String remoteAddr) {
        if (!canStillTry(username, remoteAddr)) {
            return;
        }
        int tries = this.loginTries.compute(username + remoteAddr, (key, currentTries) -> {
            if (currentTries == null) {
                return 1;
            }
            return currentTries + 1;
        });


        if (tries == MAX_TRIES) {
            new Thread(() -> {
                try {
                    Thread.sleep(FACTOR_MILLS_TO_MIN * Long.valueOf(BLOCKED_IN_MINUTES));
                    loginTries.put(username + remoteAddr, 0);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
