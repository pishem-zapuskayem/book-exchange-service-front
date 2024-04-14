import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment.dev";
import {AuthResponseDTO} from "../interfaces/auth-response.dto";
import {AuthRequestDTO} from "../interfaces/auth-request.dto";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../interfaces/jwt-payload";
import {RegisterDTO} from "../interfaces/register.dto";
import {AccountDTO} from "../interfaces/account.dto";

 @Injectable({
  providedIn: 'root'
})
export class AuthredirectService {
  private subject =  new Subject<void>();

   onLogin = this.subject.asObservable();

  constructor() { }

  invokeOnLogin() {
    this.subject.next();
  }
}
