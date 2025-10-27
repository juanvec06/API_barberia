package co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.ServicioEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories.conexion.ConexionBD;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;
import org.modelmapper.internal.bytebuddy.dynamic.scaffold.MethodRegistry;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public class ServicioRepository {
    private final ConexionBD conexionBD;

    public ServicioRepository() {
        this.conexionBD = new ConexionBD();
    }

    public Optional<Collection<ServicioEntity>> findAll() {
        //TODO
        return Optional.empty();
    }

    public Optional<ServicioEntity> findById(Integer id) {
        System.out.println("consultando servicio findById en la base de datos");
        ServicioEntity objServicio = null;
        try{
            conexionBD.conectar();
            PreparedStatement statement = null;
            String consulta = "select * from servicios join categorias on servicios.idCategoria=categorias.id where servicios.id=?";
            statement = conexionBD.getConnection().prepareStatement(consulta);
            statement.setInt(1,id);
            ResultSet res = statement.executeQuery();
            while(res.next()) {
                objServicio = new ServicioEntity();
                objServicio.setId(res.getInt("id"));
                objServicio.setNombre(res.getString("nombre"));
                objServicio.setDescripcion(res.getString("descripcion"));
                objServicio.setPrecio(res.getInt("precio"));
                objServicio.setImagen(res.getString("imagen"));
                objServicio.setDuracionMin(res.getInt("duracionMin"));
                objServicio.setEstado(res.getBoolean("estado"));
            }
            statement.close();
            conexionBD.desconectar();

        }catch(SQLException ex){
            System.out.println(ex.getMessage());
            return Optional.empty();
        }
        return objServicio == null ? Optional.empty() : Optional.of(objServicio);
    }
}
