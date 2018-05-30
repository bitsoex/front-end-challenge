import { NgModule } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatToolbarModule, MatIconModule } from "@angular/material";
import { HeaderComponent } from "./header.component";
import { SidenavService } from "../../assets/utils/services/sidenav.service";

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
    ],
    providers: [MediaMatcher, SidenavService],
    exports: [HeaderComponent]
})

export class HeaderModule {  }
