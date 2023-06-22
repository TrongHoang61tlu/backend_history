import historiesService from "../services/historiesService";
let handleGetHistories = async (req, res) => {
    let id = req.query.id;
    if(!id) {
        return resizeBy.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter",
            users: [],
        });
    }
    let histories = await historiesService.getHistories(id);
    return response.status(200).json({
        errCode: 0,
        errMessage: "Ok",
        histories,
    });
};

let handleCreateHistories =  async(req, res) => {
    let message = await historiesService.createNewHistories(req.body);
    return response.status(200).json(message);
} 

module.exports = {
    handleGetHistories : handleGetHistories,
    handleCreateHistories : handleCreateHistories,
}