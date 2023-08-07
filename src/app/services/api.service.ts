import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  
  getProducts(){
    return this.http.get<Product[]>("http://localhost:3000/product/getAll");
  }

  deleteProduct(id:string){
    return this.http.delete<Product>(`http://localhost:3000/product/delete/${id}`)
  }

  addProduct(product:Product){
    return this.http.post<Product>("http://localhost:3000/product/create",{
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      imgURL: product.imgURL,
    });
  }

  updateProduct(product:Product){
    return this.http.put<Product>(`http://localhost:3000/product/update/${product._id}`,{
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      imgURL: product.imgURL,
    });
  }
}
