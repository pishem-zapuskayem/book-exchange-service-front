import { AfterViewInit, Component, ViewChild , OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observer} from "rxjs";
import {AccountDTO} from "../../../core/interfaces/account.dto";
import {AuthService} from "../../../core/services/auth.service";
import {CategoryDTO} from "../../../core/interfaces/category.dto";
import {CategoriesService} from "../../../core/services/categories.service";
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-multistep',
  templateUrl: './start-change.component.html',
  styleUrls: ['./start-change.component.scss']

})
export class StartChangeComponent implements OnInit {
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

  nodes: NzTreeNodeOptions[] = [];

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList());
  }

  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList()
    );
  }
  needExchange!: FormGroup;
  Wanted!: FormGroup;
  InfoDetail!: FormGroup;
  exchange_step = false;
  wanted_step = false;
  info_step = false;
  step = 1;
  user !: AccountDTO;
  isLoading: boolean = false;
  showTree: boolean = true;
  categories: CategoryDTO[] = [];
  treeVisible: boolean = true;
  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private message: NzMessageService,
              private categoriesService: CategoriesService,
  public authService:  AuthService
  ) {
  }

  ngOnInit() {

    this.showTree = true; // Показываем дерево
    this.needExchange = this.formBuilder.group({
      SecondName: ['', Validators.required],
      FirstName: ['', Validators.required],
      BookName: ['', Validators.required],
      Year: ['', Validators.required]
      //  ISBN: ['',Validators.required]
    });
    this.Wanted = this.formBuilder.group({
      WannaTake: ['', Validators.required],
    });
    this.InfoDetail = this.formBuilder.group({
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Build: ['', Validators.required],
      House: ['', Validators.required],
      //apartment: ['', Validators.required],
      Index: ['', Validators.required],
      SecondName: ['', Validators.required],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required]
    });
    this.categoriesService.getCategories().subscribe(categories => {
      this.nodes = this.convertToTreeNodes(categories);
    });
    this.categoriesService.getCategories().pipe(
      map((categories: CategoryDTO[]) => this.convertToTreeNodes(categories))
    ).subscribe(nodes => {
      this.nodes = nodes;
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
          console.log(value)
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

    return categories.map(category => {const selectable = category.multiselect ? category.multiselect : undefined;
      return {
        key: category.id,
        title: category.name,
        parent: category.parent,
        multiselect: category.multiselect,
        isLeaf: !(category.children && category.children.length > 0),
        children: category.children ? this.convertToTreeNodes(category.children) : [],
        selectable: selectable,
      };
    });
  }
  get trade() {
    return this.needExchange.controls;
  }

  get want() {
    return this.InfoDetail.controls;
  }

  get info() {
    return this.Wanted.controls;
  }

  next() {

    if (this.step == 1) {
      this.showTree = true;
      this.exchange_step = true;
      if (this.needExchange.invalid) {
        return
      }
      this.step++
    }
    if (this.step == 2) {
      this.showTree = true;
      this.wanted_step = true;
      if (this.Wanted.invalid) {
        return
      }
      this.step++;
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
  }

  submit() {
    if (this.step == 3) {
      this.info_step = true;
      if (this.InfoDetail.invalid) {
        return
      }
    }
  }

  showLogin() {
    this.dialog.open(AuthDialogComponent);
  }

  createMessage(type: string): void {
    this.message.create(type, `Данный раздел доступен только авторизованному пользователю`);
  }

  getAvatarOrDefault(user: AccountDTO): string {
    return user.urlAvatar != undefined ? user.urlAvatar : "assets/1.png";
  }
}
