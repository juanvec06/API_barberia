package co.edu.unicauca.distribuidos.core.fachadaServices.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ServicioDTOPeticion {

	private String nombre;
	private String descripcion;
	private Integer precio;
	private byte[] imagen;
	private Integer duracionMin;

	private CategoriaDTOPeticion objCategoria;

	public ServicioDTOPeticion() {

	}
}