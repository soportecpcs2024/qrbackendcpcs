const express = require('express');
const cors = require('cors');
const path = require('path');

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

// Ruta para servir HTML con los detalles del producto
app.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  const apiUrl = `https://backend-m7iv.onrender.com/api/units/${productId}`;

  try {
    // Importar dinámicamente 'node-fetch'
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    const product = data.id_producto;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Detalles del Producto</title>
          <style>
              body { text-align: center; margin-top: 20px; }
              .product { max-width: 600px; margin: auto; }
              h1 { font-size: 24px; }
              p { font-size: 18px; }
              .description { white-space: pre-line; text-align: left; }
          </style>
      </head>
      <body>
          <div class="product">
              <h1>${product.name}</h1>
              <p><strong>Brand:</strong> ${product.brand}</p>
              <p><strong>SKU:</strong> ${product.sku}</p>
              <p><strong>Category:</strong> ${product.category}</p>
              <p><strong>Model:</strong> ${product.model}</p>
              <p><strong>Dimensions:</strong> ${product.dimensions}</p>
              <p><strong>Price:</strong> $${product.price}</p>
              <p><strong>Color:</strong> ${product.color || 'No especificado'}</p>
              <p><strong>Description:</strong></p>
              <p class="description">${product.description}</p>
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Error fetching product');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
