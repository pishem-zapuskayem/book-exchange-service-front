import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.dev";
import {AuthResponseDTO} from "../interfaces/auth-response.dto";
import {AuthRequestDTO} from "../interfaces/auth-request.dto";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../interfaces/jwt-payload";

@Injectable()
export class AuthService {

  constructor(
    private storage: TokenStorageService,
    private http: HttpClient
  ) {}

  public signIn(auth:AuthRequestDTO):Observable<AuthResponseDTO | null> {
    return this.http.post<AuthResponseDTO>(environment.SIGN_IN_URL, auth)
  }

  public signOut() {
    this.storage.setToken(null);
  }

  public isAuthenticated():boolean {
    return this.storage.getToken() != null && !this.storage.isTokenExpired();
  }

  public getRole(): string {
    const token = this.storage.getToken();
    return token ? jwtDecode<JwtPayload>(token).role : environment.ROLE_ANONYMOUS;
  }

  public isAuthenticatedAs(role: string): boolean {
    return this.isAuthenticated() && this.getRole() === role;
  }
}
