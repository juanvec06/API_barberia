package co.edu.unicauca.distribuidos.core.fachadaServices.DTO;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.CategoriaEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServicioDTORespuesta {
    private Integer id;
    private String nombre;
    private String descripcion;
    private Integer precio;
    private byte[] imagen;
    private Integer duracionMin;
    private Boolean estado;

    private CategoriaDTORespuesta objCategoria;
}
