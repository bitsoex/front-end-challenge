import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { Routes, RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material";

const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full" }
];

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(routes), MatToolbarModule],
    providers: [],
    exports: [HomeComponent]
})

export class HomeModule {}
