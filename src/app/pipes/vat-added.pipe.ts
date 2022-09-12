import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {

  //value pipe in değiştirmeye çalıştığı değer.product.comp.htmlden gelen unitPrice değeri
  //rate ikinci paramtre
  transform(value: number, rate:number): number{ //dönüş tipi--->ikinci number
    return value+(value*rate)/100;
  }

}
