const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
      order: [["id", "ASC"]],
    });
    res.status(200).json({
      message: `${req.method}: category data retrieved!`,
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
    }
    res.status(200).json({
      message: `${req.method}: category data retrieved!`,
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json({
      message: `${req.method}: new category added!`,
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: `${req.method}: category updated!`,
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
    }
    res.status(200).json({
      message: `${req.method}: category deleted!`,
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
