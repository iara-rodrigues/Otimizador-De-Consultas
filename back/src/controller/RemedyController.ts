import { Request, Response } from "express";
import Remedio from "../database/schemas/Remedio";

class RemedyController {
  async find(request: Request, response: Response) {
    try {
      const { userId } = request.params;

      const remedios = await Remedio.find({ user: userId });
      return response.json(remedios);
    } catch (error) {
      return response.status(404).send({
        error: "Select failed",
        message: error,
      });
    }
  }

  async create(request: Request, response: Response) {
    const { userId } = request.params;
    const { name } = request.body;

    try {
      const remedioExists = await Remedio.findOne({ name });

      // if (remedioExists) {
      //   return response.status(400).json({
      //     error: "Ooops",
      //     message: "Medicine already exists",
      //   });
      // }

      const remedio = await Remedio.create({ name, user: userId });

      return response.json(remedio);
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
      const remedioExists = await Remedio.findOne({ _id });

      if (!remedioExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "The remedy not exists",
        });
      }

      const remedio = await Remedio.deleteOne({ _id });
      return response.json({ _id });
    } catch (error) {
      return response.status(304).send({
        error: "Delete failed",
        message: error,
      });
    }
  }

  async update(request: Request, response: Response) {
    const { name } = request.body;
    const { _id } = request.params;

    try {
      const idExists = await Remedio.findOne({ _id });

      if (!idExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Medicine not exists",
        });
      }

      const medicineExists = await Remedio.findOne({ name });

      if (medicineExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Medicine already exists",
        });
      }

      const remedio = await Remedio.findOneAndUpdate({ _id }, { name });

      return response.json({ name });
    } catch (error) {
      return response.status(404).send({
        error: "Update failed",
        message: error,
      });
    }
  }
}

export default new RemedyController();
