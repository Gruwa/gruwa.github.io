import { Component } from '@angular/core'; /*импорт исполльзуемого компонента из ангуляра, т.е. Component*/

@Component ({ /* Описание компонента. Содержит логику контролера интерфейса к которому мы обратилисью 
    Например на веб странице компонентами выступают Header, SideBar, Content, Footer*/
    selector: 'pm-app', /*Элемент который стоит искать ангуляру в штмл*/
    template: `
        <div>
            <nav class='navbar navbar-default'>
                <div class='container-fluid'>
                    <a class='navbar-brand'>{{pageTitle}}</a>
                    <ul class='nav navbar-nav'>
                        <li><a [routerLink]="['/welcome']">Home</a></li>
                        <li><a [routerLink]="['/products']">Product List</a></li>
                    </ul>
                </div>
            </nav>
            <div class='container'>
                <router-outlet></router-outlet>
            </div>
        </div>
        `
})

export class AppComponent { /*Класс экспортируемый для использования его в другом месте*/
    pageTitle: string = `Acme Product Managment`;
}
