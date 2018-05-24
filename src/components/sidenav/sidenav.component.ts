import { Component, ViewChild, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { SidenavService } from "../../assets/utils/services/sidenav.service";

@Component({
    selector: "sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"]
})

export class SidenavComponent implements OnInit {
    @ViewChild("sidenav") public sidenav: MatSidenav;

    private data: Object = {
        labels: ["BTC", "XRP", "ETH", "LTC", "BCH"],
        datasets: [
            {
                data: [300, 50, 100, 20, 400],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#80FF63",
                    "#AF63FF"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#80FF63",
                    "#"
                ]
            }]
    };

    constructor(private sidenavMngr: SidenavService) { }

    ngOnInit(): void {
        this.sidenavMngr.setSidenav(this.sidenav);
    }
}
