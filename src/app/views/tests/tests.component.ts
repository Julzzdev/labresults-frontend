import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { Patient } from '../../interfaces/Patient.interface'
import { MasterService } from '../../services/master.service'
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  // variables
  // all templates
  public patients: Patient[] = [
    { code: '123456', firstName: 'Juan Carlos', lastName: 'carrillo', dateOfBirth: '2000-08-08', business: 'Bimbo', gender: 'male', tests: [{ name: 'blood', code: 'bld.', fields: [] }] },
  ]
  // names
  generalForm = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    dateOfBirth: ['', [Validators.required]],
    business: ['', [Validators.required]],
    gender: [true, [Validators.required]],
  });
  
  tests = new FormControl('',Validators.required);

  testCatalog: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  //  user selected
  public userSelected: number = -1
  // test selected
  public testSelected: string = ''

  // reset all forms
  public reset = (stepper:any) => {
    stepper.reset()
    this.generalForm.reset()
    for (let name in this.generalForm.controls) {
      this.generalForm.controls[name].setErrors(null)
    }
    this.tests.reset()
  }
  public save = (generalInformation: any, tests: any) => {
    debugger
    this.patients.push({ ...generalInformation, ...tests })
  }
  // select an user
  public selectUser = (index: number) => {
    this.userSelected = index
  }
  //  add a test
  public addTest = (test: string) => {
    this.testCatalog.push(test)
  }
  // quit a test selected
  public quitTest = (index: number) => {
    this.testCatalog.splice(index, 1)
  }

  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService) { }

  ngOnInit(): void {
  }

}
