package com.roya.the_helper;

import com.roya.the_helper.auth.RSAKeyConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RSAKeyConfigProperties.class)
public class TheHelperApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheHelperApplication.class, args);
	}

}
