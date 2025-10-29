package co.edu.unicauca.distribuidos.core.fachadaServices.mapper;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.ServicioEntity;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTOPeticion;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class mapper {
    @Bean 
    public ModelMapper crearMapper() {
        ModelMapper modelMapper = new ModelMapper();



        // Convertidor de byte[] a string
        ByteArrayToStringConverter byteArrayToStringConverter = new ByteArrayToStringConverter();

        TypeMap<ServicioDTOPeticion, ServicioEntity> responseToEntityMap =
                modelMapper.createTypeMap(ServicioDTOPeticion.class, ServicioEntity.class);

        responseToEntityMap.addMappings(mapper ->
                mapper.using(byteArrayToStringConverter).map(ServicioDTOPeticion::getImagen, ServicioEntity::setImagen)
        );
        return modelMapper;//El objeto retornado se almacena en el contenedor de Spring
    }
}
