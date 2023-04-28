const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://lfranckx.github.io' }));

app.get('/stylistsAPI', async (req, res) => {
    const apiUrl = 'https://www.hairhasnogender.com/_functions/stylistsAPI';
    try {
        const response = await axios.get(apiUrl, {
        headers: req.headers,
        });
        console.log('response headers...', response.headers);
        console.log('response data...', response.data);
        res.set(response.headers);
        res.send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));
