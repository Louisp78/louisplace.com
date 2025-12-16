package com.louisplace.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @CrossOrigin
    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
