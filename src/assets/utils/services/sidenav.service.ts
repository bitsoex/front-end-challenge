import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material";

@Injectable()
export class SidenavService {
    private sidenav: MatSidenav;

    public setSidenav(sidenav: MatSidenav): void {
        this.sidenav = sidenav;
    }

    public open(): any {
        return this.sidenav.open();
    }


    public close(): any {
        return this.sidenav.close();
    }

    public toggle(): void {
        this.sidenav.toggle();
    }
}
