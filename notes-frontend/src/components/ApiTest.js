import React, { useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const testRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        name: `Test User ${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Error testing register:', err);
      setError(`${err.message}: ${JSON.stringify(err.response?.data || {})}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Error testing login:', err);
      setError(`${err.message}: ${JSON.stringify(err.response?.data || {})}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">API Test</h2>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-2">Testing API at: {apiUrl}</p>
        
        <div className="flex space-x-2 mb-4">
          <button 
            onClick={testRegister}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Test Register
          </button>
          
          <button 
            onClick={testLogin}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Test Login
          </button>
        </div>
        
        {loading && <p className="text-gray-700">Loading...</p>}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {result && (
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            <pre className="text-sm">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest; 