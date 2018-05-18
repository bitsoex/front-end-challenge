import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [HeaderComponent],
    imports: [MatToolbarModule],
    providers: [],
    exports: [HeaderComponent]
})

export class HeaderModule {  }
