import { Component } from "@angular/core";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})

export class DashboardComponent {
    private data: any;
    constructor() {
        this.data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "BTC",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "#4bc0c0"
                },
                {
                    label: "XRP",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: "#565656"
                }
            ]
        };
    }
}
