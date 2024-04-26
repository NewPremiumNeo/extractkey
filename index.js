import express from 'express'
import fetch from 'node-fetch';

const app = express()

async function findKey(url) {
    try {
        console.log("Finding Keys for ", url)
        url = `https://extractapi.xyz/drm.php?v=${url}`
        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Got Keys ", data.keys[0])
        return data.keys[0];
    } catch (error) {
        throw new Error('Error:', error);
    }
}

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/pw', async function (req, res) {
    const videoUrl = req.query.videourl;
    const data = await findKey(videoUrl);
    res.send(data)
})

// keyFinder.js


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});