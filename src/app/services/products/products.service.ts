import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';

export interface Product {
  id          : string
  description : string
  name        : string
  price       : number
  user        : string
}

export interface Products {
  products: Product[]
}

export interface NewProduct {
  description : string
  name        : string
  price       : number
}

export const REQUIRES_AUTH = new HttpContextToken<boolean>(() => false);

@Injectable({ providedIn: 'root' })

export class ProductsService {

  constructor(private http: HttpClient) { }

  public async getProducts(): Promise<Product[]>{
    const resp = await firstValueFrom(
      this.http.get<Products>(`${environment.baseUrl}/products`,{ 
        context: new HttpContext().set(REQUIRES_AUTH, true) }
      )
    );
    return resp.products
  }

  public async createProduct(createProduct: NewProduct): Promise<Product>{
    const resp = await firstValueFrom(
      this.http.post<Product>(`${environment.baseUrl}/products`, createProduct, { 
        context: new HttpContext().set(REQUIRES_AUTH, true) }
      )
    );
    return resp
  }

  public async updateProduct(options: { id: string, updateProduct: NewProduct, }): Promise<Product>{
    const { id, updateProduct } = options
    const resp = await firstValueFrom(
      this.http.put<Product>(`${environment.baseUrl}/products/${id}`, updateProduct, { 
        context: new HttpContext().set(REQUIRES_AUTH, true) }
      )
    );
    return resp
  }


  public async deleteProduct(productId: string): Promise<{ message: string }>{
    const resp = await firstValueFrom(
      this.http.delete<{ message: string }>(`${environment.baseUrl}/products/${productId}`, { 
        context: new HttpContext().set(REQUIRES_AUTH, true) }
      )
    );
    return resp
  }
}