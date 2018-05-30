import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

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
