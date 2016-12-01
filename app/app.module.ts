import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { HttpModule }           from '@angular/http';
import { MaterialModule }       from '@angular/material';

//File containing necessary rxjs extensions
import './rxjs-extensions';
import 'hammerjs';

// COMPONENTS
import { AppComponent }       from './app.component';
import { PipeCalcComponent }  from './components/pipecalc.component'

// PIPES
import { LabledPipe }   from './pipes/labled.pipe';


@NgModule({
  imports:      [ BrowserModule, HttpModule, MaterialModule.forRoot() ],
  declarations: [ AppComponent, PipeCalcComponent, LabledPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
