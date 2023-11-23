import { Request, Response } from "express";
import Dor from "../database/schemas/RegisterPain";

class RegistrarDorController {
  async find(request: Request, response: Response) {
    try {
      const dores = await Dor.find();
      return response.json(dores);
    } catch (error) {
      return response.status(500).send({
        error: "Select failed",
        message: error,
      });
    }
  }

  async create(request: Request, response: Response) {
    const { name, desc, data } = request.body;

    try {
      const registrationExists = await Dor.findOne({
        name,
        desc,
        data,
      });

      if (registrationExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Pain registration already exists",
        });
      }

      const dor = await Dor.create({
        name,
        desc,
        data,
      });

      return response.json(dor);
    } catch (error) {
      return response.status(500).send({
        error: "Registration failed",
        message: error,
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { _id } = request.params;
    try {
      const idExists = await Dor.findOne({ _id });

      if (!idExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "The register not exists",
        });
      }

      const dor = await Dor.deleteOne({ _id });
      return response.json({ dor });
    } catch (error) {
      return response.status(500).send({
        error: "Delete failed",
        message: error,
      });
    }
  }

  async update(request: Request, response: Response) {
    const { name, desc, data } = request.body;
    const { _id } = request.params;

    try {
      const idExists = await Dor.findOne({ _id });

      if (!idExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Medicine Register not exists",
        });
      }

      const registrationExists = await Dor.findOne({
        name,
        desc,
        data,
      });

      if (registrationExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Pain registration already exists",
        });
      }

      const dor = await Dor.findOneAndUpdate(
        { _id },
        {
          _id,
          name,
          desc,
          data,
        }
      );

      return response.json(dor);
    } catch (error) {
      return response.status(500).send({
        error: "Update failed",
        message: error,
      });
    }
  }

  async findEstatistic(request: Request, response: Response) {
    const { dataInicio, dataFinal } = request.params;
    try {
      const pain = await Dor.find({
        data: {
          $gte: dataInicio,
          $lte: dataFinal,
        },
      });

      let dores = pain.map((dores) => dores.name);
      dores = dores.sort();

      let count: number = 0;
      let aux = dores[0];
      let objetos: { nome: string; qnt: number }[] = [];

      dores.forEach((nome, i) => {
        if (aux == nome) {
          count++;
          if (i == dores.length - 1) {
            let obj = { nome: aux, qnt: count };
            objetos.push(obj);
          }
        } else {
          let obj = { nome: aux, qnt: count };
          objetos.push(obj);
          aux = nome;
          count = 1;
          if (i >= dores.length - 1) {
            let obj = { nome: aux, qnt: count };
            objetos.push(obj);
          }
        }
      });

      return response.json(objetos);
    } catch (error) {
      return response.status(500).send({
        error: "Select failed",
        message: error,
      });
    }
  }
}

export default new RegistrarDorController();
