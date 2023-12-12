import { Request, Response } from "express";
import Medicine from "../database/schemas/RegisterMedicine";

class RegisterMedicineController {
  async find(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const medicines = await Medicine.find({ user: userId });
      return response.json(medicines);
    } catch (error) {
      return response.status(404).send({
        error: "Select failed",
        message: error,
      });
    }
  }

  async create(request: Request, response: Response) {
    const { userId } = request.params;
    const { name, dose, motivo, data, indicacao } = request.body;

    try {
      // const registrationExists = await Medicine.findOne({
      //   name,
      //   dose,
      //   motivo,
      //   data,
      //   indicacao,
      // });

      // if (registrationExists) {
      //   return response.status(400).json({
      //     error: "Ooops",
      //     message: "Medicine registration already exists",
      //   });
      // }

      const medicine = await Medicine.create({
        name,
        dose,
        motivo,
        data,
        indicacao,
        user: userId,
      });

      return response.json(medicine);
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
      const idExists = await Medicine.findOne({ _id });

      if (!idExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "The register not exists",
        });
      }

      const medicine = await Medicine.deleteOne({ _id });
      return response.json({ medicine });
    } catch (error) {
      return response.status(400).send({
        error: "Delete failed",
        message: error,
      });
    }
  }

  async update(request: Request, response: Response) {
    // const { name, dose, motivo, data, indicacao } = request.body;
    const { name, dose, motivo, data } = request.body;
    const { _id } = request.params;

    try {
      const medicineExists = await Medicine.findOne({ _id });

      if (!medicineExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Medicine Register not exists",
        });
      }

      const registrationExists = await Medicine.findOne({
        name,
        dose,
        motivo,
        data,
        //indicacao,
      });

      if (registrationExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Medicine registration already exists",
        });
      }

      const medicine = await Medicine.findOneAndUpdate(
        { _id },
        {
          name,
          dose,
          motivo,
          data,
          //indicacao,
        }
      );

      return response.json(medicine);
    } catch (error) {
      return response.status(400).send({
        error: "Update failed",
        message: error,
      });
    }
  }

  async findEstatistic(request: Request, response: Response) {
    const { userId, dataInicio, dataFinal } = request.params;
    try {
      const medicines = await Medicine.find({
        user: userId,
        data: {
          $gte: dataInicio,
          $lte: dataFinal,
        },
      });

      let remedios = medicines.map((remedios) => remedios.name);
      remedios = remedios.sort();

      let count: number = 0;
      let aux = remedios[0];
      let objetos: { nome: string; qnt: number }[] = [];

      remedios.forEach((nome, i) => {
        if (aux == nome) {
          count++;
          //i++;
          if (i == remedios.length - 1) {
            let obj = { nome: aux, qnt: count };
            objetos.push(obj);
          }
        } else {
          let obj = { nome: aux, qnt: count };
          objetos.push(obj);
          aux = nome;
          count = 1;
          if (i >= remedios.length - 1) {
            let obj = { nome: aux, qnt: count };
            objetos.push(obj);
          }
        }
      });

      return response.json(objetos);
    } catch (error) {
      return response.status(404).send({
        error: "Select failed",
        message: error,
      });
    }
  }
}
export default new RegisterMedicineController();
