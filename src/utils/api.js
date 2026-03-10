const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper to get proper image URL based on environment
export const getImageUrl = (path) => {
  if (!path) return '';
  // If already full URL, return as is
  if (path.startsWith('http')) return path;
  // Otherwise, prepend API URL
  return `${API_URL}${path}`;
};

export const searchByUsername = async (username) => {
  if (!username || !username.trim()) {
    throw new Error('Username is required');
  }

  try {
    const response = await fetch(`${API_URL}/api/search/username`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim() })
    });
    
    if (!response.ok) {
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.error || 'Search failed');
      } else {
        throw new Error(`Backend API not reachable. Status: ${response.status}`);
      }
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Backend server is not running. Please start the backend server.');
    }
    throw error;
  }
};

export const searchByUrl = async (url) => {
  if (!url || !url.trim()) {
    throw new Error('URL is required');
  }

  try {
    const response = await fetch(`${API_URL}/api/social/extract-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.trim() })
    });
    
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to extract data');
      } else {
        throw new Error(`Backend API not reachable. Status: ${response.status}`);
      }
    }
    
    return response.json();
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Backend server is not running. Please start the backend server.');
    }
    throw error;
  }
};

export const searchByImage = async (image, username) => {
  if (!image) {
    throw new Error('Image is required');
  }

  const formData = new FormData();
  formData.append('image', image);
  if (username?.trim()) {
    formData.append('username', username.trim());
  }
  
  const response = await fetch(`${API_URL}/api/search/image`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Image search failed');
  }
  
  return response.json();
};

export const validatePhone = async (phone) => {
  if (!phone || !phone.trim()) {
    throw new Error('Phone number is required');
  }

  const response = await fetch(`${API_URL}/api/search/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: phone.trim() })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Phone validation failed');
  }
  
  return response.json();
};

export const lookupIP = async (ip) => {
  if (!ip || !ip.trim()) {
    throw new Error('IP address is required');
  }

  const response = await fetch(`${API_URL}/api/search/ip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip: ip.trim() })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'IP lookup failed');
  }
  
  return response.json();
};

export const analyzeWebsite = async (url) => {
  if (!url || !url.trim()) {
    throw new Error('Website URL is required');
  }

  const response = await fetch(`${API_URL}/api/search/website`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url.trim() })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Website analysis failed');
  }
  
  return response.json();
};
