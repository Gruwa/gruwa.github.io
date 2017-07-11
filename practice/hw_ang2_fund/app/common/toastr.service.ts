//пример подключения внешнего приложения во внутрь ангуляра в данном случае toastr

import { Injectable } from '@angular/core';

declare let toastr:any; //декларация внешней переменнойб которая
//  в данном случае пришла от внешнего приложения toastr, это надо сделать, 
// что бы компилятор tyoeScript не волновался о переменной toastr

@Injectable()

export class ToastrService {
    //описание всех методов приложения toastr  внутри ангуляра,
    // т.е. мы внедрили в ToastrService  методы toastr 
    success(message: string, title?: string) {
        toastr.success(message, title);
    }
    info(message: string, title?: string) {
        toastr.info(message, title);
    }
    warning(message: string, title?: string) {
        toastr.warning(message, title);
    }
    error(message: string, title?: string) {
        toastr.error(message, title);
    }
}