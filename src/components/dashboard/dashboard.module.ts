import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "", component: DashboardComponent, pathMatch: "full"}
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [DashboardComponent]
})

export class DashboardModule { }
