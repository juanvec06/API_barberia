package co.edu.unicauca.distribuidos.core.fachadaServices.services;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.ServicioEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories.ServicioRepository;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioService implements IServicioService {

    @Autowired
    private ServicioRepository servicioRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<ServicioDTORespuesta> findAll() {
        return List.of();
    }

    @Override
    public ServicioDTORespuesta findById(Integer id) {
        ServicioDTORespuesta objServicio = null;
        Optional<ServicioEntity> servicio = servicioRepository.findById(id);
        if (servicio.isPresent()) {
            ServicioEntity servicioEntity = servicio.get();
            objServicio = modelMapper.map(servicioEntity, ServicioDTORespuesta.class);
            return objServicio;
        }
        else{
            return null;
        }
    }

    @Override
    public ServicioDTORespuesta save(ServicioDTOPeticion cliente) {
        return null;
    }

    @Override
    public ServicioDTORespuesta update(Integer id, ServicioDTOPeticion cliente) {
        return null;
    }

    @Override
    public boolean delete(Integer id) {
        return false;
    }
}
