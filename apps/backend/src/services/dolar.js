import ky from 'ky';

export const getDolarData = async () => {
  const apiUrl = 'https://ve.dolarapi.com/v1/dolares/oficial';

  try {
    const response = await ky.get(apiUrl).json();

    // Verifica si la respuesta contiene los datos que esperas
    if (!response || response.promedio === undefined || !response.fechaActualizacion) {
      throw new Error('Invalid data received from external API.');
    }

    const data = {
      promedio: response.promedio,
      fechaActualizacion: response.fechaActualizacion,
    };

    return data;
  } catch (error) {
    console.error('Error fetching dolar data:', error);
    throw new Error('Failed to fetch dolar data from external API.');
  }
};
