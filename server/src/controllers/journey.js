const { Journey, User } = require("../../models");
const { Op } = require("sequelize");

exports.addJourney = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.user.id;

    const newJourney = await Journey.create({
      ...body,
      userId,
      image: req.file.filename,
    });

    res.send({
      status: "success",
      data: { newJourney },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.findAll({
      attributes: {
        exclude: ["userId", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
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
      data: { journeys },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getJourney = async (req, res) => {
  const { id } = req.params;
  try {
    const journeys = await Journey.findOne({
      where: {
        id,
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
      data: { journeys },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getLastJourney = async (req, res) => {
  const { createdAt } = req.query;

  const DateStart = new Date(createdAt).setHours(0, 0, 0, 0);
  const DateEnd = new Date(createdAt).setHours(23, 59, 59, 999);

  try {
    const journeys = await Journey.findAll({
      where: {
        createdAt: {
          [Op.between]: [DateStart, DateEnd],
        },
      },
      order: [["createdAt", "DESC"]],
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
      data: { journeys },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getUserJourney = async (req, res) => {
  const userId = req.user.id;
  try {
    const journeys = await Journey.findAll({
      where: {
        userId,
      },
      order: [["createdAt", "DESC"]],
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
      data: { journeys },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateJourney = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const newJourney = {
      ...body,
      image: req.file.filename,
    };
    await Journey.update(newJourney, {
      where: {
        id,
      },
    });

    let journeys = await Journey.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["userId", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      journeys: { journeys },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};

exports.deleteJourney = async (req, res) => {
  try {
    const { id } = req.params;

    await Journey.destroy({
      where: {
        id,
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
