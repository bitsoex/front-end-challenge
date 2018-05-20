import { NgModule } from "@angular/core";
import { ErrorComponent } from "./error.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "", component: ErrorComponent, pathMatch: "full" }
];

@NgModule({
    declarations: [ErrorComponent],
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [ErrorComponent]
})

export class ErrorModule {}
