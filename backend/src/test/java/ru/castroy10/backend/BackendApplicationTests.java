package ru.castroy10.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import ru.castroy10.backend.model.Appuser;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
		Appuser appuser = new Appuser();
		appuser.setId(1L);
		appuser.setFirstName("Тест");
		appuser.setMiddleName("Тестович");
		appuser.setLastName("Тестовый");
		System.out.println(appuser);
	}

}
