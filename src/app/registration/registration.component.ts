import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
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
  form: FormGroup = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    secondName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    addrIndex: new FormControl(''),
    addrCity: new FormControl(''),
    addrStreet: new FormControl(''),
    addrHouse: new FormControl(''),
    addrStructure: new FormControl(''),
    addrApart: new FormControl(''),
  });
  errormessage: string | undefined;
  isSubmitted = false;
  error = false;
  selectedFile: File | null = null;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: AuthService,) {}
  ngOnInit() {
    this.form = this.formBuilder.group(
      {
      lastName: ["" ,[ Validators.required, Validators.maxLength(50), Validators.pattern(/[А-Я]/)]],
      firstName:["", [Validators.required, Validators.maxLength(25), Validators.pattern(/[А-Я]/) ]],
      secondName:["", [Validators.required, Validators.maxLength(25), Validators.pattern(/[А-Я]/) ]],
      email: ["", [
        Validators.required,

        Validators.email
      ]],
      username: ["",
        Validators.required,
        Validators.pattern(/([$@$!%*?&])/)
      ],
      password: ["",
        Validators.required,
      ],
      addrIndex: ["",
        Validators.required,

      ],
      addrCity: ["",
        Validators.required,

      ],
      addrStreet: ["",
        Validators.required,

      ],
      addrHouse: ["",
        Validators.required,

      ],
      addrStructure: ["",

      ],
      addrApart: ["",
      ],
      avatar: new FormControl(null, []),
    });
  }


  get rex() { return this.form.controls; }


  goToHomePage() {
    this.router.navigate(['/']);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
        this.errormessage='Никнейм уже занят, или индекс уже занят';
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
