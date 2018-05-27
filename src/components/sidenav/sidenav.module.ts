import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";
import { MatDividerModule, MatSidenavModule, MatListModule } from "@angular/material";
import { ChartModule } from "primeng/chart";
import { SidenavComponent } from "./sidenav.component";
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
        ChartModule,
        CommonModule,
        FlexLayoutModule,
        MatDividerModule,
        MatListModule,
        MatSidenavModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [SidenavService],
    exports: [SidenavComponent],
})

export class SidenavModule { }
