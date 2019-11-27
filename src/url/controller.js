const Url = require("./model");

const postUrl = async (req, res) => {
  const { url } = req.body;

  // 1. check if url exists
  try {
    const obj = await Url.findOne({ url }).exec();

    if (obj) {
      res.json({
        url: obj.url,
        short_url: obj.short_url
      });
    }
  } catch (err) {
    if (err) console.log(err);

    // If don't exists, create it
    createUrl(req, res);
  }
};

const createUrl = async (req, res) => {
  const { url } = req.body;
  try {
    const obj = await Url.create({ url });
    res.json({
      url: obj.url,
      short_url: obj.short_url
    });
  } catch (err) {
    if (err) console.log(err);
    res.json({ err: "I can't create url" });
  }
};

module.exports = {
  postUrl,
  createUrl
};
