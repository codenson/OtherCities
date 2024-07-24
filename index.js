/**
 * Importing Express
 */
import express from 'express';
/**
 * Importing Axios for Rest api usage .
 */
import axios from 'axios';
/**
 * Importing body parser to parse Json files. 
 */
import bodyParser from 'body-parser';

/**
 * Expressjs 
 */
const app = express();
/**
 * Middleware to set static folder. 
 */
app.use(express.static("public"));
/**
 * Middleware to parse JSON files. 
 */
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Initial city. 
 */
var city = "Arlington";
/**
 * Initial state. 
 */
var state = "Virginia";
/**
 * Initial country. 
 */
var country = "US";


/**
 * Homepage endpoint. uses free api key from openweathermap to fetch all the cities in their system mathcing user's city input. 
 * renders back to index.ejs to display the fetched data. 
 */
app.get('/', async (req, res) => {

    const apiKey = "aef62820cfe0f631cea893006f730d57";
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${apiKey}`;

    try {
        const response = await axios.get(URL);

        res.render("index.ejs", { content: response.data });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

/**
 * Post end point updates city, state and county with user's input and redirect back to the home pahe "/"
 */
app.post("/getCiyNames", (req, res) => {
    console.log("city name :::::::: " + req.body.cityName);
    city = req.body.cityName;
    state = req.body.stateName;
    country = req.body.coutryName;

    res.redirect("/");
});


/**
 * Server listning on post 3000. 
 */
app.listen(3000, () => {

    console.log("Listning on port 3000");
})