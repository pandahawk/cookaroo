package dev.pandahawk.cookaroo.core.id;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class NanoIdService {
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final String ALPHABET
            = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int ID_LENGTH = 8;

    public String generateId() {
        return NanoIdUtils.randomNanoId(RANDOM, ALPHABET.toCharArray(), ID_LENGTH);
    }
}
