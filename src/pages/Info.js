import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [domainInfo, setDomainInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get('domain');  // replace 'key' with your param name

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  function getDomainAge(createdDateString) {
    if (!createdDateString) return 'Unknown';

    const createdDate = new Date(createdDateString);
    const now = new Date();

    let years = now.getFullYear() - createdDate.getFullYear();
    let months = now.getMonth() - createdDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
  }

  function truncate(text, maxLength = 25) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  useEffect(() => {
    fetchInfo(domain)
  },[domain])

  const fetchInfo = async (domain) => {
    setLoading(true)
    setError(null);
    setDomainInfo(null);
    setContactInfo(null);
    try {
      const res = await fetch('http://localhost:4000/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainInput: domain }),
      });

      if (!res.ok) {
        // Handle HTTP errors (like 404 or 500)
        const errData = await res.json();
        throw new Error(errData.error || 'Server returned an error');
      }

      const response = await res.json();

      if(!response.status) {
        setError(response.message)
        return false
      }

      let domainInfo = {
        domainName: response.domainInfo.domainName,
        registrarName: response.domainInfo.registrarName,
        registryData: {
          createdDate: response.domainInfo.registryData.createdDate,
          expiresDate: response.domainInfo.registryData.expiresDate,
          hostnames: response.domainInfo.registryData.nameServers.hostNames.join(', ')
        }
      }

      setDomainInfo(domainInfo)

      let contactInfo = {
        administrativeContact: response.domainInfo.administrativeContact,
        registrant: response.domainInfo.registrant,
        technicalContact: response.domainInfo.technicalContact
      }
      setContactInfo(contactInfo)
            
    } catch (err) {
      // console.error('Error fetching WHOIS info:', err.message);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {!domain && (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-lg text-gray-700 mb-4">No domain provided.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    )}
    {domain && (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <section className="container mx-auto py-16 px-4">
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🔍 Domain Information for <span className="text-blue-600">{domain}</span></h2>
            {loading && <p>Loading domain info...</p>}
            {error && <p className="text-red-600 font-semibold">❌ Error: {error}</p>}
            {domainInfo && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Domain Details</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li><strong>Domain Name:</strong> {domainInfo.domainName ?? 'N/A'}</li>
                  <li><strong>Registrar:</strong> {domainInfo.registrarName ?? 'N/A'}</li>
                  <li><strong>Registration Date:</strong> {formatDate(domainInfo.registryData.createdDate) ?? 'N/A'}</li>
                  <li><strong>Expiration Date:</strong> {formatDate(domainInfo.registryData.expiresDate) ?? 'N/A'}</li>
                  <li><strong>Estimated Domain Age:</strong> {getDomainAge(domainInfo.registryData.createdDate) ?? 'N/A'}</li>
                  <li><strong>Hostnames:</strong> {truncate(domainInfo.registryData.hostnames) ?? 'N/A'}</li>
                </ul>
              </div>
            )}

            {contactInfo && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li><strong>Registrant Name:</strong> {contactInfo.registrant.name ?? 'N/A'}</li>
                  <li><strong>Technical Contact Name:</strong> {contactInfo.technicalContact.name ?? 'N/A'}</li>
                  <li><strong>Administrative Contact Name:</strong> {contactInfo.administrativeContact.name ?? 'N/A'}</li>
                  <li><strong>Contact Email:</strong> {contactInfo.registrant.email ?? 'N/A'}</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    )}
    </>
  );
};

export default Info;
