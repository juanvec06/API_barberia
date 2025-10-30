package co.edu.unicauca.distribuidos.core.capaControladores;

import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;
import co.edu.unicauca.distribuidos.core.fachadaServices.services.IServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ServicioRestController {
    @Autowired
    IServicioService servicioService;

    /**
     * Crea un nuevo servicio.
     * Devuelve 201 (Created) si tiene éxito.
     * Devuelve 500 (Internal Server Error) si ocurre un error inesperado.
     */
    @PostMapping("/productos")
    public ResponseEntity<ServicioDTORespuesta> crearServicio(@RequestBody ServicioDTOPeticion servicioPeluqueria) {
        ServicioDTORespuesta servicioRespuesta = servicioService.save(servicioPeluqueria);
        // Asumiendo que si el guardado falla, el servicio lanzará una excepción
        // que será capturada por un manejador global de excepciones.
        return new ResponseEntity<>(servicioRespuesta, HttpStatus.CREATED);
    }

    /**
     * Lista todos los servicios.
     * Devuelve 200 (OK) siempre, incluso si la lista está vacía.
     */
    @GetMapping("/productos")
    public ResponseEntity<List<ServicioDTORespuesta>> listarServicios() {
        List<ServicioDTORespuesta> servicios = servicioService.findAll();
        return new ResponseEntity<>(servicios, HttpStatus.OK);
    }

    /**
     * Consulta un servicio por su ID.
     * Devuelve 200 (OK) si lo encuentra.
     * Devuelve 404 (Not Found) si no existe.
     */
    @GetMapping("/productos/{id}")
    public ResponseEntity<ServicioDTORespuesta> consultarServicio(@PathVariable Integer id) {
        ServicioDTORespuesta servicioRespuesta = servicioService.findById(id);
        if (servicioRespuesta == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(servicioRespuesta, HttpStatus.OK);
    }

    /**
     * Elimina un servicio por su ID.
     * Devuelve 204 (No Content) si la eliminación fue exitosa.
     * Devuelve 404 (Not Found) si el servicio a eliminar no existe.
     * Devuelve 500 (Internal Server Error) si existe pero no se pudo eliminar.
     */
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Void> eliminarServicio(@PathVariable Integer id) {
        // Sería más eficiente si el servicio 'delete' arrojara una excepción
        // si no encuentra el ID, para evitar la doble consulta a la BD.
        ServicioDTORespuesta clienteActual = servicioService.findById(id);
        if (clienteActual == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        boolean eliminado = servicioService.delete(id);
        if (eliminado) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Actualiza un servicio existente.
     * Devuelve 200 (OK) con el objeto actualizado si tiene éxito.
     * Devuelve 404 (Not Found) si el servicio a actualizar no existe.
     */
    @PutMapping("/productos/{id}")
    public ResponseEntity<ServicioDTORespuesta> actualizarServicio(@PathVariable Integer id, @RequestBody ServicioDTOPeticion servicioPeluqueria) {
        ServicioDTORespuesta servicioRespuesta = servicioService.update(id, servicioPeluqueria);
        // Se asume que el metodo update devuelve null si no encuentra el recurso.
        if (servicioRespuesta == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(servicioRespuesta, HttpStatus.OK);
    }
}