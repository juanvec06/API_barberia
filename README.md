# 💈 Barbería JD - Proyecto de Ingeniería de Software III

> Aplicación web Full-Stack para la gestión de servicios de una barbería, construida con Angular y Spring Boot. Este proyecto fue desarrollado como parte del Laboratorio 5 de Ingeniería de Software III en la Universidad del Cauca.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

---

## 📜 Tabla de Contenidos

1.  [Acerca del Proyecto](#-acerca-del-proyecto)
2.  [Características Principales](#-características-principales)
3.  [Stack Tecnológico](#-stack-tecnológico)
4.  [Puesta en Marcha](#-puesta-en-marcha)
5.  [Autores](#-autores)


---

## 🎯 Acerca del Proyecto

**Barbería JD** es una aplicación web SPA (Single Page Application) que simula la plataforma de una tienda de servicios. El proyecto implementa dos vistas principales: una para el **cliente (Comprador)**, donde puede visualizar y filtrar los servicios por categoría, y otra para el **Administrador**, que cuenta con un CRUD completo para la gestión de estos servicios.

El objetivo principal fue aplicar los conceptos de desarrollo de software moderno, incluyendo:
-   **Frontend modular y reactivo** con Angular.
-   **Backend robusto y organizado por capas** con Spring Boot.
-   **Arquitectura de software desacoplada** utilizando el patrón **Facade** para la gestión del estado en el frontend.
-   **Diseño completamente adaptable (Responsive)** a diferentes dispositivos.


---

## ✨ Características Principales

### Funcionalidades Implementadas
✅ **Gestión de Productos (Rol Administrador):**
-   **Registrar:** Crear nuevos servicios a través de un formulario con validaciones robustas.
-   **Listar:** Ver todos los servicios existentes en una tabla con opciones de gestión.
-   **Actualizar:** Modificar los datos de un servicio precargando la información en un formulario.
-   **Eliminar:** Borrar un servicio con un diálogo de confirmación para prevenir acciones accidentales.

✅ **Vista de Catálogo (Rol Cliente):**
-   **Ver Productos por Categoría:** Navegar y filtrar el catálogo de servicios a través de una barra lateral interactiva.
-   **Interfaz Dinámica:** Las tarjetas de producto presentan un efecto de volteo para mostrar más detalles del servicio.

### Requisitos Técnicos Cumplidos
✅ **Arquitectura Frontend Avanzada:**
-   Uso de **Modelos** para tipar los datos.
-   Uso de **DTOs** (Data Transfer Objects) para la comunicación con el backend.
-   Implementación del **Patrón Facade** para centralizar la lógica de negocio y la gestión del estado.
-   **Programación Reactiva** con RxJS (`Observable`, `BehaviorSubject`) para un flujo de datos eficiente.

✅ **Diseño 100% Adaptable (Responsive Design):**
-   **Dispositivos Grandes (`>=992px`):** 6 productos por fila.
-   **Dispositivos Medianos (`>=768px`):** Barra lateral de 4/12 columnas y 4 productos por fila.
-   **Dispositivos Pequeños (`>=576px`):** Barra lateral de 2/12 columnas y 3 productos por fila, con contenido optimizado.
-   **Dispositivos Muy Pequeños (`<576px`):** Layout apilado de una sola columna para máxima legibilidad.

---

## 🛠️ Stack Tecnológico

| Área             | Tecnología                                                                                                                              | Descripción                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Frontend**     | ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)                                           | Framework principal para construir la SPA.                                  |
|                  | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)                                | Lenguaje de programación principal del frontend.                            |
|                  | ![RxJS](https://img.shields.io/badge/RxJS-E83B8A?style=flat&logo=rxjs&logoColor=white)                                                   | Para la programación reactiva y gestión de flujos de datos asíncronos.      |
|                  | ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)                                    | Framework CSS para estilos y diseño responsive.                             |
| **Backend**      | ![Spring](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring&logoColor=white)                                        | Framework para la creación de la API REST.                                  |
|                  | ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)                                                | Lenguaje de programación principal del backend.                             |
| **Base de Datos**| ![H2](https://img.shields.io/badge/H2_Database-464646?style=flat&logo=h2&logoColor=white)                                                 | Base de datos en memoria para un desarrollo y pruebas ágiles.               |

---

## 🚀 Puesta en Marcha

Para ejecutar este proyecto de forma local, sigue estos pasos:

### Prerrequisitos
-   Node.js y npm ([Descargar](https://nodejs.org/))
-   Angular CLI (`npm install -g @angular/cli`)
-   Java JDK (Versión 17 o superior)
-   Apache Maven

### Instalación

1.  **Clona el repositorio:**
    ```sh
    git clone https://github.com/juanvec06/API_barberia.git
    cd API_barberia
    ```

2.  **Ejecuta el Backend (Spring Boot):**
    ```sh
    # Navega a la carpeta del backend
    cd api_rest_barberia 

    # Ejecuta la aplicación
    mvn spring-boot:run
    ```
    El servidor se iniciará en `http://localhost:5000`.

3.  **Ejecuta el Frontend (Angular):**
    ```sh
    # En una nueva terminal, navega a la carpeta del frontend
    cd "proyecto angular"

    # Instala las dependencias
    npm install

    # Inicia el servidor de desarrollo
    ng serve -o
    ```
    La aplicación se abrirá automáticamente en `http://localhost:4200`.

---

---

## 👨‍💻 Autores

-   **Juan David Vela Coronado** - [GitHub](https://github.com/juanvec06)
-   **Juan Diego Gómez Garcés** - [GitHub](https://github.com/JDiegoG12)

---
