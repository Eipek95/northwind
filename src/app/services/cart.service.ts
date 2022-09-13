import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product) {
    let item = CartItems.find((c) => c.product.productId === product.productId);

    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      CartItems.push(cartItem); //add array
    }
  }

  removeFromCart(product:Product){
    let item = CartItems.find((c) => c.product.productId === product.productId);//ürün sepette var mı yok mu
    CartItems.splice(CartItems.indexOf(item),1);//itemin indeksini bulup ondan itibaren 1 tane siler.tsconfig strictNullChecks false yap
  }
  list(): CartItem[] {
    return CartItems;
  }
}
