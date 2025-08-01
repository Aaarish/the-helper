package com.roya.the_helper.auth;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@ConfigurationProperties(prefix = "rsa")
public record RSAKeyConfigProperties (RSAPublicKey publicKey, RSAPrivateKey privateKey) {
}
