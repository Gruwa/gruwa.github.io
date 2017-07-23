import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

// enableProdMode(); //переход в продакшен режим
platformBrowserDynamic().bootstrapModule(AppModule);