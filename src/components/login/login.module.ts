import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
} from "@angular/material";
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
    { path: "", component: LoginComponent, pathMatch: "full" }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild(routes),
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule
    ],
    exports: [],
    providers: []
})

export class LoginModule {}
