import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterDTO} from "../core/interfaces/register.dto";
import {Observer} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {AuthService} from "../core/services/auth.service";
import {fetchPackageManifest} from "@angular/cli/src/utilities/package-metadata";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  form: FormGroup;
  isSubmitted = false;
  error = false;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private service: AuthService
  ) {

    this.form = new FormGroup({

      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(25)
      ]),
      secondName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(25)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      addrIndex: new FormControl(null, [
        Validators.required,
        Validators.maxLength(7)
      ]),
      addrCity: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15)
      ]),
      addrStreet: new FormControl(null, [
        Validators.required,
        Validators.maxLength(25)
      ]),
      addrHouse: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5)
      ]),
      addrStructure: new FormControl(null, [
        Validators.required,
        Validators.maxLength(2)
      ]),
      addrApart: new FormControl(null, [
        Validators.required,
        Validators.maxLength(3)
      ]),
      avatar: new FormControl(null, []),
    });

  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

  submit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;

    const formData: RegisterDTO = {...this.form.value}
    // @ts-ignore
    formData.address = {...formData}
    console.dir(formData);
    const observer: Observer<HttpResponse<any>> = {
      complete: () =>  {
      },

      error: (err: any) => {
        this.error = true;
        this.isSubmitted = false;
      },

      next: (value: HttpResponse<any>) => {
        this.router.navigate(['/home']);
        this.isSubmitted = false;
        this.error = false;
      }
    }

    this.service.signUp(formData, this.selectedFile).subscribe(observer);
  }

  onFileChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;
  }
}
