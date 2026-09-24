const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6095';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('ishwar_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.message || `API request failed with status: ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const portfolioApi = {
  // Auth
  login: (email, password) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  verifyAuth: () => apiRequest('/auth/verify'),

  // Stats
  getStats: () => apiRequest('/admin/stats'),

  // Inquiries
  sendInquiry: (payload) =>
    apiRequest('/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getInquiries: () => apiRequest('/inquiries'),

  updateInquiryStatus: (id, status) =>
    apiRequest(`/inquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  deleteInquiry: (id) =>
    apiRequest(`/inquiries/${id}`, {
      method: 'DELETE',
    }),

  // Projects
  getProjects: () => apiRequest('/projects'),

  createProject: (payload) =>
    apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateProject: (id, payload) =>
    apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  deleteProject: (id) =>
    apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    }),

  // Dynamic Site Content (Home Hero, Home About, Contact Details, etc.)
  getContent: (key) => apiRequest(`/content/${key}`),

  saveContent: (key, data) =>
    apiRequest(`/content/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    }),

  // Dedicated About Page Content
  getAbout: () => apiRequest('/about'),

  saveAbout: (data) =>
    apiRequest('/about', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Dedicated Contact Page Content
  getContact: () => apiRequest('/contact'),

  saveContact: (data) =>
    apiRequest('/contact', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Dedicated Skills Page Content
  getSkills: () => apiRequest('/skills'),

  saveSkills: (data) =>
    apiRequest('/skills', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
