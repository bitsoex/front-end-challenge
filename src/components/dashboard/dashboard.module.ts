import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { ChartModule } from "primeng/chart";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
    { path: "", component: DashboardComponent, pathMatch: "full"}
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [ChartModule, MatCardModule, RouterModule.forChild(routes)],
    providers: [],
    exports: [DashboardComponent]
})

export class DashboardModule { }
