package co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.CategoriaEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.ServicioEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories.conexion.ConexionBD;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;
import org.modelmapper.internal.bytebuddy.dynamic.scaffold.MethodRegistry;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.sql.Statement;
import java.util.ArrayList;
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
        System.out.println("consultando todos los servicios en la base de datos");
        List<ServicioEntity> listaServicios = new ArrayList<>();
        try{
            conexionBD.conectar();
            PreparedStatement statement = null;
            String consulta = "select * from servicios join categorias on servicios.idCategoria=categorias.id";
            statement = conexionBD.getConnection().prepareStatement(consulta);
            ResultSet res = statement.executeQuery();
            while(res.next()) {
                ServicioEntity objServicio = new ServicioEntity();
                objServicio.setId(res.getInt("id"));
                objServicio.setNombre(res.getString("nombre"));
                objServicio.setDescripcion(res.getString("descripcion"));
                objServicio.setPrecio(res.getInt("precio"));
                objServicio.setImagen(res.getString("imagen"));
                objServicio.setDuracionMin(res.getInt("duracionMin"));
                objServicio.setEstado(res.getBoolean("estado"));
                objServicio.setObjCategoria(new CategoriaEntity(res.getInt("idCategoria"), res.getString("nombreCategoria")));

                listaServicios.add(objServicio);
            }
            statement.close();
            conexionBD.desconectar();

        }catch(SQLException ex){
            System.out.println(ex.getMessage());
            return Optional.empty();
        }
        return listaServicios.isEmpty() ? Optional.empty() : Optional.of(listaServicios);
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
                objServicio.setObjCategoria(new CategoriaEntity(res.getInt("idCategoria"), res.getString("nombreCategoria")));
            }
            statement.close();
            conexionBD.desconectar();

        }catch(SQLException ex){
            System.out.println(ex.getMessage());
            return Optional.empty();
        }
        return objServicio == null ? Optional.empty() : Optional.of(objServicio);
    }

    public Optional<ServicioEntity> save(ServicioEntity objServicio) {
        System.out.println("guardando servicio en la base de datos");
        ServicioEntity objServicioBD = null;
        int resultado = -1;
        try {
            conexionBD.conectar();
            PreparedStatement statement = null;
            String consulta = "insert into servicios (nombre, descripcion, estado, precio, imagen, duracionMin, idCategoria) values (?,?,?,?,?,?,?)";
            statement = conexionBD.getConnection().prepareStatement(consulta, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, objServicio.getNombre());
            statement.setString(2, objServicio.getDescripcion());
            statement.setBoolean(3, objServicio.getEstado());
            statement.setInt(4, objServicio.getPrecio());
            statement.setString(5, objServicio.getImagen());
            statement.setInt(6, objServicio.getDuracionMin());
            statement.setInt(7, objServicio.getObjCategoria().getId());
            resultado = statement.executeUpdate();

            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                int idGenerado = generatedKeys.getInt(1);
                objServicio.setId(idGenerado);
                System.out.println("ID generado: " + idGenerado);
                if (resultado == 1) {
                    objServicioBD = this.findById(idGenerado).get();
                }
            }
            else {
                System.out.println("No se pudo obtener el ID generado.");
            }

            generatedKeys.close();
            statement.close();
            conexionBD.desconectar();
        }catch(SQLException ex){
            System.out.println(ex.getMessage());
            return Optional.empty();
        }
        return objServicioBD == null ? Optional.empty() : Optional.of(objServicioBD);
    }

    public Boolean delete(Integer id) {
        System.out.println("eliminando servicio en la base de datos");
        int resultado = -1;
        try {
            conexionBD.conectar();
            PreparedStatement statement = null;
            String consulta = "delete from servicios where id=?";
            statement = conexionBD.getConnection().prepareStatement(consulta);
            statement.setInt(1, id);
            resultado = statement.executeUpdate();
            statement.close();
            conexionBD.desconectar();
        }catch(SQLException ex){
            System.out.println(ex.getMessage());
            return false;
        }
        return resultado == 1;
    }

    public Optional<ServicioEntity> update(ServicioEntity objServicio) {
        System.out.println("actualizando servicio en la base de datos");
        ServicioEntity objServicioBD = null;
        int resultado = -1;
        try {
            conexionBD.conectar();
            PreparedStatement statement = null;
            String consulta = "update servicios set nombre=?, descripcion=?, estado=?, precio=?, imagen=?, duracionMin=?, idCategoria=? where id=?";
            statement = conexionBD.getConnection().prepareStatement(consulta);
            statement.setString(1, objServicio.getNombre());
            statement.setString(2, objServicio.getDescripcion());
            statement.setBoolean(3, objServicio.getEstado());
            statement.setInt(4, objServicio.getPrecio());
            statement.setString(5, objServicio.getImagen());
            statement.setInt(6, objServicio.getDuracionMin());
            statement.setInt(7, objServicio.getObjCategoria().getId());
            statement.setInt(8, objServicio.getId());
            resultado = statement.executeUpdate();

            if (resultado == 1) {
                objServicioBD = this.findById(objServicio.getId()).get();
            }

            statement.close();
            conexionBD.desconectar();
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            return Optional.empty();
        }
        return objServicioBD == null ? Optional.empty() : Optional.of(objServicioBD);
    }
}
