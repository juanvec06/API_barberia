
package co.edu.unicauca.distribuidos.core.fachadaServices.services;

import java.util.List;

import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ClienteDTORespuesta;

public interface IClienteService {

	public List<ClienteDTORespuesta> findAll();

	public ClienteDTORespuesta findById(Integer id);

	public ClienteDTORespuesta save(ServicioDTOPeticion cliente);

	public ClienteDTORespuesta update(Integer id, ServicioDTOPeticion cliente);

	public boolean delete(Integer id);
}


