import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloWorld } from './hello-world.component';
import { HelloWorldCliComponent } from './hello-world-cli/hello-world-cli.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorld,
    HelloWorldCliComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
