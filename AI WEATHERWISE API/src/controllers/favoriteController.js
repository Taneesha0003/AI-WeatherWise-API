const User = require("../models/userModel");

const addFavorite = async (req, res) => {
    try {
        const { city } = req.body;

        if (!city) {
            return res.status(400).json({
                message: "City name is required"
            });
        }

        const user = await User.findById(req.user.userId);

        if(user&&!user.favoriteCities){
            user.favoriteCities = [];
        }

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if(!user.favoriteCities){
            user.favoriteCities=[];
        }

        if (!user.favoriteCities.includes(city)) {
            user.favoriteCities.push(city);
            await user.save();
        }

        res.json({
            message: "City added to favorites",
            favoriteCities: user.favoriteCities
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to add favorite city"
        });
    }
};

const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            favoriteCities: user.favoriteCities
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to get favorite cities"
        });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { city } = req.params;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.favoriteCities = user.favoriteCities.filter(
            favoriteCity => favoriteCity.toLowerCase() !== city.toLowerCase()
        );

        await user.save();

        res.json({
            message: "City removed from favorites",
            favoriteCities: user.favoriteCities
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to remove favorite city"
        });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};