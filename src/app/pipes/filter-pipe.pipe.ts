import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Product[], filterText:string): Product[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText
    ?
    value.filter((p:Product)=>p.productName.toLocaleLowerCase().indexOf(filterText)!==-1)//filtrede aranan kelime varsa listeye dönüştür deöndür değeri
    :value;//filtreli değer yoksa bütün listeyi olduğu gibi ver
  }

}