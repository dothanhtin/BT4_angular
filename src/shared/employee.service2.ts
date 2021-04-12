import { NodeWithI18n } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Employee} from '../app/model/Employee';
import { formatDate } from "@angular/common";
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UUID } from 'angular2-uuid';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private datePipe: DatePipe
    ) { }

    // employeeList = [
    //     {}
    // ];
    employeeList: Employee[] = [];

    form: FormGroup = new FormGroup({
        id: new FormControl(null),
        name: new FormControl('', Validators.required),
        email: new FormControl('', [ Validators.required,Validators.email]),
        code:new FormControl('',[ Validators.required,Validators.pattern('^[a-zA-Z0-9_]*$')]),
        birthDate: new FormControl('', Validators.required),
        url: new FormControl('')
    });

    initializeFormGroup() {
        this.form.setValue({
            id: null,
            name: '',
            email: '',
            code: '',
            birthDate: '',
            url: '',
        });
    }

    clearUpdate(id)
    {
        let index = this.employeeList.findIndex(x => x.id ===id);
        let item = this.employeeList[index];
        this.form.setValue({
            id : item.id,
            code: item.code,
            name: '',
            email: '',
            birthDate: '',
            url: '',
        });
    }

    getEmployees() : Observable<Employee[]>{
        const employees = of(this.employeeList);
        return employees;
    }
    // getEmployees() {
    //     return this.employeeList;

    // }

    insertEmployee(employee : Employee) {
        
        this.employeeList.push({
            id:UUID.UUID(),
          name: employee.name,
          email: employee.email,
          code: employee.code,
          birthDate: employee.birthDate == "" ? "" : this.datePipe.transform(employee.birthDate, 'yyyy-MM-dd'),
          url: employee.url
        });
    }

    populateForm(employee) {
        this.form.setValue({
            name: employee.name,
            email: employee.email,
            code: employee.code,
            birthDate: employee.birthDate,
            url: employee.url,
            id:employee.id
        });
    }

    updateEmployee(employee) {

        let index = this.employeeList.findIndex(x => x.id ===employee.id);
        if(index === -1) return;
        this.employeeList[index].name = employee.name;
        this.employeeList[index].email = employee.email;
        // this.employeeList[index].code = employee.code;
        this.employeeList[index].url = employee.url;
        this.employeeList[index].birthDate = employee.birthDate == "" ? "" : this.datePipe.transform(employee.birthDate, 'yyyy-MM-dd');
    }

    deleteEmployee(id){
        let lstmp = this.employeeList.filter(item => item.id != id);
        //this.employeeList = this.employeeList.splice(index, 1);
        this.employeeList = lstmp;
    }
}
