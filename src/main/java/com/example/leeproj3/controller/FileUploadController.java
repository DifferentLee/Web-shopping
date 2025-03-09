package com.example.leeproj3.controller;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class FileUploadController {

    // 上传文件存储路径（可在 application.yml 中配置）
    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        // 文件大小限制：<=10MB
        if (file.getSize() > 10 * 1024 * 1024) {
            return "文件过大，限制10MB以内";
        }

        // 仅允许 jpg, gif, png
        String originalFilename = file.getOriginalFilename();
        String extension = StringUtils.getFilenameExtension(originalFilename);
        if (extension == null ||
                !(extension.equalsIgnoreCase("jpg") || extension.equalsIgnoreCase("jpeg") ||
                        extension.equalsIgnoreCase("png") || extension.equalsIgnoreCase("gif"))) {
            return "仅支持 jpg、gif、png 格式";
        }

        // 生成唯一文件名
        String uniqueName = UUID.randomUUID().toString() + "." + extension;
        File destFile = new File(uploadPath, uniqueName);
        file.transferTo(destFile);

        // 生成缩略图（例如宽度为200px，高度按比例缩放）
        String thumbName = "thumb_" + uniqueName;
        File thumbFile = new File(uploadPath, thumbName);
        Thumbnails.of(destFile).size(200, 200).toFile(thumbFile);

        // 返回图片的 URL（假设静态资源映射到 /images/ 目录）
        return "/images/" + uniqueName;
    }
}


