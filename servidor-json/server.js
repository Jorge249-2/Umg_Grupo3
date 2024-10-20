const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Ruta del archivo donde quieres guardar los datos
const filePath = path.join(__dirname, 'C:/Users/frism/OneDrive/Escritorio/Carpeta Amorcito/Paginas de Telecumunicaciones/Dato de JSON.json');

// Endpoint para recibir los datos y guardarlos en el archivo JSON
app.post('/guardar-datos', (req, res) => {
    const nuevoUsuario = req.body;

    // Leer el archivo existente
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        // Si el archivo tiene contenido, parsearlo, sino inicializar un array vacío
        let usuarios = data ? JSON.parse(data) : [];

        // Agregar el nuevo usuario
        usuarios.push(nuevoUsuario);

        // Escribir el archivo actualizado
        fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar los datos' });
            }
            res.status(200).json({ message: 'Datos guardados con éxito' });
        });
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
