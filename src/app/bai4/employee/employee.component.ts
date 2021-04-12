import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { ModelService } from '../../../shared/model.service';
import { NotificationService } from '../../../shared/notification.service';
import { map, catchError } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';


const uploadAPI = 'http://localhost:4000/api/upload';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css'],
    // encapsulation: ViewEncapsulation.ShadowDom
})
export class EmployeeComponent implements OnInit {

    constructor(
        public service: ModelService,
        public notificationService: NotificationService,
        public dialogRef: MatDialogRef<EmployeeComponent>

    ) { }
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

    onClear() {
        this.service.form.clearValidators();
        this.service.initializeFormGroup();
        this.service.form.reset();
        this.uploader.clearQueue();
    }

    onClose() {
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
    }

    onSubmit() {
        if (!this.service.form.get('$key')?.value) {
            if (this.service.form.get('image') == undefined) {
                alert("Please upload file!");
            }
            else {
                this.service.insertModel(this.service.form.value);
                this.service.form.reset();
                this.service.initializeFormGroup();
                this.service.form.clearValidators();
            }
        }
        else {
            console.log("update model:" + this.service.form.value);
            this.service.updateModel(this.service.form.value);
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.service.form.clearValidators();
        }
        this.notificationService.success(':: Submitted Successfully!');
        this.dialogRef.close();
    }

    public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
    public previewPath: any;
    src = 'http://localhost:4000/api/';
    public upload() {
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        if (this.uploader.queue.length == 0)
            alert("Your request doesn’t have any file");
        if (this.uploader.queue.length > 1) {
            alert("Your request has more 1 file");
        }
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            //console.log('FileUpload:uploaded successfully:', item, status, response);
            //  alert('Your file has been uploaded successfully');
            //  var responsePath = JSON.parse(response);
            // console.log(response, responsePath);// the url will be in the response
            if (status === 200)
                this.service.form.controls.image.setValue(this.src + JSON.parse(response).success);
            // else{
            //   var resError=JSON.parse(response);
            //   if(resError.success===false){
            //     alert(resError.msg);
            //   }
            //   else
            //   alert("Uploaded Failed! Please check api upload!");
            // }   
        };
    }
    onClick() {
        console.log(this.uploader)
        // console.log(this.uploader.queue[0]._file.name.endsWith('.jpg'));
        this.uploader.uploadAll();
        this.upload();
    }
}
