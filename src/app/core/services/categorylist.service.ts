import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferDTO } from "../interfaces/offer.dto";
import {environment} from "../../../environments/environment.dev";
import {TokenStorageService} from "./token-storage.service";
import {WishDTO} from "../interfaces/wish.dto";
import {ExchangeDto} from "../interfaces/exchange.dto";
import {ExchangeActiveDTO} from "../interfaces/exchange-active.dto";

@Injectable({
  providedIn: 'root'
})
export class CategorylistService {
  private OfferUrl = environment.BASE_URL+'/offer-list';
  private WIshUrl = environment.BASE_URL+'/wish-list';
  private ExchangesUrl = environment.BASE_URL+'/exchanges';
  private ExchangesActiveUrl = environment.BASE_URL+'/exchanges/active';

  constructor(private http: HttpClient,
  private TokenStorage: TokenStorageService) {
  }

  getOffer(): Observable<OfferDTO[]> {
    return this.http.get<OfferDTO[]>(this.OfferUrl, {headers: this.TokenStorage.getAuthHeader()});
  }
  getWish(): Observable<WishDTO[]> {
    return this.http.get<WishDTO[]>(this.WIshUrl, {headers: this.TokenStorage.getAuthHeader()});
  }
  getExchanges(): Observable<ExchangeDto[]> {
    return this.http.get<ExchangeDto[]>(this.ExchangesUrl, {headers: this.TokenStorage.getAuthHeader()});
  }
  getActiveExchanges(): Observable<ExchangeDto[]> {
    return this.http.get<ExchangeDto[]>(this.ExchangesActiveUrl, {headers: this.TokenStorage.getAuthHeader()});
  }
}

