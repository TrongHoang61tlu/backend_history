import quizzService from "../services/quizzService";

let handleGetQuizz =  async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errCodeMessage: "Missing required parameter",
        quizz: [],
      });
    }
    let quizz = await quizzService.getQuizz(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: " OK",
      quizz,
    });
  };

let handleCreateQuizz = async (req, res) => {
    let message = await quizzService.createNewQuizz(req.body);
    console.log(message);
    return res.status(200).json(message);
  };

let handleEditQuizz = async (req, res) => {
    let data = req.body;
    let message = await quizzService.updateQuizz(data);
    return res.status(200).json(message);
  };

let handleDeleteQuizz = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await quizzService.deleteQuizz(req.body.id);
  return res.status(200).json(message);
};


module.exports = {
    handleGetQuizz : handleGetQuizz,
    handleCreateQuizz :handleCreateQuizz,
    handleEditQuizz :handleEditQuizz,
    handleDeleteQuizz:handleDeleteQuizz,
}