import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ["./login.component.scss"]
})

export class LoginComponent {
    private user: Object = {
        name: "John",
        email: "john.doe@gmail.com",
        pwd: "asd123"
    };
    constructor(private router: Router) { }

    private loginUser(): void {
        this.router.navigate(["/home"]);
    }
}
