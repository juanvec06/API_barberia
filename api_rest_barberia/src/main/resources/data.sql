INSERT INTO categorias (id, nombreCategoria) VALUES (1, 'Cortes cabello');
INSERT INTO categorias (id, nombreCategoria) VALUES (2, 'Cuidado facial');
INSERT INTO categorias (id, nombreCategoria) VALUES (3, 'Tratamiento capilar');
INSERT INTO categorias (id, nombreCategoria) VALUES (4, 'Cortes barba');

INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Juan', 'Perez', 'juan@unicauca.edu.co', '2025-01-22', 1);

INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Catalina', 'Lopez', 'catalina@unicauca.edu.co', '2025-03-22', 2);

INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Sandra', 'Sanchez', 'sandra@unicauca.edu.co', '2025-06-22', 3);


INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Andres', 'Perez', 'andres@unicauca.edu.co', '2025-04-22', 1);

-- Servicios para 'Cortes de Pelo' (idCategoria = 1)
INSERT INTO servicios (nombre, descripcion, estado, precio, imagen, duracionMin, idCategoria) VALUES
                       -- Activos
                       ('Mullet', 'Corte moderno con longitud en la parte trasera.', TRUE, 10000, './uploads/images/mullet.webp', 30, 1),
                       ('Fade', 'Degradado que va de muy corto a largo.', TRUE, 12000, './uploads/images/fade.jpg', 40, 1),
                       -- Inactivo
                       ('Clásico Tijera', 'Corte tradicional realizado completamente a tijera.', FALSE, 15000, './uploads/images/clasico-tijera.jpg', 45, 1);

-- Servicios para 'Cuidado facial' (idCategoria = 2)
INSERT INTO servicios (nombre, descripcion, estado, precio, imagen, duracionMin, idCategoria) VALUES
                       -- Activo
                       ('Limpieza Profunda', 'Eliminación de impurezas, puntos negros y espinillas.', TRUE, 25000, './uploads/images/limpieza-profunda.webp', 60, 2),
                       -- Inactivos
                       ('Mascarilla Hidratante', 'Tratamiento para reponer la humedad y vitalidad de la piel.', FALSE, 18000, './uploads/images/mascarilla-hidratante.jpg', 30, 2),
                       ('Exfoliación Facial', 'Remoción de células muertas para una piel más suave.', FALSE, 15000, './uploads/images/exfoliacion-facial.jpeg', 25, 2);

-- Servicios para 'Tratamiento capilar' (idCategoria = 3)
INSERT INTO servicios (nombre, descripcion, estado, precio, imagen, duracionMin, idCategoria) VALUES
                       -- Activo
                       ('Rayitos', 'Decoloración para crear hebras rubias que añaden luz, dimensión y textura al cabello.', TRUE, 50000, './uploads/images/rayitos.jpeg', 120, 3),
                       -- Inactivo
                       ('Transición capilar a rizos', 'Proceso de dejar de usar químicos para que el cabello tenga una textura natural rizada.', FALSE, 35000, './uploads/images/transicion-capilar.webp', 90, 3),
                       -- Activo
                       ('Alisado', 'Tratamiento para alisar el pelo.', TRUE, 28000, './uploads/images/alisado.webp', 45, 3);

-- Servicios para 'Cortes barba' (idCategoria = 4)
INSERT INTO servicios (nombre, descripcion, estado, precio, imagen, duracionMin, idCategoria) VALUES
                       -- Activos
                       ('Afeitado Clásico', 'Afeitado con toalla caliente y navaja profesional.', TRUE, 15000, './uploads/images/afeitado-clasico.jpeg', 35, 4),
                       ('Diseño y Perfilado', 'Definición de contornos y líneas de la barba.', TRUE, 10000, './uploads/images/diseno-perfilado.jpg', 25, 4),
                       -- Inactivo
                       ('Recorte con Máquina', 'Recorte de barba y bigote con máquina.', FALSE, 8000, './uploads/images/recorte-maquina.webp', 20, 4);