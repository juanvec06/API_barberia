package co.edu.unicauca.distribuidos.core.fachadaServices.mapper;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.ServicioEntity;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import co.edu.unicauca.distribuidos.core.fachadaServices.mapper.StringToByteArrayConverter;

@Configuration
public class mapper {
    @Bean 
    public ModelMapper crearMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Convertidor de string a byte[]
        StringToByteArrayConverter stringToByteArrayConverter= new StringToByteArrayConverter();

        TypeMap<ServicioEntity, ServicioDTORespuesta> entityToResponseMap =
                modelMapper.createTypeMap(ServicioEntity.class, ServicioDTORespuesta.class);

        entityToResponseMap.addMappings(mapper ->
                mapper.using(stringToByteArrayConverter).map(ServicioEntity::getImagen, ServicioDTORespuesta::setImagen)
        );

        // Convertidor de byte[] a string
        ByteArrayToStringConverter byteArrayToStringConverter = new ByteArrayToStringConverter();

        TypeMap<ServicioDTORespuesta, ServicioEntity> responseToEntityMap =
                modelMapper.createTypeMap(ServicioDTORespuesta.class, ServicioEntity.class);

        responseToEntityMap.addMappings(mapper ->
                mapper.using(byteArrayToStringConverter).map(ServicioDTORespuesta::getImagen, ServicioEntity::setImagen)
        );
        return modelMapper;//El objeto retornado se almacena en el contenedor de Spring
    }
}
