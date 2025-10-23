package co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories.conexion.ConexionBD;

public class ServicioRepository {
    private final ConexionBD conexionBD;

    public ServicioRepository(ConexionBD conexionBD) {
        this.conexionBD = conexionBD;
    }


}
