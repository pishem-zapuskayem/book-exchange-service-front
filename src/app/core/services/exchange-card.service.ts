import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO} from "../interfaces/category.dto";
import { ExchangegoDTO} from "../interfaces/exchangego.dto";
import {environment} from "../../../environments/environment.dev";
import {BookNoteResponseDTO} from "../interfaces/book-note-response.dto";
import {ExchangeInfoDTO} from "../interfaces/exchange-info.dto";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})

export class ExchangeCardService {
  private apiUrl = `${environment.BASE_URL}/exchanges/list/card?id=`; // замените на ваш URL
  private apiUrlCreate = `${environment.BASE_URL}/book/response/create`;

  constructor(private http: HttpClient,
              private TokenStorage:TokenStorageService,

  ) { }

  GetExchangeInfo(selectedCardData: number): Observable<ExchangeInfoDTO> {
    return this.http.get<ExchangeInfoDTO>(`${this.apiUrl}${selectedCardData}`,{headers: this.TokenStorage.getAuthHeader()});
  }
}


