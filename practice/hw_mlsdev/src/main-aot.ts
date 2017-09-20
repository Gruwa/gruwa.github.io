import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from "@angular/platform-browser";
import { AppModule } from './app/app.module';
import { AppModuleAotFactory } from './app/app.module.aotfactory';

if (process.env.ENV === 'production') {
  enableProdMode();
}

console.log("******************You are in AOT prod mode******************");

platformBrowser().bootstrapModuleFactory(<any>AppModuleAotFactory).catch(error=>console.log(error));
