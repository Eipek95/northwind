import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) {}
  //program çalıştığı an
  ngOnInit(): void {
    //linkte parametre varsa parametreli olanı getir yoksa bütün ürünleri getir
    this.activatedRoute.params.subscribe((params) => {
      //params dictionary gibi çalışır.categoryId karşılık gelen neyse onu verir
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProduct();
      }
    });
  }

  //Observable olduğu için subscribe kullanılır
  getProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }

  addToCart(product: Product) {
   this.toastrService.success("Sepete Eklendi",product.productName);
  }
}
