import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const [domain, setDomain] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (domain) {
      navigate(`/info?domain=${domain}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <section className="flex items-center justify-center py-20">
        <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Check Your Domain</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter domain name (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
