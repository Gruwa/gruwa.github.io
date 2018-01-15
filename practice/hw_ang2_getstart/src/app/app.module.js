"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var welcome_component_1 = require("./home/welcome.component");
var product_module_1 = require("./products/product.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            //   Можно реакспортировать весь модуль если нужно ре- экспортировать их компоненты, директивы и пайпы.
            //  Можно ре экспортировать элемент без его импортирования перед этим
            // Импортируемым модулям доступны любые экспортируемые компоненты, директивы и пайпы из этого модуля
            // При импорте модуля импортировать дополнтельно его содержимое не нужно
            // Импортируемый модуль не дает доступ к модулям которые сам импортировал
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot([
                { path: 'welcome', component: welcome_component_1.WelcomeComponent },
                { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
            ]),
            product_module_1.ProductModule
        ],
        declarations: [
            app_component_1.AppComponent,
            welcome_component_1.WelcomeComponent
        ],
        providers: [],
        // Сервисы всегда регистрируются в рут модуле, т.е. в главном (app)
        //  Сервисы НЕ добавляются в провайдер шарящегося модуля(модуль который будет расшарен)
        // Routing guard должен быть добавлен в маcсив провайдера модуля ангуляра
        bootstrap: [app_component_1.AppComponent] /*указываем что для запуска приложения используется AppComponent,
        бутстрап загрузка масива может быть использована только в рут модуле => AppModule*/
    })
], AppModule);
exports.AppModule = AppModule;
/*Основные составные части =>

    Модули => это набор компонентов, директив, сервисов, пайпов объединенных в один большой конгломират,
    позволяет достич модульности приложения ,

    Компоненты => говорит ангуляру,
        selector - как и где вьюхе отобразить наш шаблон,
        templateUrl - где находится наш шаблон,
        styleUrls - где находятся стили для нашего шаблона,
        а также можем указывать инпуты и оутпуты нашего компонента и др

    директивы => тот же компонент только без шаблона, используется для изменения поведения
    одного или нескольких ДОМ элементов,

    сервисы => тут хранится стейт (состояние) и логика по изменению стейта (состояния), модельки приложения,

    пайпы => трансформер, котрый принимает некое знячение и выдает строку,
    которую ангуляр будет биндить в ДОМ элемент, используется для изменение данных
     для отображения темплейта(шаблона)

Синтаксис template (шаблонов) =>
    {{}} - интерполяция (вывод значения переменной),

    [] - биндинг свойства (прокидывание данных внутрь компонента),

    () - биндинг евента (события, т.е. оутпут),

    # - объявление переменной,

    * - для структурных директив (директивы которые меняют шаблон),
    
    [()] - реализация двухстороннего биндинга, изменение как из дом элемента со стороны пользователя
    так и из серверной части приходят значения

@Decorator  => декорировать можно классы, свойства и переменные

NgModule metadata =>

- Bootstrap массив => это стартап компоненты
- Declaration => Декларационный массив, это элементы котрые принадлежат этому модулю
- Exports => Экспортируемый массив, это импортируемые модули, которые можно использовать
- Imports => Импортируемый массив, это поддерживаемые модули в которых нуждается модуль
- Providers => Провайдер массив, это сервисные провадеры, эти сервисы могут быть
подключены к любому классу в приложении
*/
//# sourceMappingURL=app.module.js.map