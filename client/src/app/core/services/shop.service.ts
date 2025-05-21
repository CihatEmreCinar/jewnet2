import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { LogService } from '../../core/services/log.service'; // doğru yolda olduğundan emin ol

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  private logger = inject(LogService);

  types: string[] = [];
  brands: string[] = [];

  getProducts(brands?:string[],types?:string[],sort?:string) {
    let params = new HttpParams();
    if(brands && brands.length>0)
    {
      params=params.append('brands', brands.join(',')); 
    }

    if(types && types.length>0)
    {
      params=params.append('types', types.join(',')); 
    }

    if(sort)
    {
      params=params.append('sort', sort); 
    }
    params=params.append('pageSize',20);
    this.logger.log('Ürünler API çağrısı başlatıldı');
    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', {params});
  }

  getBrands() {
    if (this.brands.length > 0) {
      this.logger.log('Markalar önceden yüklendi, API çağrısı atlanıyor', this.brands);
      return;
    }

    this.logger.log('Markalar API çağrısı başlatıldı');
    this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
      next: (response) => {
        this.brands = response;
        this.logger.log('Markalar başarıyla yüklendi', response);
      },
      error: (error) => {
        this.logger.error('Markalar yüklenirken hata oluştu', error);
      }
    });
  }

  getTypes() {
    if (this.types.length > 0) {
      this.logger.log('Tipler önceden yüklendi, API çağrısı atlanıyor', this.types);
      return;
    }

    this.logger.log('Tipler API çağrısı başlatıldı');
    this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
      next: (response) => {
        this.types = response;
        this.logger.log('Tipler başarıyla yüklendi', response);
      },
      error: (error) => {
        this.logger.error('Tipler yüklenirken hata oluştu', error);
      }
    });
  }
}
