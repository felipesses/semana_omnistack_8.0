const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, res) {
        const { user } = req.headers;

        const loggedUser = await Dev.findById(user);

        const users = await Dev.find({ // todos os usuarios 
            $and: [
                { _id: { $ne: user } }, // que o id não seja igual que tal id
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.dislikes } },
            ],
        });

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username }); // retornar se usuario existe

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar: avatar
        });

        return res.json(dev);

    }
};

// MÉTODOS DO CONTROLLER: 

// INDEX, SHOW, STORE, UPDATE, DELETE