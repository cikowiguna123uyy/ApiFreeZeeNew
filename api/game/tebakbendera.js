const axios = require('axios');

module.exports = function (app) {
  app.get('/game/tebakbendera', async (req, res) => {
    try {
      const apiUrl = 'https://api.siputzx.my.id/api/games/tebakbendera';
      const response = await axios.get(apiUrl);

      res.json({
        status: true,
        game: 'Tebak Bendera',
        result: response.data.result // berisi { name: ..., flag: ... }
      });
    } catch (err) {
      res.status(500).json({
        status: true,
        message: 'coba kasih aku tebak tebakan',
        error: err.message
      });
    }
  });
};
