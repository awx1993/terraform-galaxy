// Store JWT in localStorage
localStorage.setItem('token', response.data.token);

// Add to API requests
axios.get('/api/modules', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});
