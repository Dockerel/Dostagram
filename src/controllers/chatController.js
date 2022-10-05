import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  const { _id } = req.session.loggedInUser;
  const { text } = req.body;
  const chatObject = await Chat.create({
    content: text,
    createdAt: new Date().toLocaleString(),
    owner: _id,
  });
  return res.sendStatus(201);
};
