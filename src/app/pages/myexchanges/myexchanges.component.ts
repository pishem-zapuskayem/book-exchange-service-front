import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthDialogComponent} from "../../auth-dialog/auth-dialog.component";
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {Router} from "@angular/router";
@Component({
  selector: 'app-myexchanges',
  templateUrl: './myexchanges.component.html',
  styleUrl: './myexchanges.component.scss',

})
export class MyexchangesComponent {
  currentSection: number = 2;

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
}

