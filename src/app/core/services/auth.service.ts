import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.dev";
import {AuthResponseDTO} from "../interfaces/auth-response.dto";
import {AuthRequestDTO} from "../interfaces/auth-request.dto";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../interfaces/jwt-payload";
import {RegisterDTO} from "../interfaces/register.dto";
import {AccountDTO} from "../interfaces/account.dto";
import {ExchangegoDTO} from "../interfaces/exchangego.dto";
@Injectable()
export class AuthService {

  constructor(

    private storage: TokenStorageService,
    private http: HttpClient
  ) {}
  confirmRegistration(
    data: string
  ): Observable<any> {
    return this.http
      .post(`${environment.BASE_URL}/sign-up/confirm?token=` + data, {});
  }

  public signIn(auth:AuthRequestDTO):Observable<AuthResponseDTO | null> {
    return this.http.post<AuthResponseDTO>(environment.SIGN_IN_URL, auth)
  }

  public signUp(reg:RegisterDTO, avatar: File | null):Observable<HttpResponse<any>>{
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(reg)], {
      type: 'application/json'
    }));

    if (avatar) {
      formData.append('avatar', avatar);
    }

    return this.http.post<RegisterDTO>(environment.SIGN_UP_URL, formData, {
      observe: 'response'
    })
  }

  public signOut() {
    this.storage.setToken(null);
  }

  public Exchanging(exc:ExchangegoDTO | null):Observable<HttpResponse<any>>{
    return this.http.post<ExchangegoDTO>(environment.EXC_URL, exc, {
      headers: this.storage.getAuthHeader(),
      observe: 'response'
    })
  }

  public isAuthenticated():boolean {
    return this.storage.getToken() != null && !this.storage.isTokenExpired();
  }

  public getAuthenticated():Observable<AccountDTO> {
    return this.http.get<AccountDTO>(environment.ME_URL, {
      headers: this.storage.getAuthHeader()
    })
  }
  private categoryUrl = 'api/v1/category';
  public getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  public getRole(): string {
    const token = this.storage.getToken();
    return token ? jwtDecode<JwtPayload>(token).role : environment.ROLE_ANONYMOUS;
  }

  public isAuthenticatedAs(role: string): boolean {
    return this.isAuthenticated() && this.getRole() === role;
  }
}
