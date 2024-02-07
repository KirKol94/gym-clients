package ru.castroy10.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.castroy10.backend.security.jwt.JwtUtil;

@SpringBootTest
class JwtUtilTest {

    private final JwtUtil jwtUtil;

    @Autowired
    JwtUtilTest(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Test
    void JwtUtil() {
        String token = jwtUtil.generateToken("user32");
        Assertions.assertEquals("user32", jwtUtil.verifyToken(token));
    }

}
