import { Component, ChangeDetectorRef } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { MatSidenav } from "@angular/material";
import { SidenavService } from "../../assets/utils/services/sidenav.service";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
    selector: "header-mat",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
    private mobileQuery: MediaQueryList;
    private isUsrLogged: Boolean = false;
    private _mobileQueryListener: () => void;

    constructor(
        private router: Router,
        private sidenavMngr: SidenavService,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.isUsrLogged = (val.urlAfterRedirects !== "/login" && val.urlAfterRedirects !== "/error");
            }
        });
    }

    private sidebarToggle() {
        this.sidenavMngr.toggle();
    }

    private navigateTo(where: String): void {
        this.router.navigate(["/" + where]);
    }
}
