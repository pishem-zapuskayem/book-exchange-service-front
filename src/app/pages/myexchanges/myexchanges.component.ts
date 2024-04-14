import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthDialogComponent} from "../../auth-dialog/auth-dialog.component";
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Observer} from "rxjs";
import {AccountDTO} from "../../core/interfaces/account.dto";

import {CategorylistService} from "../../core/services/categorylist.service";
import {OfferDTO} from "../../core/interfaces/offer.dto";
import {ExchangeDto} from "../../core/interfaces/exchange.dto";
import {WishDTO} from "../../core/interfaces/wish.dto";
import {BookResponseService} from "../../core/services/book-response.service";
import {RegisterDTO} from "../../core/interfaces/register.dto";
import {BookNoteResponseDTO} from "../../core/interfaces/book-note-response.dto";
import {id_ID} from "ng-zorro-antd/i18n";
import {ExchangeCardService} from "../../core/services/exchange-card.service";
import {ExchangeInfoDTO} from "../../core/interfaces/exchange-info.dto";
import {ExchangeActiveDTO} from "../../core/interfaces/exchange-active.dto";


@Component({
  selector: 'app-myexchanges',
  templateUrl: './myexchanges.component.html',
  styleUrl: './myexchanges.component.scss',

})
export class MyexchangesComponent implements OnInit {
  form: FormGroup = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    secondName: new FormControl(''),
    email: new FormControl(''),
  });
  user !: AccountDTO;
  isLoading: boolean=false;
  isLoadingOffers: boolean=false;
  isLoadingWishes: boolean=false;
  isLoadingNotes: boolean=false;
  isLoadingExchanges: boolean=false;
  currentSection: number = 2;
  Number: string = '';
  data:any ;
  offers!: OfferDTO[];
  exchanges!: ExchangeDto[];
  exchangesActive !: ExchangeDto[];
  wishes!: WishDTO[];
  info !: ExchangeInfoDTO;
  activeExchanges !: ExchangeActiveDTO[];
  activeExchange !: ExchangeActiveDTO;
  Archives!: ExchangeDto[];
  panels = [
    {
      active: true,
      name: 'Полное совпадение',
    },
    {
      active: false,
      name: 'Частичное совпадение'
    },
  ];
  showSection(sectionNumber: number) {
    this.currentSection = sectionNumber;
  }
  constructor(public dialog: MatDialog,
              private message: NzMessageService,
              private router: Router,
              private Categorylist: CategorylistService,
              public authService:  AuthService,
              public BookResponse: BookResponseService,
              private formBuilder: FormBuilder,
              private ExchangeCard: ExchangeCardService,

  ) {}
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
    this.form = this.formBuilder.group({
      Response: ["" ,[ Validators.required,]],
    });
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
      const formData: BookNoteResponseDTO = {...this.form.value}
      // @ts-ignore
      formData.response = {...formData}
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

      this.Categorylist.getActiveExchanges().subscribe(f => {
        this.isLoadingExchanges = false;
        this.exchangesActive = f;
        console.dir(this.exchangesActive);
      });
      this.ExchangeCard.GetArchive().subscribe(s => {
        this.isLoadingOffers = false;
        this.Archives=s;
        console.dir(this.Archives);
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
  getExchangeOffers() {
    this.Categorylist.getExchanges().subscribe(h => {
      this.isLoadingExchanges = false;
      this.exchanges = h;
      this.currentSection = 1;
    });
  }
  getOffers(){
    this.Categorylist.getOffer().subscribe(r => {
      this.isLoadingOffers = false;
      this.offers = r;
      this.currentSection = 2;
    });
  }
  getWish(){
    this.Categorylist.getWish().subscribe(x => {
      this.isLoadingWishes = false;
      this.wishes = x;
      this.currentSection = 3;
    });
  }
  getActive(){
    this.Categorylist.getActiveExchanges().subscribe(f => {
      this.isLoadingExchanges = false;
      this.exchangesActive = f;
      console.dir(this.exchangesActive);
      this.currentSection = 4;
    });
  }
  getArchive() {
    this.ExchangeCard.GetArchive().subscribe(s => {
      this.isLoadingOffers = false;
      this.Archives = s;
      console.dir(this.Archives);
      this.currentSection = 8;
    });
  }
  selectedCardData: any;

  showDetails(exchange: any) {
    this.currentSection = 9; // Переключение на раздел 4
    this.selectedCardData = exchange.id;
    console.log(this.selectedCardData);// Сохранение данных выбранной карточки
    this.ExchangeCard.GetExchangeInfo(this.selectedCardData).subscribe(x =>{
      this.info = x;
      this.info.id=exchange.id;


      console.dir(this.info);
    });

  }

  showDetailsOfActive(exchangeActive: any) {
    this.currentSection = 10; // Переключение на раздел 4
    this.selectedCardData = exchangeActive;
    console.log(this.selectedCardData);// Сохранение данных выбранной карточки
    this.ExchangeCard.GetActiveExchangeInfo(this.selectedCardData).subscribe(x =>{
      this.activeExchange = x;
      this.activeExchange.id=exchangeActive;
      console.dir(this.activeExchange);
    });

  }

}
