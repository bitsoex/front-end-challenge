import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FooterComponent } from "./footer.component";

@NgModule({
    declarations: [FooterComponent],
    imports: [FlexLayoutModule],
    exports: [FooterComponent],
    providers: []
})

export class FooterModule {}
