import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangelistDto } from "../interfaces/exchangelist.dto";
import {environment} from "../../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class CategorylistService {
  private apiUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<ExchangelistDto[]> {
    return this.http.get<ExchangelistDto[]>(this.apiUrl);
  }
}
