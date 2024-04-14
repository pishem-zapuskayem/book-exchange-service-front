import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../core/services/auth.service";
import {FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {RegisterDTO} from "../core/interfaces/register.dto";
import {Observer} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {AuthRequestDTO} from "../core/interfaces/auth-request.dto";
import {AuthResponseDTO} from "../core/interfaces/auth-response.dto";
import {TokenStorageService} from "../core/services/token-storage.service";
import {AuthredirectService} from "../core/services/authredirect.service";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent {
  form: FormGroup;
  isSubmitted = false;
  error = false;
  errormessage: string | undefined;
  constructor(
  private service: AuthService,
  private tokenStorage: TokenStorageService,
  private router: Router,
  private AuthRedirectService: AuthredirectService,
  ) {

    this.form = new FormGroup({

      email: new FormControl(null, [
        Validators.required,

      ]),
      password: new FormControl(null, [
        Validators.required,

      ])
    })
  }
  submit() {
    if (this.isSubmitted || this.form.invalid) {

      return;
    }

    this.isSubmitted = true;

    const formData: AuthRequestDTO = {...this.form.value}
    // @ts-ignore
    formData.address = {...formData}
    console.dir(formData);
    const observer: Observer<AuthResponseDTO| null> = {
      complete: () =>  {
        console.log('1');
      },

      error: (err: any) => {
        this.errormessage='Неправильный логин или пароль';
        this.error = true;
        this.isSubmitted = false;
        console.log('2');
      },

      next: (value: AuthResponseDTO | null) => {
        if (value) {
          this.tokenStorage.setToken(value);
          this.errormessage=undefined;
          this.router.navigate(['/home']);

          this.isSubmitted = false;
          this.error = false;
          this.AuthRedirectService.invokeOnLogin();
          console.log('3');
          window.location.reload();
        }
      }
    }

    this.service.signIn(formData).subscribe(observer);
  }
}
