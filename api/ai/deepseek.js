const fetch = require('node-fetch');

module.exports = function(app) {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-0365d168a755400b8875870bce6b137b";

  async function Deepsek(teks) {
    try {
      const response = await fetch("https://chat.deepseek.com/text=${text}", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json"
          // Optional headers:
          // "HTTP-Referer": "",
          // "X-Title": ""
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: teks
            }
          ]
        })
      });

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid response from Deepseek API");
      }

      return data.choices[0].message.content.trim();

    } catch (err) {
      throw new Error("Failed to fetch from Deepseek API: " + err.message);
    }
  }

  app.get('/ai/deepseek', async (req, res) => {
    const { text, apikey } = req.query;

    if (!text) {
      return res.json({ status: false, error: 'Text is required' });
    }

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: 'Invalid or missing API key' });
    }

    try {
      const result = await Deepsek(text);
      res.status(200).json({
        status: true,
        result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
