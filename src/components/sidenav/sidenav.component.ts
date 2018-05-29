import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material";
import { SidenavService } from "../../assets/utils/services/sidenav.service";

@Component({
    selector: "sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"]
})

export class SidenavComponent implements OnInit, OnDestroy {
    @ViewChild("sidenav") public sidenav: MatSidenav;

    private mobileQuery: MediaQueryList;
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
    private _mobileQueryListener: () => void;

    constructor(
        private sidenavMngr: SidenavService,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        this.sidenavMngr.setSidenav(this.sidenav);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
