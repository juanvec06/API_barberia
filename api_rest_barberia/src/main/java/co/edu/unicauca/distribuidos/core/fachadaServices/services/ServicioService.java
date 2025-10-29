package co.edu.unicauca.distribuidos.core.fachadaServices.services;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.ServicioEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories.ServicioRepository;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
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
        List<ServicioDTORespuesta> listaServicios = null;
        Optional<Collection<ServicioEntity>> serviciosEntityOpt = this.servicioRepository.findAll();

        // Si el Optional está vacío, devolvemos una lista vacía
        if (serviciosEntityOpt.isEmpty()) {
            listaServicios=List.of(); // Retorna una lista inmutable vacía
        }
        else{
            // Convertimos la colección a una lista y la mapeamos a ClienteDTO
            Collection<ServicioEntity> serviciosEntity = serviciosEntityOpt.get();
            listaServicios= this.modelMapper.map(serviciosEntity, new TypeToken<List<ServicioDTORespuesta>>() {}.getType());

        }


        return listaServicios;
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
        ServicioDTORespuesta objServicioOut = null;
        ServicioEntity objServicioIn = modelMapper.map(cliente, ServicioEntity.class);
        Optional<ServicioEntity> servicio = servicioRepository.save(objServicioIn);
        if (servicio.isPresent()) {
            ServicioEntity servicioEntity = servicio.get();
            objServicioOut = modelMapper.map(servicioEntity, ServicioDTORespuesta.class);
            return objServicioOut;
        }
        return null;
    }

    @Override
    public ServicioDTORespuesta update(Integer id, ServicioDTOPeticion servicio) {
        // IMPORTANTE: cuando no se quiere actualizar la imagen, el DTO debe tener vacio o nulo
        ServicioDTORespuesta objServicioOut = null;
        ServicioEntity newServicioEntity = null;
        Optional<ServicioEntity> consultaServicio = servicioRepository.findById(id);
        if (consultaServicio.isPresent()) {
            ServicioEntity servicioEntity = consultaServicio.get();
            if (servicio.getImagen() == null || servicio.getImagen().length == 0){
                servicioEntity.setNombre(servicio.getNombre());
                servicioEntity.setDescripcion(servicio.getDescripcion());
                servicioEntity.setPrecio(servicio.getPrecio());
                servicioEntity.setDuracionMin(servicio.getDuracionMin());
                servicioEntity.setEstado(servicio.getEstado());
                servicioEntity.getObjCategoria().setId(servicio.getObjCategoria().getId());
                servicioEntity.getObjCategoria().setNombre("");
                newServicioEntity = servicioRepository.update(servicioEntity).get();
            } else{
                newServicioEntity = modelMapper.map(servicio, ServicioEntity.class);
                newServicioEntity.setId(servicioEntity.getId());
                newServicioEntity = servicioRepository.update(newServicioEntity).get();
            }
            objServicioOut = modelMapper.map(newServicioEntity, ServicioDTORespuesta.class);
        }
        return objServicioOut;
    }

    @Override
    public boolean delete(Integer id) {
        return this.servicioRepository.delete(id);
    }
}
