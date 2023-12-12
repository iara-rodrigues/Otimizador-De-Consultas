import { Request, Response } from "express";
import Dor from "../database/schemas/Dor";

class DorController {
  async find(request: Request, response: Response) {
    try {
      const { userId } = request.params;

      const dores = await Dor.find({ user: userId });

      return response.json(dores);
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
      const dorExists = await Dor.findOne({ name });

      // if (dorExists) {
      //   return response.status(400).json({
      //     error: "Ooops",
      //     message: "Pain already exists",
      //   });
      // }

      const dor = await Dor.create({ name, user: userId });

      return response.json(dor);
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
      const dorExists = await Dor.findOne({ _id });

      if (!dorExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "The pain not exists",
        });
      }

      const dor = await Dor.deleteOne({ _id });
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
      const idExists = await Dor.findOne({ _id });

      if (!idExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Pain not exists",
        });
      }

      const dorExists = await Dor.findOne({ name });

      if (dorExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Pain already exists",
        });
      }

      const dor = await Dor.findOneAndUpdate({ _id }, { name });

      return response.json({ name });
    } catch (error) {
      return response.status(404).send({
        error: "Update failed",
        message: error,
      });
    }
  }
}

export default new DorController();
