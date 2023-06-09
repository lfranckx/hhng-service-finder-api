const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://lfranckx.github.io' }));

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

app.get('/stylistsAPI', async (req, res) => {
    const apiUrl = 'https://www.hairhasnogender.com/_functions/Service-Finder-Stylists';

    // Log the incoming request URL and headers
    console.log('Incoming request URL...', req.url);
    console.log('Incoming request headers...', req.headers);

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                ...req.headers,
                host: new URL(apiUrl).host,
            },
        });

        // Log the response status, headers, and data
        console.log('API response status...', response.status);
        console.log('API response headers...', response.headers);
        console.log('API response data...', response.data);

        for (const [key, value] of Object.entries(response.headers)) {
            res.setHeader(key, value);
        }

        res.send(response.data);
    } catch (error) {
        // Log the error details
        console.log('Catch Error message...', error.message);
        if (error.response) {
            console.log('Catch Error response status...', error.response.status);
            console.log('Catch Error response data...', error.response.data);
        } else {
            console.log('Catch Error...', error);
        }

        res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : 'Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));