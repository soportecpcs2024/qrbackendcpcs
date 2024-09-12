// backend code
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

app.get('/message/:id', (req, res) => {
  const message = messages[req.params.id] || 'Mensaje no encontrado';
  res.json({ message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
