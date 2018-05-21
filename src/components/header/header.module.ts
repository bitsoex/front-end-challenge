import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule, MatToolbarModule } from "@angular/material";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, MatIconModule, MatToolbarModule],
    providers: [],
    exports: [HeaderComponent]
})

export class HeaderModule {  }
