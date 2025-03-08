package com.example.leeproj3.controller;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class FileUploadController {
    private static final String UPLOAD_DIR = "uploads/fullsize/";
    private static final String THUMBNAIL_DIR = "uploads/thumbnails/";

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        // 生成唯一文件名
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // 保存原图
        File fullsizeFile = new File(UPLOAD_DIR + fileName);
        file.transferTo(fullsizeFile);

        // 生成缩略图
        File thumbnailFile = new File(THUMBNAIL_DIR + fileName);
        Thumbnails.of(fullsizeFile).size(200, 200).toFile(thumbnailFile);

        // 返回图片 URL
        return ResponseEntity.ok("/uploads/fullsize/" + fileName);
    }
}


