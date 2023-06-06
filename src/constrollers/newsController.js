import newsService from "../services/newsService";

let handleGetNews = async (req, res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode:1,
            errCodeMessage: "Missing required parameter",
            news: [],
        });
    }
    let news = await newsService.getNews(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: " OK",
        news,
    })
};

let handleCreateNews = async (req, res) => {
    let message = await newsService.createNews(req.body);
    return res.status(200).json(message);
}

let handleEditNews = async (req, res) => {
    let data = req.body;
    let message = await newsService.editNews(data);
    return res.status(200).json(message);
}

let handleDeleteNews = async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter",
        });
    }
    let message = await newsService.deleteNews(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleGetNews :handleGetNews,
    handleCreateNews :handleCreateNews,
    handleEditNews:handleEditNews,
    handleDeleteNews:handleDeleteNews,
}