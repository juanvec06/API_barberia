package co.edu.unicauca.distribuidos.core.fachadaServices.mapper;

import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ByteArrayToStringConverter implements Converter<byte[], String> {
    private final String URLImages = "./uploads/images/";
    private final String URLserver = "http://localhost:5000/images/";
    @Override
    public String convert(MappingContext<byte[], String> mappingContext) {
        byte[] imageBytes = mappingContext.getSource();
        if(imageBytes == null){
            return null;
        }
        try{
            File uploadDir = new File(URLImages);
            // Si no existe la carpeta de destino, la crea
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String fileName = "image_" + System.currentTimeMillis() + ".png";
            Path path = Paths.get(URLImages, fileName);
            Files.write(path, imageBytes);
            return URLserver + fileName;

        }catch(Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
