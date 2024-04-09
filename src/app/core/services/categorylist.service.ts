import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferDTO } from "../interfaces/offer.dto";
import {environment} from "../../../environments/environment.dev";
import {TokenStorageService} from "./token-storage.service";
import {WishDTO} from "../interfaces/wish.dto";
import {ExchangeDTO} from "../interfaces/exchangeDTO";

@Injectable({
  providedIn: 'root'
})
export class CategorylistService {
  private OfferUrl = environment.BASE_URL+'/offer-list';
  private WIshUrl = environment.BASE_URL+'/wish-list';

  private ExchangesUrl = environment.BASE_URL+'/exchanges';

  constructor(private http: HttpClient,
  private TokenStorage: TokenStorageService) {
  }

  getOffer(): Observable<OfferDTO[]> {
    return this.http.get<OfferDTO[]>(this.OfferUrl, {headers: this.TokenStorage.getAuthHeader()});
  }
  getWish(): Observable<WishDTO[]> {
    return this.http.get<WishDTO[]>(this.WIshUrl, {headers: this.TokenStorage.getAuthHeader()});
  }
  getExchanges(): Observable<ExchangeDTO[]> {
    return this.http.get<ExchangeDTO[]>(this.ExchangesUrl, {headers: this.TokenStorage.getAuthHeader()});
  }
}

