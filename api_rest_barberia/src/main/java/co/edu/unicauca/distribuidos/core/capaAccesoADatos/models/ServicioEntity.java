package co.edu.unicauca.distribuidos.core.capaAccesoADatos.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor

public class ServicioEntity {

    private Integer id;
    private String nombre;
    private String descripcion;
    private Integer precio;
    private String imagen;
    private Integer duracionMin;
    private Boolean estado;

    private CategoriaEntity objCategoria;
}
