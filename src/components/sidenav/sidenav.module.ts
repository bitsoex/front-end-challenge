import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MatCheckboxModule, MatSidenavModule, MatFormFieldModule } from "@angular/material";
import { SidenavComponent } from "./sidenav.component";
import { CommonModule } from "@angular/common";
import { SidenavService } from "../../assets/utils/services/sidenav.service";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", loadChildren: "../login/login.module#LoginModule" },
    { path: "home", loadChildren: "../home/home.module#HomeModule" },
    { path: "notfound", loadChildren: "../error/error.module#ErrorModule"},
    { path: "**", redirectTo: "notfound", pathMatch: "full"}
];

@NgModule({
    declarations: [SidenavComponent],
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSidenavModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [SidenavService],
    exports: [SidenavComponent],
})

export class SidenavModule { }
