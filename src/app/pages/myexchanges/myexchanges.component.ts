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

import {CategorylistService} from "../../core/services/categorylist.service";
import {OfferDTO} from "../../core/interfaces/offer.dto";
import {ExchangeDTO} from "../../core/interfaces/exchangeDTO";
import {WishDTO} from "../../core/interfaces/wish.dto";

@Component({
  selector: 'app-myexchanges',
  templateUrl: './myexchanges.component.html',
  styleUrl: './myexchanges.component.scss',

})
export class MyexchangesComponent implements OnInit {
  user !: AccountDTO;
  isLoading: boolean=false;
  isLoadingOffers: boolean=false;
  isLoadingWishes: boolean=false;
  isLoadingExchanges: boolean=false;
  currentSection: number = 2;
  Number: string = '';
  data:any ;
//  form: FormGroup;
  offers!: OfferDTO[];
  exchanges!: ExchangeDTO[];
  wishes!: WishDTO[];

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

      this.isLoadingOffers = true;
      this.Categorylist.getOffer().subscribe(r => {
        this.isLoadingOffers = false;
        this.offers = r;
      });

    this.isLoadingWishes = true;
    this.Categorylist.getWish().subscribe(x => {
      this.isLoadingWishes = false;
      this.wishes = x;
    });

    this.isLoadingExchanges = true;
    this.Categorylist.getExchanges().subscribe(h => {
      this.isLoadingExchanges = false;
      this.exchanges = h;
      console.dir(this.exchanges);
    });
    }
  }
  loadData(){
    this.Categorylist.getOffer().subscribe((response)=>{});
  }

  getAvatarOrDefault(user: AccountDTO): string {
    return user.urlAvatar != undefined ? user.urlAvatar : "assets/1.png";
  }

  signOut() {
    this.authService.signOut()
  }

}



