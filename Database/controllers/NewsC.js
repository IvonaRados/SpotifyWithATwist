const News = require("../Models/News")


async function getAllNews(req, res) {
  try {
    const result = await News.find();
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
}
async function createNews(req, res) {
  try {
    const news = News(req.body);
    await news.save();
    res.status(201).send("Uspijesno dodano");
  } catch (error) {
    res.status(404).send(error);
  }
}
async function deleteNews(req, res) {
  try {
    News.findByIdAndDelete(req.params.id, (err) =>{
      if(err){
          console.log(err);
      }
   });
    res.status(201).send("Uspijesno izbrisano");
  } catch (error) {
    res.status(404).send(error);
  }
}


async function editNewsActivate(req, res) {
  try {
    const flag = req.body;
    const news = await News.findByIdAndUpdate(req.params.id ,{flag: flag.flag});
    res.json(news);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = { getAllNews, createNews, deleteNews, editNewsActivate };
