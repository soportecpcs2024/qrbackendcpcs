const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Configurar CORS para permitir solicitudes desde http://localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173', // URL de tu frontend
  methods: 'GET', // Métodos HTTP permitidos (puedes agregar más si es necesario)
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
