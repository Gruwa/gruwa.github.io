import { Directive, Input } from '@angular/core';

@Directive({ 
    selector: '[form]'
 })

export class WhileDirective {
    
   constructor() 
   { }
    
   @Input() set while(condition: boolean) {
       if (condition) {
            console.log('AAAAAAAAAAAAA');
            
       }
   }
}