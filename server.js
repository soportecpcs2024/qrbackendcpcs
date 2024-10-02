const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// Configurar dotenv para cargar las variables de entorno desde .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Usa la variable de entorno PORT o 5000 como predeterminado

// Configurar CORS para permitir solicitudes desde el frontend especificado en las variables de entorno
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // URL del frontend o '*' para permitir cualquier origen (útil para pruebas)
  methods: 'GET', // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions)); // Usar las opciones de CORS configuradas
app.use(express.json());

// Ruta para servir HTML con el mensaje basado en el id_unidad
app.get('/message/:id', async (req, res) => {
  const idUnidad = req.params.id;
  
  try {
    // Hacer solicitud a la API para obtener los detalles de la unidad
    const response = await axios.get(`${process.env.BACKEND_API_URL}/${idUnidad}`); // Usa la URL del backend desde las variables de entorno
    
    // Verificar si la solicitud fue exitosa
    if (response.status !== 200) {
      throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
    }

    const unit = response.data;

    // Verificar si los campos esperados existen
    const id_unidad = unit['_id'] || 'ID no disponible';
    const producto = unit['id_producto'] || {};
    const nombre_producto = producto['name'] || 'Nombre no disponible';
    const marca = producto['brand'] || 'Marca no disponible';
    const modelo = producto['model'] || 'Modelo no disponible';
    const precio = producto['price'] || 'Precio no disponible';
    const imagen = producto['image']?.['filePath'] || ''; // Maneja la posibilidad de que no exista imagen

    const ubicacion = unit['location'] || {};
    const nombre_ubicacion = ubicacion['nombre'] || 'Ubicación no disponible';
    const direccion = ubicacion['direccion'] || 'Dirección no disponible';
    const responsable = ubicacion['recibido_por'] || 'Responsable no disponible';
    const estado_ubicacion = ubicacion['estado'] || 'Estado no disponible';

    const estado_producto = unit['estado'] || 'Estado del producto no disponible';

    // Renderizar la información en el HTML de respuesta
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Detalles de la Unidad</title>
          <style>
              body { text-align: center; margin-top: 20px; font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
              h2 { font-size: 24px; margin-bottom: 10px; }
              p { font-size: 18px; margin: 5px 0; }
              img { max-width: 100%; height: auto; margin-top: 10px; }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Detalles de la Unidad</h2>
              <p><strong>Producto:</strong> ${nombre_producto}</p>
              <p><strong>Marca:</strong> ${marca}</p>
              <p><strong>Modelo:</strong> ${modelo}</p>
              <p><strong>Precio:</strong> ${precio}</p>
              ${imagen ? `<img src="${imagen}" alt="Imagen del Producto">` : '<p>No hay imagen disponible</p>'}
              <p><strong>Ubicación:</strong> ${direccion}</p>
              <p><strong>Responsable:</strong> ${responsable}</p>
              <p><strong>Estado de Ubicación:</strong> ${estado_ubicacion}</p>
              <p><strong>Estado del Producto:</strong> ${estado_producto}</p>
              <p><strong>ID de la Unidad:</strong> ${id_unidad}</p>
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error</title>
      </head>
      <body>
          <h2>Error al obtener los detalles de la unidad</h2>
          <p>${error.message}</p>
      </body>
      </html>
    `);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
