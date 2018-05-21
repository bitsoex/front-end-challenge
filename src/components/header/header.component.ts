import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { MatSidenav } from "@angular/material";
import { SidenavService } from "../../assets/utils/services/sidenav.service";

@Component({
    selector: "header-mat",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
    private isUsrLogged: Boolean = false;

    constructor(private router: Router, private sidenavMngr: SidenavService) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                console.log(val.urlAfterRedirects);
                this.isUsrLogged = (val.urlAfterRedirects !== "/login" && val.urlAfterRedirects !== "/error");
            }
        });
    }

    private sidebarToggle() {
        // console.log(this.sidebar);
        // this.sidebar.toggle();
        this.sidenavMngr.toggle();
    }
}
