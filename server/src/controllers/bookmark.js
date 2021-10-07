const { Journey, User, Bookmark } = require("../../models");

exports.addBookmark = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.user.id;

    const newBookmark = await Bookmark.create({
      ...body,
      userId,
    });

    res.send({
      status: "success",
      data: { newBookmark },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll({
      attributes: {
        exclude: ["userId", "idJourney", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "Users",
          attributes: ["id", "fullname", "email", "phone", "address"],
        },
        {
          model: Journey,
          as: "Journeys",
          attributes: ["id", "title", "description", "image", "createdAt"],
        },
      ],
    });

    res.send({
      status: "success",
      data: { bookmarks },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getBookmark = async (req, res) => {
  const { id } = req.params;
  try {
    const bookmarks = await Bookmark.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["userId", "idJourney", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "Users",
          attributes: ["id", "fullname", "email", "phone", "address"],
        },
        {
          model: Journey,
          as: "Journeys",
          attributes: ["id", "title", "description", "image", "createdAt"],
        },
      ],
    });

    res.send({
      status: "success",
      data: { bookmarks },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getUserBookmark = async (req, res) => {
  const userId = req.user.id;
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        userId,
      },
      attributes: {
        exclude: ["userId", "idJourney", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "Users",
          attributes: ["id", "fullname", "email", "phone", "address"],
        },
        {
          model: Journey,
          as: "Journeys",
          attributes: ["id", "title", "description", "image", "createdAt"],
          include: {
            model: User,
            as: "Users",
            attributes: ["fullname"],
          },
        },
      ],
    });

    res.send({
      status: "success",
      data: { bookmarks },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getUser2 = async (req, res) => {
  const userId = req.user.id;
  const { idJourney } = req.params;
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        userId,
        idJourney,
      },
      attributes: {
        exclude: ["userId", "idJourney", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "Users",
          attributes: ["id", "fullname", "email", "phone", "address"],
        },
        {
          model: Journey,
          as: "Journeys",
          attributes: ["id", "title", "description", "image", "createdAt"],
        },
      ],
    });

    res.send({
      status: "success",
      data: { bookmarks },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.updateBookmark = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const newBookmark = {
      ...body,
    };
    await Bookmark.update(newBookmark, {
      where: {
        id,
      },
    });

    let bookmarks = await Bookmark.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["userId", "idJourney", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      bookmarks: { bookmarks },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const idJourney = req.params.id;
    const userId = req.user.id;
    console.log(idJourney, userId);
    await Bookmark.destroy({
      where: {
        userId,
        idJourney,
      },
    });

    res.send({
      status: "success",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      status: "Server Error",
    });
  }
};
