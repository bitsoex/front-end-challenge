import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatIconModule, MatToolbarModule } from "@angular/material";
import { HeaderComponent } from "./header.component";
import { SidenavService } from "../../assets/utils/services/sidenav.service";

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
    ],
    providers: [SidenavService],
    exports: [HeaderComponent]
})

export class HeaderModule {  }
