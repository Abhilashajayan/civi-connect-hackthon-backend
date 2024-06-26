import { Request, Response } from "express";
import { UserUsecase } from "../../usecases/user.usercase";
import { Rabbitmq } from "../../frameworks/messageBroker/rabbitmq";

export class UserController {
  private readonly userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase, private RabbitmqService: Rabbitmq) {
    this.userUsecase = userUsecase;
  }

  async editUser(req: Request, res: Response) {
    try {
      const userId: string = req.params.userId;
      console.log(userId);
      const data:any = req.body;
      console.log(data);
      const dataUser = await this.userUsecase.editUser(userId, data, req);
      return res.status(200).json({ dataUser });
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }

  async adminSignin(req: Request, res: Response) {
    try {
      const data = req.body;
      const dataUser = await this.userUsecase.adminSignin(data);
      return res.status(200).json({ dataUser });
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }
}
