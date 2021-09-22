const { User } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(6).required(),
    address: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  const emailDuplicate = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (emailDuplicate) {
    res.status(500).send({
      status: "failed",
      message: "Email Duplicate",
    });
    return false;
  }

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
    
    });

    const token = jwt.sign({ id: User.id }, process.env.JWT_PRIVATE_KEY);
    console.log("Token", token);
    res.status(200).send({
      status: "success...",
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!userExist) {
			return res.status(400).json({
				status: 'failed',
				message: 'Your email or password is invalid',
			});
		}
    const isValid = await bcrypt.compare(req.body.password, userExist.password);
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      });
    }
  
    const payload = { id: userExist.id };
		let token = null;
	
			token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
				expiresIn: '24h',
			});
		
    res.status(200).send({
      status: "success...",
      data: {
        fullname: userExist.fullname,
        email: userExist.email,
        phone: userExist.phone,
        address: userExist.address,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;
    const token = req.user;
    console.log(req.user)

    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }
    
    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          email: dataUser.email,
          phone: dataUser.phone,
          address: dataUser.address,
          token :token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};