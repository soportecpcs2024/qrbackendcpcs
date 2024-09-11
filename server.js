const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const messages = {
  '1': 'Hola',
  '2': 'Qué más',
  '3': 'Chao',
  '4': 'Nos vemos'
};

app.get('/message/:id', (req, res) => {
  const message = messages[req.params.id] || 'Mensaje no encontrado';
  res.json({ message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
