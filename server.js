const express = require('express');
const cors = require('cors');
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

const messages = {
  '1': 'Hola',
  '2': 'Qué más',
  '3': 'Chao',
  '4': 'Nos vemos',
};

// Ruta para servir HTML con el mensaje
app.get('/message/:id', (req, res) => {
  const message = messages[req.params.id] || 'Mensaje no encontrado';
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mensaje</title>
        <style>
            body { text-align: center; margin-top: 50px; }
            h2 { font-size: 24px; }
        </style>
    </head>
    <body>
        <h2>${message}</h2>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
