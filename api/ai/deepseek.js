const fetch = require('node-fetch');

  async function Deepsek(teks) {
    try {
      const response = await fetch("https://api.siputzx.my.id/get/documentation#/AI/get_api_ai_deepseek_llm_67b_chat", {
        method: "POST",
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
    const { text } = req.query;

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
