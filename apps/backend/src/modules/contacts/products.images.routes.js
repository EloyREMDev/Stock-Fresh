import express from 'express';
import multer from 'multer';
import { uploadImageToSupabase } from '../../services/imageUploader.js';

const router = express.Router();

// Configura Multer para manejar la subida de archivos
// Usa 'memoryStorage' para almacenar el archivo en la memoria como un buffer
// antes de subirlo a Supabase.
const upload = multer({
  storage: multer.memoryStorage(),
});

// POST /api/products/images/upload
// Usa el middleware de Multer para manejar el campo 'product-image'
router.post('/upload', upload.single('product-image'), async (req, res) => {
  try {
    // 1. Verifica si un archivo fue subido
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo.' });
    }

    // 2. Llama al servicio de subida de imágenes con el buffer del archivo
    const imageUrl = await uploadImageToSupabase(req.file);

    // 3. Envía la URL de la imagen al cliente
    res.status(201).json({ imageUrl });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    res.status(500).json({ error: 'Error interno del servidor al subir la imagen.' });
  }
});

export default router;
