import { Component, ViewChild, OnInit } from "@angular/core";
import { SidenavService } from "../../assets/utils/services/sidenav.service";
import { MatSidenav } from "@angular/material";

@Component({
    selector: "sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"]
})

export class SidenavComponent implements OnInit {
    @ViewChild("sidenav") public sidenav: MatSidenav;

    constructor(private sidenavMngr: SidenavService) { }

    ngOnInit(): void {
        this.sidenavMngr.setSidenav(this.sidenav);
    }
}
