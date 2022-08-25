import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Template } from 'src/app/interfaces/Template.interface';
import { Patient } from '../../interfaces/Patient.interface'
import { MasterService } from '../../services/master.service'


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  // variables
  public pagination={startDate:'',endDate:'',page:1,numPages:1}
  // 
  public testList:Template[]=[]
  // 
  public formView: boolean = false
  // all templates
  public patients: Patient[] = []
  // names
  public generalForm = this._formBuilder.group({
    _id: ['', []],
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    secondname: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    lastname1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastname2: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    age: ['', [Validators.required]],
    dateOfBirth: ['', Validators.required],
    business: ['', []],
    gender: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: ['', []],
  });

  public tests: Template[] = [];
  // 
  public templates: Template[] = [];

  public testCatalog: string[] = [];

  //  user selected
  public patientSelected: Patient = {
    firstname: '',
    lastname1: '',
    lastname2: '',
    age: 0,
    dateOfBirth: '',
    business: '',
    gender: false,
    secondname: '',
    email: '',
    phone: '',
    tests: []
  }
  // test selected
  public testSelected: string = ''
  // functions
  // reset all forms
  public resetAll = () => {
    this.formView = !this.formView
    this.reset()
    // this.resetTemplateName()
    // this.resetFieldsForm()
  }

  // reset all forms
  public reset = () => {
    this.generalForm.reset()
    for (let name in this.generalForm.controls) {
      this.generalForm.controls[name].setErrors(null)
    }
    this.generalForm.reset()
  }

  // select an user
  public selectUser = (patient: Patient) => {
    this.patientSelected = patient
  }
  //  add a test
  public addTest = (test: string) => {
    this.testCatalog.push(test)
  }
  // quit a test selected
  public quitTest = (index: number) => {
    this.testCatalog.splice(index, 1)
  }
  // 
  public listenerPatient = (e: any) => {
    switch (e.message) {
      case 'delete':
        this.deletePatient(e.id)
        break;
      case 'edit':
        
        this.formView = true
        this.generalForm.setValue({
          _id: e.data['_id'],
          firstname: e.data['firstname'],
          secondname: e.data['secondname'],
          lastname1: e.data['lastname1'],
          lastname2: e.data['lastname2'],
          age: e.data['age'],
          business: 'bimbo',
          gender: e.data['gender'] ? 'male' : 'female',
          email: e.data['email'],
          phone: e.data['phone'],
        })
        break;

      default:
        break;
    }
  }
  // delete
  public deletePatient = async (id: string) => {
    const res = this.ms.requestManage(await this.ms.delete('patients', id))
    if (res) {
      this.readPatients()
      this.ms.showAlert('Success', 'Patient deleted succefully', 'success')
    }
  }
  // read patients
  public readPatients = async () => {
    const data = this.ms.requestManage(await this.ms.get('patients'))
    if (data) {
      this.patients = data
    }
  }
  // save new template
  public save = async (generalInformation: any, tests: any[]) => {
    if (this.generalForm.value['_id']) {
      const data = this.ms.requestManage(await this.ms.patch('patients', {
        ...generalInformation,
        gender: generalInformation.gender == 'male' ? true : false,
        age: parseInt(generalInformation.age),
        dateOfBirth: '2020-02-02',
        tests: tests
      }))
      if (data) {
        this.readPatients()
        this.ms.showAlert('Success', 'Patient updated succefully', 'success')
      }
    } else {
      // create
      
      let data = this.ms.requestManage(await this.ms.post('patients', {
        ...generalInformation,
        gender: generalInformation.gender == 'male' ? true : false,
        age: parseInt(generalInformation.age),
        tests: tests
      }))
      if (data) {
        this.patients.push({ ...data })
        this.ms.showAlert('Success', 'Patient created succefully', 'success')
      }

    }
    this.resetAll();
  }
  // read templetes
  public readTemplates = async () => {
    const data = this.ms.requestManage(await this.ms.get('templates'))
    if (data) {
      this.templates = data
      for (let index = 0; index < this.templates.length; index++) {
        this.templates[index]['selected'] = false

      }

    }
  }
  // extract some atribute
  public extractAtribute = (data: any[], name: string) => {
    return data.map(el => el[name])
  }
  // get selecteds
  public getTemplatesSelecteds = () => {
    this.tests = this.extractAtribute(this.templates.filter(el => el['selected']),'_id')
    
  }
  // get detail
  public getDetail=async(patient:Patient)=>{
    this.patientSelected=patient
    const data = this.ms.requestManage(await this.ms.get('patients/'+patient._id))
    if (data) {
      this.testList=data.tests
    }
  }
  // read results
  // public readResults = async () => {
  //   const data = this.ms.requestManage(
  //     await this.ms.get(`reports?startDate=${this.pagination.startDate}&endDate=${this.pagination.endDate}&page=${this.pagination.page}`))
  //   if (data) {
  //     this.results = data
  //   }
  // }
  // format date
  public concatZero(number:number):string{
    return number<10? '0'+number:''+number
  }
  
  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService) { 
    
  }

  ngOnInit(): void {
    this.readPatients()
    this.readTemplates()
    const date = new Date();
    this.pagination.startDate=`${date.getFullYear()}-${this.concatZero(date.getMonth() + 1)}-${this.concatZero(date.getDate())}`
    this.pagination.endDate=this.pagination.startDate
  }

}
