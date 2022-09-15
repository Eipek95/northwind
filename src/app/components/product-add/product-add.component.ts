import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      //model ile aynı isim
      productName: ['', Validators.required], //ilk değer productname default değer
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe((response) => {
        this.toastrService.success(response.message,'Başarılı');
      },repsonseError=>{

        if(repsonseError.error.Errors.length>0){
          console.log(repsonseError.error.Errors);
          for(let i=0;i<repsonseError.error.Errors.length;i++){
            this.toastrService.error(repsonseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
          }
        }
      });
    } else {
      this.toastrService.error('Forrmunuz Eksik', 'Dikkat');
    }
  }
}
