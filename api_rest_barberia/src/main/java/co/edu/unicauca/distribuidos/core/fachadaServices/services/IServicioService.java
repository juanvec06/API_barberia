package co.edu.unicauca.distribuidos.core.fachadaServices.services;

import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;


import java.util.List;

public interface IServicioService {
    public List<ServicioDTORespuesta> findAll();

    public ServicioDTORespuesta findById(Integer id);

    public ServicioDTORespuesta save(ServicioDTOPeticion cliente);

    public ServicioDTORespuesta update(Integer id, ServicioDTOPeticion cliente);

    public boolean delete(Integer id);
}
