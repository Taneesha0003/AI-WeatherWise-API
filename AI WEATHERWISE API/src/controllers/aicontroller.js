const { generateWeatherSummary, generateWeatherRecommendation } = require("../services/geminiService");
const { getWeatherByCity } = require("../services/weatherService");

const getWeatherSummary = async (req, res) => {
    try {
        const city = req.body.city;

        if (!city) {
            return res.status(400).json({
                message: "Please provide a city name"
            });
        }

        const weather = await getWeatherByCity(city);

        const summary = await generateWeatherSummary(weather);

        res.json({
            city: weather.name,
            summary: summary
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Unable to generate weather summary"
        });
    }
};

const getWeatherRecommendation = async (req, res) => {
  try {
    const city = req.body.city;

    if (!city) {
      return res.status(400).json({
        message: "Please provide a city name"
      });
    }

    const weather = await getWeatherByCity(city);

    const recommendation =
      await generateWeatherRecommendation(weather);

    res.json({
      city: weather.name,
      recommendation: recommendation
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Unable to generate weather recommendation"
    });
  }
};

module.exports = {
    getWeatherSummary,
    getWeatherRecommendation
};