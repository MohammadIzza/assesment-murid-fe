import axios from 'axios';

// Base URL dari environment variable
const apiUrl = import.meta.env.VITE_API_URL || '';

/**
 * Fungsi untuk mengambil data guru berdasarkan ID
 * @param {number|string} id - ID guru
 * @return {Promise} - Promise hasil request
 */
export const getGuruById = async (id) => {
  try {
    if (!id) throw new Error('ID guru tidak ditemukan');
    
    const response = await axios.get(`/view/guru/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guru data');
    throw error;
  }
};

/**
 * Fungsi untuk update data guru
 * @param {number|string} id - ID guru
 * @param {object} data - Data yang akan diupdate
 * @return {Promise} - Promise hasil request
 */
export const updateGuruById = async (id, data) => {
  try {
    if (!id) throw new Error('ID guru tidak ditemukan');
    
    const response = await axios.put(`/update/guru/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating guru data');
    throw error;
  }
};