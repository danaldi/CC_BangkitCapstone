const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8080';
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({ success: true, data: "hello world"});
});

app.post('/api/predict', (req, res) => {
    const { data } = req.body;
    filename = data.filename;
    b64_img_data = data.b64_img_data;

    axios.post(`${ML_API_URL}/predict`, {
        data :{
            filename: filename,
            b64_img_data: b64_img_data
        }
      })
      .then(function (response) {
        res.status(200).json({success: true, data: response.data});
      })
      .catch(function (error) {
        res.status(500).json({success: false, data: error});
    });
})

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));