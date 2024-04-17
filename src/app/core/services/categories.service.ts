import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO} from "../interfaces/category.dto";
import { ExchangegoDTO} from "../interfaces/exchangego.dto";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = environment.BASE_URL

  constructor(private http: HttpClient,
              private TokenStorage: TokenStorageService) {

  }

  getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(this.apiUrl + "/category/tree");
  }

  getCategoryById(id: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(this.apiUrl, category);
  }

  updateCategory(id: number, category: ExchangegoDTO): Observable<ExchangegoDTO> {
    return this.http.put<ExchangegoDTO>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
