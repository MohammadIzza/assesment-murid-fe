/**
 * Parse JWT token to extract payload data
 * @param {string} token - JWT token string
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const parseJWT = (token) => {
  try {
    if (!token) return null;
    
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    
    const decoded = JSON.parse(jsonPayload);
    
    // Log the decoded token to help with debugging
    console.log('JWT decoded payload:', decoded);
    
    // Ensure numeric fields are properly parsed as numbers
    if (decoded.id_role !== undefined) {
      decoded.id_role = parseInt(decoded.id_role);
    }
    
    if (decoded.id !== undefined) {
      decoded.id = parseInt(decoded.id);
    }
    
    return decoded;
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return null;
  }
};