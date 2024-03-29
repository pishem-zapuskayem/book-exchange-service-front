import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthDialogComponent} from "../../auth-dialog/auth-dialog.component";
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-myexchanges',
  templateUrl: './myexchanges.component.html',
  styleUrl: './myexchanges.component.scss',

})
export class MyexchangesComponent {

  currentSection: number = 2;
  Number: string = '';
//  form: FormGroup;
  showSection(sectionNumber: number) {
    this.currentSection = sectionNumber;
  }
  constructor(public dialog: MatDialog, private message: NzMessageService,private router: Router) {}
  showLogin() {
    this.dialog.open(AuthDialogComponent);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToMyExchanges() {
    this.router.navigate(['/exchanges']);
  }
  buttonClicked: boolean = false;
  buttonClicked1: boolean = false;
  showText() {
    this.buttonClicked = true;
  }
  showText1() {
    this.buttonClicked1 = true;
  }
  inputValue: string = '';
  showInfo: boolean = false;

  showInfoOnClick() {
    this.showInfo = true;
  }
/*
  data: any[];

  constructor(private dataService: myexchanges) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((result) => {
      this.data = result;
    });
  }*/

}



