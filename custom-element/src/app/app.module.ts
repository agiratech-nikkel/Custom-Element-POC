
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomElementComponent } from './custom-element/custom-element.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA,Injector } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import { IMXDatepickerModule } from '@intermx/ui-platform/imx-datepicker';
import { IMXSliderModule } from '@intermx/ui-platform/imx-slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { IMXTableModule } from '@intermx/ui-platform/imx-table';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ImxD3Module } from '@intermx/ui-platform/imx-d3'
import * as d3 from "d3";
import { UIPlatformModule } from '@intermx/ui-platform';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { createCustomElement } from '@angular/elements';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomElementComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    IMXDatepickerModule,
    IMXSliderModule,
    MatSlideToggleModule,
    IMXTableModule,
    NgxSliderModule,
    ImxD3Module,
    UIPlatformModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  providers: [],
  schemas:[NO_ERRORS_SCHEMA,],
  // bootstrap: [AppComponent]
})
export class AppModule { 
  public constructor(private injector:Injector){}
  ngDoBootstrap(){
    const custom = createCustomElement(CustomElementComponent,{injector:this.injector})
    customElements.define('app-place-plan-report-v4', custom)
  }
}
