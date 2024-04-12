import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO} from "../interfaces/category.dto";
import { ExchangegoDTO} from "../interfaces/exchangego.dto";
import {environment} from "../../../environments/environment.dev";
import {BookNoteResponseDTO} from "../interfaces/book-note-response.dto";
import {ExchangeInfoDTO} from "../interfaces/exchange-info.dto";
import {TokenStorageService} from "./token-storage.service";
import {AuthRequestDTO} from "../interfaces/auth-request.dto";
import {AuthResponseDTO} from "../interfaces/auth-response.dto";
import {ExchangeActiveDTO} from "../interfaces/exchange-active.dto";


@Injectable({
  providedIn: 'root'
})

export class ExchangeCardService {
  private apiUrl = `${environment.BASE_URL}/exchanges/list/card?id=`; // замените на ваш URL
  private apiUrlCreate = `${environment.BASE_URL}/book/response/create`;
  private EnterURL = environment.BASE_URL+'/exchanges/enter?exchangeId=';
  private ActiveExchangeURL = environment.BASE_URL+'/exchanges/active/card?id=';
  private TrackNumberURL = environment.BASE_URL+'/set-delivery-number?exchangeId=';
  private ReceivedBookURL = environment.BASE_URL+'/exchanges/mark-as-received?exchangeId=';
  constructor(private http: HttpClient,
              private TokenStorage:TokenStorageService,

  ) { }
  EnterExchanges(exchangeId:number): Observable<HttpResponse<any>> {
   return this.http.post(`${this.EnterURL}${exchangeId}`,null,{
      headers: this.TokenStorage.getAuthHeader(),
        observe: 'response'
    });
  }
  EnterTrackNumber(exchangeId:number, trackNumber:string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.TrackNumberURL}${exchangeId}`,trackNumber,{
      headers: this.TokenStorage.getAuthHeader(),
      observe: 'response'
    });
  }
  GetExchangeInfo(selectedCardData: number): Observable<ExchangeInfoDTO> {
    return this.http.get<ExchangeInfoDTO>(`${this.apiUrl}${selectedCardData}`,{headers: this.TokenStorage.getAuthHeader()});
  }

  GetActiveExchangeInfo(selectedCardData: number): Observable<ExchangeActiveDTO> {
    return this.http.get<ExchangeActiveDTO>(`${this.ActiveExchangeURL}${selectedCardData}`,{headers: this.TokenStorage.getAuthHeader()});
  }
  RecivedBook(exchangeId:number): Observable<HttpResponse<any>> {
    return this.http.post(`${this.ReceivedBookURL}${exchangeId}`, null,{
      headers: this.TokenStorage.getAuthHeader(),
      observe: 'response'
    });
  }
}




