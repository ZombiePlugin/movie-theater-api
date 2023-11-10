const express = require("express");
const showRouter = express.Router();
const { Show, User } = require("../models/index");
const { check, validationResult } = require("express-validator");

showRouter.use(express.json());
showRouter.use(express.urlencoded());

showRouter.get("/", async (req, res) => {
  const allShows = await Show.findAll();
  res.json(allShows);
});

showRouter.get("/:id", async (req, res) => {
  const foundShow = await Show.findByPk(req.params.id);
  res.json(foundShow);
});

showRouter.get("/genres/:genre", async (req, res) => {
  const foundShow = await Show.findOne({ where: { genre: req.params.genre } });
  res.json(foundShow);
});

// showRouter.post(
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

showRouter.put(
  "/:id/watched",
  [check("rating").isNumeric()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const showToUpdate = await Show.findOne({
        where: {
          id: req.params.id,
        },
      });
      const newRating = req.body.rating;
      await showToUpdate.update({ rating: newRating });
      const updatedMyShow = await Show.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.json(updatedMyShow);
    }
  }
);

showRouter.put(
  "/:id/updates",
  [check("available").isBoolean()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const showToUpdate = await Show.findOne({
        where: {
          id: req.params.id,
        },
      });
      const newStatus = req.body.available;
      await showToUpdate.update({ available: newStatus });
      const updatedMyShow = await Show.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.json(updatedMyShow);
    }
  }
);

showRouter.delete("/:id", async (req, res) => {
  const deletedShow = Show.destroy({ where: { id: req.params.id } });
  res.json(deletedShow);
});

module.exports = showRouter;
