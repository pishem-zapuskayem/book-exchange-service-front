import {Component, OnInit} from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observer} from "rxjs";
import {AccountDTO} from "../../../core/interfaces/account.dto";
import {AuthService} from "../../../core/services/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {CategoryDTO} from "../../../core/interfaces/category.dto";
import {CategoriesService} from "../../../core/services/categories.service";
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-multistep',
  templateUrl: './start-change.component.html',
  styleUrls: ['./start-change.component.scss']
})
export class StartChangeComponent implements OnInit {
  offerDefaultExpandedKeys = ['100', '1001'];
  wishDefaultExpandedKeys = ['100', '1001'];
  wishListKeys: any[] | undefined = [];
  offerListKeys: any[] | undefined = [];

  offerListNodes: NzTreeNodeOptions[] = [];
  wishListNodes: NzTreeNodeOptions[] = [];
  parentNodeIds: Set<string> = new Set<string>();
  categoriesMap: Map<string, CategoryDTO> = new Map<string, CategoryDTO>();

  onWishListCheckBoxClick(event: NzFormatEmitEvent): void {
    // let newKey = event.node!.key;
    this.wishListKeys = event.keys?.filter(
      key => !this.parentNodeIds.has(key)
    );
  }

  onOfferListCheckBoxClick(event: NzFormatEmitEvent): void {
    // let newKey = event.node!.key;
    this.offerListKeys = event.keys?.filter(
      key => !this.parentNodeIds.has(key)
    );
  }

  offerListForm!: FormGroup;
  wishListForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  exchange_step = false;
  wanted_step = false;
  info_step = false;
  step = 1;
  user !: AccountDTO;
  isLoading: boolean = false;
  isSubmitted = false;
  error = false;
  showTree: boolean = true;
  categories: CategoryDTO[] = [];

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private message: NzMessageService,
  public authService:  AuthService,
              private router: Router,
              private categoriesService: CategoriesService
  ) {
    this.offerListForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      publishYear: ['', Validators.required],
      isbn: [''],
      key:[''],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
    });
    this.wishListForm = this.formBuilder.group({
      WannaTake: ['', Validators.required],
    });
    this.addressDetailsForm = this.formBuilder.group({
      addrCity: ['', Validators.required],
      addrStreet: ['', Validators.required],
      addrStructure: ['', Validators.required],
      addrHouse: ['', Validators.required],
      addrApart: [''],
      addrIndex: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      middleName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.showTree = true; // Показываем дерево
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.parentNodeIds = new Set<string>(
        categories.filter(cat => cat.children && cat.children.length != 0)
          .map(cat => cat.id)
      );
      this.categoriesMap = new Map(categories.map(i => [i.id, i]));
      this.offerListNodes = this.convertToTreeNodes(categories);
      this.wishListNodes = this.convertToTreeNodes(categories);
    });

    if (this.authService.isAuthenticated()) {
      this.isLoading = true;
      const observer: Observer<AccountDTO> = {
        complete: () => {
        },

        error: (err: any) => {
        },

        next: (value: AccountDTO) => {
          this.isLoading = false;
          this.user = value;
        }
      }
      this.authService.getAuthenticated().subscribe(observer);
    }
  }

  toggleCheckbox(category: any): void {
    category.isChecked = !category.isChecked;
  }

  convertToTreeNodes(categories: CategoryDTO[]): NzTreeNodeOptions[] {
    return categories.map(category => {
      return {
        key: category.id,
        title: category.name,
        parent: category.parent,
        multiselect: category.multiselect,
        isLeaf: !(category.children && category.children.length > 0),
        children: category.children ? this.convertToTreeNodes(category.children) : [],
        disableCheckbox: (category.children && category.children.length > 0)
      };
    });
  }

  get trade() {
    return this.offerListForm.controls;
  }

  get want() {
    return this.addressDetailsForm.controls;
  }

  get info() {
    return this.wishListForm.controls;
  }

  next() {
    this.step++;
    if (this.step == 1) {
      this.showTree = true;
      this.exchange_step = true;
      if (this.offerListForm.invalid) {
        return
      }
    }
    if (this.step == 2) {
      this.showTree = true;
      this.wanted_step = true;
      if (this.wishListForm.invalid) {
        return
      }
    }
  }

  previous() {
    this.step--
    if (this.step == 1) {
      this.showTree = true;
      this.exchange_step = false;
    }
    if (this.step == 2) {
      this.showTree = true;
      this.info_step = false;
    }
    let array = []
    // @ts-ignore
    for (let wlKey of this.wishListKeys) {
      array.push(this.categoriesMap.get(wlKey));
    }
    // @ts-ignore
    this.offerListNodes = this.convertToTreeNodes(array);
    console.log(this.wishListKeys)
  }

  submit() {
    if (this.step == 3) {
      this.info_step = true;
      if (this.addressDetailsForm.invalid) {
        return
      }
    }
    this.isSubmitted = true;
    this.router.navigate(['/exchanges'])
    const offerData = this.offerListForm.value;
    const addressData = this.addressDetailsForm.value;

    const formData: any = {
      offer: {
        book: {
          bookName: offerData.bookName,
          note: '', // Здесь вы должны указать, откуда брать значение note
          isbn: offerData.isbn,
          publishYear: offerData.publishYear,
          author: {
            lastname: offerData.lastname,
            firstname: offerData.firstname
          }
        },
        offerCategoriesIds: this.offerListKeys
      },
      wish: {
        wishCategoriesIds: this.wishListKeys
      },
      address: {
        addrIndex: addressData.addrIndex,
        addrCity: addressData.addrCity,
        addrStreet: addressData.addrStreet,
        addrHouse: addressData.addrHouse,
        addrStructure: addressData.addrStructure,
        addrApart: addressData.addrApart
      }
    };

    const observer: Observer<HttpResponse<any>> = {
      complete: () =>  {
      },

      error: (err: any) => {
        console.log("2");
        this.error = true;
        this.isSubmitted = false;
      },

      next: (value: HttpResponse<any>) => {
        this.isSubmitted = false;
        this.error = false;
      }
    }

    this.authService.Exchanging(formData).subscribe(observer);
  }

}
