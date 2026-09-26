const { getWeatherByCity } = require("../services/weatherService");

const getWeather = async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({
                message: "Please provide a city name"
            });
        }

        const weather = await getWeatherByCity(city);

        res.json(weather);

    } catch (error) {
        console.log(error.response?.data||
     error.message);
     
        res.status(500).json({
            message: "Unable to fetch weather data"
        });
    }
};

module.exports = {
    getWeather
};