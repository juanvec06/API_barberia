package co.edu.unicauca.distribuidos.core.fachadaServices.mapper;


import org.modelmapper.ModelMapper;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class StringToByteArrayConverter implements Converter<String, byte[]> {

    @Override
    public byte[] convert(MappingContext<String, byte[]> context) {
        String imagePath = context.getSource();
        if (imagePath == null) {
            return null;
        }
        try{
            Path path = Paths.get(imagePath);
            return Files.readAllBytes(path);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }
}
