CREATE TABLE convert_table (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Nombre VARCHAR(255) NOT NULL,
    Edad INTEGER NOT NULL,
    Departamento TEXT NOT NULL,
    Email TEXT NOT NULL,
    create_time DATE
);