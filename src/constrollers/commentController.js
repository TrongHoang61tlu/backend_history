import commentService from "../services/commentService";

let handleGetComment =async (req, res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode : 1,
            errCodeMessage : "Misssing requested comment",
            video: [],
        });
    }
    let comment = await commentService.getComment(id);
    return res.status(200).json({
        errCode : 0,
        errMessage: "OK",
        comment,
    });
};
let handleCreateComment = async (req, res) => {
    let message = await commentService.createNewComment(req.body);
    console.log(message);
    return res.status(200).json(message);
  };

module.exports = {
    handleGetComment : handleGetComment,
    handleCreateComment : handleCreateComment,
}