import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./error.component";

const routes: Routes = [
    { path: "", component: ErrorComponent, pathMatch: "full" }
];

@NgModule({
    declarations: [ErrorComponent],
    imports: [MatCardModule, RouterModule.forChild(routes)],
    providers: [],
    exports: [ErrorComponent]
})

export class ErrorModule {}
