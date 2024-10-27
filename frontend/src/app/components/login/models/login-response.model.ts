import { UserModel } from "./user.model";

export class loginResponseModel{
    token: string = "";
    user: UserModel = new UserModel();
}