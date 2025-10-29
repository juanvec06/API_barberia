package co.edu.unicauca.distribuidos.core.capaControladores;

import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.ServicioDTORespuesta;
import co.edu.unicauca.distribuidos.core.fachadaServices.services.IServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ServicioRestController {
    @Autowired
    IServicioService servicioService;

    @PostMapping("/productos")
    public ServicioDTORespuesta crearServicio(@RequestBody ServicioDTOPeticion servicioPeluqueria) {
        ServicioDTORespuesta servicioRespuesta = new ServicioDTORespuesta();
        servicioRespuesta = servicioService.save(servicioPeluqueria);
        return servicioRespuesta;
    }

    @GetMapping("/productos")
    public List<ServicioDTORespuesta> listarServicios() {
        return servicioService.findAll();
    }

    @GetMapping("/productos/{id}")
    public ServicioDTORespuesta consultarServicio(@PathVariable Integer id) {
        ServicioDTORespuesta servicioRespuesta = new ServicioDTORespuesta();
        servicioRespuesta = servicioService.findById(id);
        return servicioRespuesta;
    }

    @DeleteMapping("/productos/{id}")
    public Boolean eliminarServicio(@PathVariable Integer id) {
        Boolean bandera = false;
        ServicioDTORespuesta clienteActual = servicioService.findById(id);
        if (clienteActual != null) {
            bandera = servicioService.delete(id);
        }
        return bandera;
    }

    @PutMapping("/productos/{id}")
    public ServicioDTORespuesta actualizarServicio(@PathVariable Integer id, @RequestBody ServicioDTOPeticion servicioPeluqueria) {
        ServicioDTORespuesta servicioRespuesta = new ServicioDTORespuesta();
        servicioRespuesta = servicioService.update(id, servicioPeluqueria);
        return servicioRespuesta;
    }
}
