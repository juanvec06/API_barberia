package co.edu.unicauca.distribuidos.core.fachadaServices.mapper;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Define la ubicación física de las imágenes
        // O si está en el mismo nivel que el JAR/WAR
        String uploadsPath = "file:./uploads/images/";

        // 1. Especifica la ruta lógica para el frontend (ej: http://.../images/nombre.jpg)
        // 2. Especifica la ubicación física de donde Spring debe buscar
        registry.addResourceHandler("/images/**")
                .addResourceLocations(uploadsPath);
    }
}
