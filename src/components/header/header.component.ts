import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: "header-mat",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
    private isUsrLogged: Boolean = false;

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                console.log(val.urlAfterRedirects);
                this.isUsrLogged = (val.urlAfterRedirects !== "/login" && val.urlAfterRedirects !== "/error");
            }
        });
    }
}
