const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = 'at_ss64YnuMve29e75y9PohJksl9lnV2';

// POST /api/info - send domain info by domain name (from frontend)
router.post('/info', async (req, res) => {
  const { domainInput } = req.body;

  if (!domainInput) {
    return res.status(400).json({ error: 'domainInput is required' });
  }

  try {
    // Call WhoisXML API
    const response = await axios.get('https://www.whoisxmlapi.com/whoisserver/WhoisService', {
      params: {
        apiKey: API_KEY,
        domainName: domainInput,
        outputFormat: 'JSON',
      },
    });

    const data = response.data;

    if (!data.WhoisRecord) {
      return res.status(404).json({ error: 'No WHOIS record found' });
    }

    // Extract domain & contact info from the response
    const record = data.WhoisRecord;

    // Example of data you can send back
    const domainInfo = {
      domainName: record.domainName || '',
      registrarName: record.registrarName || '',
      registryData: record.registryData || {},
      registrant: record.registrant || {},
      administrativeContact: record.administrativeContact || {},
      technicalContact: record.technicalContact || {},
      createdDate: record.createdDate || '',
      updatedDate: record.updatedDate || '',
      expiresDate: record.expiresDate || '',
    };

    res.json({ status: true, domainInfo });

  } catch (error) {
    // console.error('WHOIS API error:', error.message);
    res.status(500).json({ status: false, error: 'Failed to fetch WHOIS data' });
  }
});

// Optional: GET all info
router.get('/api/info', (req, res) => {
  res.json(domainData);
});

module.exports = router;