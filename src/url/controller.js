const Url = require("./model");

const urlRegex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)

// Middleware

const checkIfNewExists = async (req, res, next) => {
  try {
    const obj = await Url.findOne({ url: req.body.url }).exec();
    if (obj) req.urlExists = obj
  } catch (err) {
    if (err) console.log(err);
  }
  next()
}


// Controllers

const postUrl = async (req, res) => {
  if (req.urlExists) {
    res.redirect(301, '/api/shorturl/' + req.urlExists._id)
  } else {
    createUrl(req, res);
  }
};

const createUrl = async (req, res) => {
  if (urlRegex.test(req.body.url)) {
    try {
      const obj = await Url.create({ url: req.body.url });
      res.json({ url: obj.url, short_url: obj._id });
    } catch (err) {
      if (err) console.log(err);
      res.json({ err: "I can't create url" });
    }
  } else {
    res.json({ "error":"invalid URL" })
  }
};

const getUrl = async (req, res) => {
  try {
    const obj = await Url.findById(req.params.short_url).exec();
    res.redirect(301, obj.url)
  } catch (err) {
    if (err) console.log(err);
    res.json({err, params: req.params})
  }
}

const getAll = async (req, res) => {
  try {
    const urls = await Url.find({}).exec();
    const allUrls = urls.map(url => ({url: url.url, short_url: url._id}))
    res.json({ allUrls });
  } catch (err) {
    if (err) console.log(err);
    res.json({err})
  }
}

module.exports = {
  postUrl,
  createUrl,
  getUrl,
  getAll,
  checkIfNewExists
};
