import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductState } from 'src/app/ngrx/states/product.state';
import { ApiService } from 'src/app/services/api.service';
import * as ProductActions from '../../../../../../ngrx/actions/product.actions';
import * as CartActions from '../../../../../../ngrx/actions/cart.actions';
import { CartState } from 'src/app/ngrx/states/cart.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  productList$: Observable<Product[]> = this.store.select('product','productList');
  constructor(private apiService: ApiService, private store:Store<{product:ProductState,cart:CartState}>) {
    this.store.dispatch(ProductActions.getProduct());
    this.productList$.subscribe((product)=>{
      console.log(product)
    });
   }
    addProductToCart(product:Product){
    this.store.dispatch(CartActions.addProductToCart({product}));
   }
}


// this.productList = this.productList.map((item)=>{
//   if(item.id==product.id){
//     return {
//       ...item,
//       quantity: item.quantity+1,
//       stock: item.stock-1,
//     };
//   }
//   return item;
// });