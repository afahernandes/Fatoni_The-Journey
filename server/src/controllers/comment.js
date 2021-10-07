const { Journey, User, Comment } = require("../../models");

exports.addComment = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.user.id;

    const newComment = await Comment.create({
      ...body,
      userId,
    });

    res.send({
      status: "success",
      data: { newComment },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getComment = async (req, res) => {
  const { id } = req.params;
  try {
    const Comments = await Comment.findAll({
      where: {
        journeyId: id,
      },
      attributes: {
        exclude: ["userId", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "Users",
          attributes: ["id", "fullname", "email", "phone", "address"],
        },
      ],
    });

    res.send({
      status: "success",
      data: { Comments },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};
