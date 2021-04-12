import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bai4Component } from './bai4.component';
import {EmployeeListComponent} from './employee-list/employee-list.component'
import { EmployeeComponent } from './employee/employee.component';
import { DatePipe } from '@angular/common';
// import { EmployeeService } from '../../shared/employee.service';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Baid4RoutingModule } from './bai4.routing';
import { RouterModule } from '@angular/router';
import { ModelService } from 'shared/model.service';
import { NotificationService } from 'shared/notification.service';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [
    Bai4Component,
    EmployeeListComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    Baid4RoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    FileUploadModule

  ],
  providers: [ModelService,NotificationService ,DatePipe],
})
export class Bai4Module { }
