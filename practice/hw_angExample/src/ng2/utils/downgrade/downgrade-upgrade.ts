import * as _ from 'lodash';
import {Input, Output, Directive, ElementRef, Inject, Injector} from '@angular/core';
import {downgradeComponent, UpgradeComponent} from '@angular/upgrade/static';

interface INg2ComponentOptions extends ng.IComponentOptions {
  selector: string;
}

export function downgradeComponents(ngModule: ng.IModule, components: any[]) {
  _.each(components, component => {
    const componentName = _.camelCase(component.__annotations__[0].selector);
    if (!componentName) {
      throw 'Can\'t get selector for downgrading component to ng1. Please, provide component name manually.';
    }
    ngModule.directive(componentName, downgradeComponent({component}));
  });
}

export function upgradeComponent(component: any) {
  const definition: INg2ComponentOptions = component.__componentDefinitionObject;

  if (!definition || !definition.selector) {
    throw '\'selector\' parameter in @Component annotation wasn\'t found';
  }

  const selector = definition.selector;
  const ng1Selector = _.camelCase(selector);

  const bindings = definition.bindings || {};

  class UpgradedComponent extends UpgradeComponent {
    constructor(
      @Inject(ElementRef) elementRef: ElementRef,
      @Inject(Injector) injector: Injector
    ) {
      super(ng1Selector, elementRef, injector);
    }
  }

  _.each(bindings, (binding, internalName) => {
    const bindingType = _.head(binding);
    const bindingName = _.trimStart(binding, '<@&');

    if (bindingType === '<' || bindingType === '@') {
      Input(bindingName)(UpgradedComponent.prototype, internalName);
    }
    if (bindingType === '&') {
      Output(bindingName)(UpgradedComponent.prototype, internalName);
    }
  });

  return Directive({selector})(UpgradedComponent);
}
