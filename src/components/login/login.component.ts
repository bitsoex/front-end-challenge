import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../../assets/utils/DTO/user.interface";

@Component({
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ["./login.component.scss"]
})

export class LoginComponent {
    private user: IUser = {
        name: "John",
        email: "john.doe@gmail.com",
        password: "asd123",
        phone: 0,
        token: ""
    };
    constructor(private router: Router) { }

    private loginUser(): void {
        // this.userService.createAccount(this.user).subscribe(
        //     (response) => { console.log(response); },
        //     (error) => { console.log(error); }
        // );
        this.router.navigate(["/home"]);
    }
}
