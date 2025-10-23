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

-- Servicios para 'Cortes cabello' (idCategoria = 1)
INSERT INTO servicios (id, nombre, descripcion, precio, imagen, duracionMinu, idCategoria) VALUES
                       (1,'Mullet', 'Corte moderno con longitud en la parte trasera.', 10000, null, 30, 1),
                       (2,'Fade', 'Degradado que va de muy corto a largo.', 12000, null, 40, 1),
                       (3,'Clásico Tijera', 'Corte tradicional realizado completamente a tijera.', 15000, null, 45, 1);

-- Servicios para 'Cuidado facial' (idCategoria = 2)
INSERT INTO servicios (id,nombre, descripcion, precio, imagen, duracionMinu, idCategoria) VALUES
                       (4,'Limpieza Profunda', 'Eliminación de impurezas, puntos negros y espinillas.', 25000, null, 60, 2),
                       (5,'Mascarilla Hidratante', 'Tratamiento para reponer la humedad y vitalidad de la piel.', 18000, null, 30, 2),
                       (6,'Exfoliación Facial', 'Remoción de células muertas para una piel más suave.', 15000, null, 25, 2);

-- Servicios para 'Tratamiento capilar' (idCategoria = 3)
INSERT INTO servicios (id,nombre, descripcion, precio, imagen, duracionMinu, idCategoria) VALUES
                       (7,'Rayitos', 'Decoloración para crear hebras rubias que añaden luz, dimensión y textura al cabello.', 50000, null, 120, 3),
                       (8,'Transición capilar a rizos', 'Proceso de dejar de usar químicos para que el cabello tenga una textura natural rizada.', 35000, null, 90, 3),
                       (9,'Alisado', 'Tratamiento para alisar el pelo.', 28000, null, 45, 3);

-- Servicios para 'Cortes barba' (idCategoria = 4)
INSERT INTO servicios (id,nombre, descripcion, precio, imagen, duracionMinu, idCategoria) VALUES
                       (10,'Afeitado Clásico', 'Afeitado con toalla caliente y navaja profesional.', 15000, null, 35, 4),
                       (11,'Diseño y Perfilado', 'Definición de contornos y líneas de la barba.', 10000, null, 25, 4),
                       (12,'Recorte con Máquina', 'Ajuste de longitud uniforme con diferentes calibres.', 8000, null, 20, 4);
