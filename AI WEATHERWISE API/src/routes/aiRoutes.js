const express = require("express");

const { getWeatherSummary,getWeatherRecommendation } = require("../controllers/aiController");

const router = express.Router();

router.post("/weather-summary", getWeatherSummary);

router.post("/weather-recommendation", getWeatherRecommendation);

module.exports = router;