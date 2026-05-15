import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta raíz - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Cualquier otra ruta sirve index.html para SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 5173;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`\n✅ Servidor Planify corriendo en:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   http://127.0.0.1:${PORT}`);
  console.log(`\nPresiona Ctrl+C para detener\n`);
});
