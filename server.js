const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Utilizaremos Axios para hacer solicitudes HTTP
const app = express();
const port = 5000;

// Configurar CORS para permitir solicitudes desde https://leadpagesqrcpcs.onrender.com
const corsOptions = {
  origin: 'https://leadpagesqrcpcs.onrender.com', // URL de tu frontend
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
    const response = await axios.get(`https://backend-m7iv.onrender.com/api/units/${idUnidad}`);
    const unit = response.data;

    // Obtener la información específica del producto y la ubicación
    const id_unidad = unit['_id'];
    const producto = unit['id_producto'];
    const nombre_producto = producto['name'];
    const marca = producto['brand'];
    const modelo = producto['model'];
    const precio = producto['price'];
    const imagen = producto['image']['filePath'];
    
    const ubicacion = unit['location'];
    const nombre_ubicacion = ubicacion['nombre'];
    const direccion = ubicacion['direccion'];
    const estado_ubicacion = ubicacion['estado'];
    
    const estado_producto = unit['estado'];

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
              <p><strong>Id Unidad:</strong> ${id_unidad}</p>
              <p><strong>Producto:</strong> ${nombre_producto}</p>
              <p><strong>Marca:</strong> ${marca}</p>
              <p><strong>Modelo:</strong> ${modelo}</p>
              <p><strong>Precio:</strong> $${precio}</p>
              <img src="${imagen}" alt="Imagen del Producto">
              <p><strong>Ubicación:</strong> ${nombre_ubicacion}</p>
              <p><strong>Dirección:</strong> ${direccion}</p>
              <p><strong>Estado de Ubicación:</strong> ${estado_ubicacion}</p>
              <p><strong>Estado del Producto:</strong> ${estado_producto}</p>
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching data from API:', error);
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
