import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthDialogComponent} from "../../auth-dialog/auth-dialog.component";
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Observer} from "rxjs";
import {AccountDTO} from "../../core/interfaces/account.dto";
import {ExchangelistDto} from "../../core/interfaces/exchangelist.dto";
import {CategorylistService} from "../../core/services/categorylist.service";

@Component({
  selector: 'app-myexchanges',
  templateUrl: './myexchanges.component.html',
  styleUrl: './myexchanges.component.scss',

})
export class MyexchangesComponent implements OnInit {
  user !: AccountDTO;
  isLoading: boolean=false;
  currentSection: number = 2;
  Number: string = '';
  data:any ;
//  form: FormGroup;
  showSection(sectionNumber: number) {
    this.currentSection = sectionNumber;
  }
  constructor(public dialog: MatDialog,
              private message: NzMessageService,
              private router: Router,
              private Categorylist: CategorylistService,
              public authService:  AuthService) {}
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
  ngOnInit(): void {
    this.loadData();
    if (this.authService.isAuthenticated()){
      this.isLoading=true;
      const observer: Observer <AccountDTO> = {
        complete: () =>  {
        },

        error: (err: any) => {
        },

        next: (value: AccountDTO) => {
          this.isLoading=false;
          console.log(value)
          this.user=value;
        }
      }
      this.authService.getAuthenticated().subscribe(observer);
    }
  }
  loadData(){
    this.Categorylist.getCategories().subscribe((response)=>{});
  }
  getAvatarOrDefault(user: AccountDTO): string {
    return user.urlAvatar != undefined ? user.urlAvatar : "assets/1.png";
  }

  signOut() {
    this.authService.signOut()
  }
}



