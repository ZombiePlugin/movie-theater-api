const express = require("express");
const userRouter = express.Router();
const { Show, User } = require("../models/index");
const { check, validationResult } = require("express-validator");

userRouter.use(express.json());
userRouter.use(express.urlencoded());

userRouter.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

userRouter.get("/:id", async (req, res) => {
  const foundUser = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: Show,
  });
  res.json(foundUser);
});

// userRouter.post(
//   "/",
//   [check("name").not().isEmpty().trim()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.json({ error: errors.array() });
//     } else {
//       const newUser = await User.create(req.body);
//       res.json(newUser);
//     }
//   }
// );

userRouter.put("/:userid/shows/:showid", async (req, res) => {
  const userToUpdate = await User.findOne({
    where: {
      id: req.params.userid,
    },
    include: [{ model: Show }],
  });
  const show = await Show.findByPk(req.params.showid);
  await userToUpdate.addShow(show);
  const updatedMyUser = await User.findOne({
    where: {
      id: req.params.userid,
    },
    include: [{ model: Show }],
  });
  res.json(updatedMyUser);
});
// userRouter.delete("/:id", async (req, res) => {
//   const deleteduser = User.destroy({ where: { id: req.params.id } });
//   res.json(deleteduser);
// });

module.exports = userRouter;
