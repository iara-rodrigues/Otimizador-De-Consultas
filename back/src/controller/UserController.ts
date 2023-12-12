import { Request, Response } from "express";
import User from "../database/schemas/User";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

type JwtPayload = {
  id: number;
};

class UserController {
  async find(request: Request, response: Response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      return response.status(404).send({
        error: "Select failed",
        message: error,
      });
    }
  }

  async create(request: Request, response: Response) {
    const { name, surname, email, password } = request.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "User already exists",
        });
      }

      const emailIsValid = validator.isEmail(email);
      if (!emailIsValid) {
        return response.status(400).json({
          error: "Ooops",
          message: "Email is invalid",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        surname,
        email,
        password: hashPassword,
      });

      return response.json(user);
    } catch (error) {
      return response.status(400).send({
        error: "Registration failed",
        message: error,
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { _id } = request.params;
    try {
      const idExists = await User.findOne({ _id });

      if (!idExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "The id not exists",
        });
      }

      const user = await User.deleteOne({ _id });
      return response.json({ _id });
    } catch (error) {
      return response.status(304).send({
        error: "Delete failed",
        message: error,
      });
    }
  }

  async update(request: Request, response: Response) {
    const { name, surname, password } = request.body;
    const { _id } = request.params;

    try {
      //const userExists = await User.findOne({ email });

      // if (!userExists) {
      //   return response.status(400).json({
      //     error: "Ooops",
      //     message: "User already exists",
      //   });
      // }

      const user = await User.findOneAndUpdate(
        { _id },
        {
          name,
          surname,
          password,
        }
      );

      return response.json(user);
    } catch (error) {
      return response.status(400).send({
        error: "Update failed",
        message: error,
      });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).json({
        error: "Ooops",
        message: "Email ou Senha inválidos",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return response.status(400).json({
        error: "Ooops",
        message: "Email ou Senha inválidos",
      });
    }

    //const secretKey = "shduah689usfdjuom36ds";

    const token = jwt.sign({ id: user._id }, "shduah689usfdjuom36ds", {
      expiresIn: "8h",
    });

    // const { password: _, ...userLogin } = user;
    // return response.json({ user: userLogin, token: token });
    return response.json({ user, token: token });
  }

  async getProfile(request: Request, response: Response) {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({
        error: "Ooops",
        message: "Usuário não autorizado - Auth",
      });
    }

    console.log("\ntoken 1: ", authorization);
    const token = authorization.split(" ")[1];
    console.log("\ntoken 2: ", token);

    if (!token) {
      return response.status(401).json({
        error: "Ooops",
        message: "Usuário não autorizado - Token NULL",
      });
    }

    const { id } = jwt.verify(token, "shduah689usfdjuom36ds") as JwtPayload;

    console.log(jwt.verify(token, "shduah689usfdjuom36ds") as JwtPayload);

    console.log(jwt.decode);

    console.log("\nid: ", id);

    const user = await User.findOne({ _id: id });
    console.log("\nUser: ", user);
    if (!user) {
      return response.status(401).json({
        error: "Ooops",
        message: "Usuário não autorizado",
      });
    }

    // console.log("\nUser antes da desestruturação:", user);

    // const { password = "", ...userProfile } = user;

    // console.log("\nUser depois da desestruturação:", userProfile);

    //return response.json(userProfile);
    return response.json(user);
  }
}

export default new UserController();
