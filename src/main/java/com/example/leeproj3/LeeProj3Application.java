package com.example.leeproj3;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@Slf4j//输出日志
@SpringBootApplication
public class LeeProj3Application {

    public static void main(String[] args) {
        SpringApplication.run(LeeProj3Application.class, args);
//        log.info("项目启动成功......");//输出info级别的日志，这个log是由Slf4j带来的
    }

}
