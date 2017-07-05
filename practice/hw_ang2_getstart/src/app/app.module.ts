import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { WelcomeComponent } from './home/welcome.component';

import { ProductListComponent }  from './products/product-list.component';
/*import { ProductDetailGuard }  from './products/product-guard.service';*/
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductFilterPipe } from './products/product-filter.pipe';
import { StarComponent }  from './shared/star.component'; 

@NgModule({
  imports: [ // регистрация модулей ангуляра.
    //   Можно реакспортировать весь модуль если нужно ре- экспортировать их компоненты, директивы и пайпы.
    //  Можно ре экспортировать элемент без его импортирования перед этим
    // Импортируемым модулям доступны любые экспортируемые компоненты, директивы и пайпы из этого модуля
    // При импорте модуля импортировать дополнтельно его содержимое не нужно
    // Импортируемый модуль не дает доступ к модулям которые сам импортировал
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot([
          { path: 'products', component: ProductListComponent },
          { path: 'product/:id',
            // canActivate: [ ProductDetailGuard ],
            component: ProductDetailComponent },
          { path: 'welcome', component: WelcomeComponent },
          { path: '', redirectTo: 'welcome', pathMatch: 'full'},
          { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
      ])
  ],
  declarations: [ /*регистрация коспонентов пользователя. 
   - Декларация компонента, диретивы или пайпа может быть осуществлена только в одном модуле ангуляра. 
   - Декларируются ТОЛЬКО компонеты, дериктивы и пайпыю 
   -  Никогда не делать передекларацию компонетов, директив или пайпов принадлежащих другому модулю. 
   - Все задекларированные компонеты,директивы и пайпы по умолчанию приватны 
  и доступны только другим компонентам, директивам и пайпам из ЭТОГО ЖЕ модуля. 
   - При этом можно экспортировать любой компонент, директиву или пайп если другой компонент в них нуждается */
      AppComponent,
      WelcomeComponent,
      ProductListComponent,
      ProductDetailComponent,
      ProductFilterPipe,
      StarComponent
   ],
   //providers: [ ProductDetailGuard ], // регистрация сервисов. Сервисы никогда не экспортируются
   // Сервисы всегда регистрируются в рут модуле, т.е. в главном (app)
   //  Сервисы НЕ добавляются в провайдер шарящегося модуля(модуль который будет расшарен)
   // Routing guard должен быть добавлен в масив провайдера модуля ангуляра
   bootstrap: [ AppComponent ] // указываем что для запуска приложения используется AppComponent, бутстрап загрузка масива может быть использована только в рут модуле => AppModule
})
export class AppModule { }
