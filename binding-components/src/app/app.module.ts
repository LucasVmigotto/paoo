import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloAngularComponent } from './hello-angular/hello-angular.component';
import { HelloAngularCliComponent } from './hello-angular-cli/hello-angular-cli.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloAngularComponent,
    HelloAngularCliComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
