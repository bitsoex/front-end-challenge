import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
} from "@angular/material";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { UserService } from "../../assets/utils/services/user.service";


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
    providers: [UserService]
})

export class LoginModule {}
