import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material";

@Injectable()
export class SidenavService {
    private sidenav: MatSidenav;

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
        console.log(this.sidenav, "----------------");
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
    this.sidenav.toggle();
   }
}
