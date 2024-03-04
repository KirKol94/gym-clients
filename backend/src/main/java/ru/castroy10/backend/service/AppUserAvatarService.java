package ru.castroy10.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.castroy10.backend.dto.appuser.AppUserDto;
import ru.castroy10.backend.model.Appuser;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Base64;
import java.util.UUID;

@Service
public class AppUserAvatarService {

    @Value("${pathForAvatars}")
    private String pathForAvatars;

    public void saveAvatar(Appuser appuser, AppUserDto appUserDto) throws IOException {
        if (avatarExist(appUserDto)) appuser.setAvatar(saveAvatarFile(appUserDto));
    }

    private boolean avatarExist(AppUserDto appUserDto) {
        return appUserDto.getAvatarFileName() != null
                && appUserDto.getAvatarFileData() != null
                && !appUserDto.getAvatarFileName().isBlank()
                && !appUserDto.getAvatarFileData().isBlank();
    }

    private String saveAvatarFile(AppUserDto appUserDto) throws IOException {
        String filename = UUID.randomUUID() + "." + appUserDto.getAvatarFileName().substring(appUserDto.getAvatarFileName().lastIndexOf(".") + 1);
        String base64Data = appUserDto.getAvatarFileData();
        byte[] binaryBytes = Base64.getDecoder().decode(base64Data);
        Path avatarFile = Path.of(pathForAvatars + filename);
        if (!Files.exists(avatarFile)) Files.createFile(avatarFile);
        Files.write(avatarFile, binaryBytes, StandardOpenOption.WRITE);
        return "http://backend:8080/api/v1/user/getavatar/" + filename;
    }
}
