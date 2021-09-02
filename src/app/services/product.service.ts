import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModule } from '../models/listResponseModule';
import { Product } from '../models/product';
import { ResponseModule } from '../models/responseModule';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = 'https://localhost:44330/api/';

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<ListResponseModule<Product>> {
    let newPath = this.apiUrl + "products/getall"
    return this.httpClient.get<ListResponseModule<Product>>(newPath);
  }

  getProductsByCategory(categoryId:number):Observable<ListResponseModule<Product>> {
    let newPath = this.apiUrl + "products/getbycategory?categoryId=" + categoryId
    return this.httpClient.get<ListResponseModule<Product>>(newPath);
  }

  add(product:Product):Observable<ResponseModule>{
    return this.httpClient.post<ResponseModule>(this.apiUrl+"products/add",product)
  }
}
