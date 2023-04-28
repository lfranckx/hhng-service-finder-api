app.get('/stylistsAPI', async (req, res) => {
    const apiUrl = 'https://www.hairhasnogender.com/_functions/stylistsAPI';
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                ...req.headers,
                host: new URL(apiUrl).host,
            },
        });
        console.log('response headers...', response.headers);
        console.log('response data...', response.data);

        for (const [key, value] of Object.entries(response.headers)) {
            res.setHeader(key, value);
        }

        res.send(response.data);
    } catch (error) {
        console.log('catch error...', error);
        res.status(error.response.status).send(error.response.data);
    }
});  