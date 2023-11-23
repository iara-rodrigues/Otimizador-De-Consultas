import { Request, Response } from "express";
import User from "../database/schemas/User";
import validator from "validator";

class UserController {
  async find(request: Request, response: Response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      return response.status(500).send({
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

      const user = await User.create({
        name,
        surname,
        email,
        password,
      });

      return response.json(user);
    } catch (error) {
      return response.status(500).send({
        error: "Registration failed",
        message: error,
      });
    }
  }

  async delete(request: Request, response: Response) {
    // const { email } = request.body;
    // try {
    //   const emailExists = await User.findOne({ email });

    //   if (!emailExists) {
    //     return response.status(400).json({
    //       error: "Ooops",
    //       message: "The email not exists",
    //     });
    //   }

    //   const user = await User.deleteOne({ email });
    //   return response.json({ email });
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
      return response.status(500).send({
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
      return response.status(500).send({
        error: "Update failed",
        message: error,
      });
    }
  }
}

export default new UserController();
