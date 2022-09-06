import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:44389/api/';

  constructor(private httpClient: HttpClient) {}

  getProducts():Observable<ListResponseModel<Product>> {
    let newPath=this.apiUrl+"Products/getall" //let yeni bir değişken oluşturur.çalıştığı fonksiyon bitene kadar hayata kalır
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

//Observable---->asenkron yapı
  getProductsByCategory(categoryId:number):Observable<ListResponseModel<Product>> {
    let newPath=this.apiUrl+"products/getbycategory?categoryId="+categoryId 
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}
