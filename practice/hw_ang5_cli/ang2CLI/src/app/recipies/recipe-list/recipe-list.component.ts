import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  recipe: any;

    constructor(private route:ActivatedRoute,
                private appService: AppService) {}

    ngOnInit() {
      this.recipe = this.appService.getId(+this.route.snapshot.params['id']);
    }
}
