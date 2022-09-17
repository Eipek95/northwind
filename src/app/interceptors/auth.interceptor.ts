import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
//request->istek 
//next->istek gelince istek içine header koyarsak bütün httpisteklerin içine auth headeri koymuş oluruz
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let catchToken=localStorage.getItem("token");
    let newRequest:HttpRequest<any>;
    newRequest=request.clone({//kullanıcın yaptığı isteği kopyala
      //authorization,bearer --->postman 
      headers:request.headers.set("Authorization","Bearer "+catchToken)//kopyaladığı request içine token ekliyor
    })
    return next.handle(newRequest);//tokenle beraber isteği sunucuya gönderiyor
  }
  //auth devreye girebilmesi için app module git provider  {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true} ekle
}
