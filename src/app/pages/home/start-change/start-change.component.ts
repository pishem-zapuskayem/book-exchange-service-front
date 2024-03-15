import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
@Component({
  selector: 'app-multistep',
  templateUrl: './start-change.component.html',
  styleUrls: ['./start-change.component.scss']
})
export class StartChangeComponent implements OnInit {
  needExchange!: FormGroup;
  Wanted!: FormGroup;
  InfoDetail!: FormGroup;
  exchange_step = false;
  wanted_step = false;
  info_step = false;
  step = 1;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private message: NzMessageService) { }
  ngOnInit() {
    this.needExchange = this.formBuilder.group({
      SecondName: ['', Validators.required],
      FirstName: ['', Validators.required],
      BookName: ['', Validators.required],
      Year: ['',Validators.required]
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
  }
  get trade() { return this.needExchange.controls; }
  get want() { return this.InfoDetail.controls; }
  get info() { return this.Wanted.controls; }
  next(){
    if(this.step==1){
      this.exchange_step = true;
      if (this.needExchange.invalid) { return  }
      this.step++
    }
    if(this.step==2){
      this.wanted_step = true;
      if (this.Wanted.invalid) { return }
      this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.exchange_step = false;
    }
    if(this.step==2){
      this.info_step = false;
    }
  }
  submit(){
    if(this.step==3){
      this.info_step = true;
      if (this.InfoDetail.invalid) { return }
    }
  }
  showLogin() {
    this.dialog.open(AuthDialogComponent);
  }
  createMessage(type: string): void {
    this.message.create(type, `Данный раздел доступен только авторизованному пользователю`);
  }
}
