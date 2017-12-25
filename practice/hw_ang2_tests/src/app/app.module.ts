import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { InlineComponent } from './inline/inline.component';
import { NormalUsageComponent } from './normal-usage/normal-usage.component';
import { HappyService } from './services/happy.service';
import { HttpModule } from '@angular/http';
import { WithDependencyComponent } from './with-dependency/with-dependency.component';
import { WithServicePropertyComponent } from './with-service-property/with-service-property.component';
import { WithInputOutputComponent } from './with-input-output/with-input-output.component';
import { WithOverrideComponent } from './with-override/with-override.component';
import { WithRouteComponent } from './with-route/with-route.component';

@NgModule({
  declarations: [
    AppComponent,
    InlineComponent,
    NormalUsageComponent,
    WithDependencyComponent,
    WithServicePropertyComponent,
    WithInputOutputComponent,
    WithOverrideComponent,
    WithRouteComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'inline', component: InlineComponent },
      { path: 'normal', component: InlineComponent },
      { path: 'with-dependency', component: WithDependencyComponent },
      { path: 'with-input-output', component: WithInputOutputComponent },
      { path: 'with-override', component: WithOverrideComponent },
      { path: 'with-service-property', component: WithServicePropertyComponent },
    ])
  ],
  providers: [
    HappyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
