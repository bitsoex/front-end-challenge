import { Injectable } from "@angular/core";
import { IUser } from "../DTO/user.interface";

@Injectable()
export class UserService {
    private user: IUser = null;
    constructor(incomingUser: IUser) {}
}
