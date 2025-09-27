import { createClient } from '@supabase/supabase-js';

// Configura las variables de entorno de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sube una imagen a un bucket de Supabase Storage.
 * @param {Object} file - El objeto del archivo subido por Multer.
 * @returns {string} La URL pública de la imagen subida.
 */
export const uploadImageToSupabase = async (file) => {
  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = `products/${fileName}`; // Directorio dentro del bucket

  const { error } = await supabase.storage
    .from('product-images') // Asegúrate de que este es el nombre de tu bucket
    .upload(filePath, file.buffer, {
      upsert: false,
      contentType: file.mimetype,
    });

  if (error) {
    console.error('Error al subir la imagen:', error);
    throw new Error('No se pudo subir la imagen a Supabase.');
  }

  // Obtenemos la URL pública de la imagen
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${filePath}`;
  return publicUrl;
};
