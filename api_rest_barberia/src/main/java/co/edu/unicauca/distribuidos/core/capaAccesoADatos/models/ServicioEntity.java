package co.edu.unicauca.distribuidos.core.capaAccesoADatos.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServicioEntity {
    private Integer id;
    private String nombre;
    private String descripcion;
    private Integer precio;
    private byte[] imagen;
    private Integer duracionMin;

    private CategoriaEntity objCategoria;
}
