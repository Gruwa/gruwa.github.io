import {Routes} from "@angular/router";
import {BodyComponent} from "./body/body.component";
import {RecipiesComponent} from "./recipies/recipies.component";

export const appRoutes:Routes = [
  { path: 'main', component: BodyComponent },
  { path: 'main/:id', component: RecipiesComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full'}
]
