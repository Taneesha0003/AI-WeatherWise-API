const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateWeatherSummary = async (weatherData) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite"
    });

    const prompt = `
Give a simple and short weather summary based on this weather data:

City: ${weatherData.name}
Temperature: ${weatherData.main.temp}°C
Feels like: ${weatherData.main.feels_like}°C
Humidity: ${weatherData.main.humidity}%
Weather: ${weatherData.weather[0].description}

Explain the current weather in 2-3 simple sentences.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
};

const generateWeatherRecommendation = async (weatherData) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite"
  });

  const prompt = `
Give simple clothing and activity recommendations based on this weather:

City: ${weatherData.name}
Temperature: ${weatherData.main.temp}°C
Feels like: ${weatherData.main.feels_like}°C
Humidity: ${weatherData.main.humidity}%
Weather: ${weatherData.weather[0].description}

Give 2-3 short practical recommendations.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
    generateWeatherSummary,
    generateWeatherRecommendation
};