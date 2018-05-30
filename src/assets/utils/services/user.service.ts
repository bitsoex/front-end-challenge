import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "../DTO/user.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { ConstantsManager } from "../constants";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    // public createAccount(user: IUser): Observable<Response> {
    //     const authHeader = ConstantsManager.getAuthHeader("POST", ConstantsManager.ACCOUNTS, user);

    //     return this.http.post(
    //         ConstantsManager.ACCOUNTS,
    //         user,
    //         { headers: { "Authorization": authHeader, "Content-Type": "application/json"}
    //     })
    //     .map((res: Response) => res.json())
    //     .catch(this.handleError);
    // }

    private handleError(error: any) {
        return Observable.throw(error.json().error || "Server error");
    }
}
