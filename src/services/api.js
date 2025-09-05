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

/**
 * Ambil guru berdasarkan user_id (kolom relasi di tabel guru)
 * @param {number|string} userId
 * @returns {Promise<object|null>} - response.data atau null jika tidak ditemukan
 */
export const getGuruByUserId = async (userId) => {
  try {
    if (!userId) throw new Error('userId tidak ditemukan');
    const response = await axios.get(`/filter/guru/user/${userId}`);
    return response.data;
  } catch (err) {
    // jika resource tidak ditemukan, kembalikan null agar caller bisa fallback
    if (err?.response?.status === 404) return null;
  // Untuk kasus 500 atau network error kita juga kembalikan null supaya caller bisa mencoba fallback
  console.warn('getGuruByUserId failed (will fallback):', err?.response?.status || err.message || err);
  return null;
  }
};

/**
 * Cari guru berdasarkan email (implementasi: fetch /list/guru lalu filter client-side)
 * Berguna sebagai fallback bila lookup berdasarkan userId gagal.
 * @param {string} email
 * @returns {Promise<object|null>} - objek guru atau null jika tidak ditemukan
 */
export const getGuruByEmail = async (email) => {
  try {
    if (!email) throw new Error('email tidak diberikan');
    const response = await axios.get(`/list/guru`);
    if (!response?.data?.success) return null;
    const rows = response.data.data || [];
    const found = rows.find((g) => String(g.email).toLowerCase() === String(email).toLowerCase());
    return found || null;
  } catch (err) {
    console.error('Error fetching guru list for email lookup', err.message || err);
    throw err;
  }
};