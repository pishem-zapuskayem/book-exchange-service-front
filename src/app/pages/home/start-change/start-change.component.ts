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
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private message: NzMessageService) { }
  ngOnInit() {
    this.personalDetails = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['',Validators.required]
    });
    this.addressDetails = this.formBuilder.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['',Validators.required]
    });
    this.educationalDetails = this.formBuilder.group({
      highest_qualification: ['', Validators.required],
      university: ['', Validators.required],
      total_marks: ['',Validators.required]
    });
  }
  get personal() { return this.personalDetails.controls; }
  get education() { return this.educationalDetails.controls; }
  get address() { return this.addressDetails.controls; }
  next(){
    if(this.step==1){
      this.personal_step = true;
      if (this.personalDetails.invalid) { return  }
      this.step++
    }
    if(this.step==2){
      this.address_step = true;
      if (this.addressDetails.invalid) { return }
      this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
  }
  submit(){
    if(this.step==3){
      this.education_step = true;
      if (this.educationalDetails.invalid) { return }
    }
  }
  showLogin() {
    this.dialog.open(AuthDialogComponent);
  }
  createMessage(type: string): void {
    this.message.create(type, `Данный раздел доступен только авторизованному пользователю`);
  }
}
