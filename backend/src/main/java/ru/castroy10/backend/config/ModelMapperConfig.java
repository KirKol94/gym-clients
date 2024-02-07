package ru.castroy10.backend.config;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Conditions;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.castroy10.backend.dto.appuser.AppUserUpdateDto;
import ru.castroy10.backend.model.Appuser;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addConverter(stringToLocalDate);
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(AppUserUpdateDto.class, Appuser.class)
                .addMappings(mapper -> mapper.skip(Appuser::setRoles))
                .addMappings(mapper -> mapper.skip(Appuser::setUsername));
        return modelMapper;
    }

    private static final AbstractConverter<String, LocalDate> stringToLocalDate = new AbstractConverter<>() {
        @Override
        protected LocalDate convert(String source) {
            return LocalDate.parse(source, DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        }
    };


}
