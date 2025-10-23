CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreCategoria VARCHAR(255)
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    createAt DATE,
    idCategoria INT,
    FOREIGN KEY (idCategoria) REFERENCES categorias(id)
);

CREATE TABLE servicios (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    precio INT,
    imagen BLOB,
    duracionMinu INT NOT NULL,
    idCategoria INT,
    FOREIGN KEY (idCategoria) REFERENCES categorias(id)
);