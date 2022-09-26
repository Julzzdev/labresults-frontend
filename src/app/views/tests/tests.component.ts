import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Template } from 'src/app/interfaces/Template.interface';
import { Patient } from '../../interfaces/Patient.interface'
import { MasterService } from '../../services/master.service'
import * as moment from 'moment';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})

export class TestsComponent implements OnInit {
  // variables
  public isdisabled: boolean = false
  // 
  public isContactSaved: boolean = false
  // 
  public contactsComplete: Patient[] = [];
  // 
  public contacts: Patient[] = [];
  // 
  public loading: boolean = false
  // 
  public patientsComplete: Patient[] = []
  // 
  public templatesComplete: Template[] = [];
  // 
  public filterTemplatesValue: string = ''
  // 
  public filterPatientValue: string = ''
  // 
  public pagination = { startDate: '', endDate: '', page: 1, numPages: 1 }
  // 
  public pendingList: any[] = []
  // 
  public capturedList: any[] = []
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
  public resetAll = (samePlace:boolean) => {
    if(!samePlace){
      this.formView = !this.formView
    }
    this.templatesComplete.forEach(template => {
      template.selected = false
    })
    this.templates = this.templatesComplete
    this.isContactSaved = false
    this.isdisabled=false
    this.toggleDisabled(false)
    this.reset()
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
  // listener of patients card
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
    const data = this.ms.requestManage(await this.ms.get(`patients?startDate=${this.pagination.startDate}&endDate=${this.pagination.endDate}&page=${this.pagination.page}`))
    if (data) {
      this.patients = data
      this.patientsComplete = data
    }
  }
  // save new template
  public save = async (generalInformation: any, tests: any[]) => {
    if (this.generalForm.value['_id']) {
      this.loading = true
      const data = this.ms.requestManage(await this.ms.patch('patients', {
        ...generalInformation,
        gender: generalInformation.gender == 'male' ? true : false,
        age: parseInt(generalInformation.age),
        tests: tests
      }))
      this.loading = false
      if (data) {
        this.readPatients()
        this.ms.showAlert('Success', 'Patient updated succefully', 'success')
      }
    } else {
      // create
      this.loading = true

      let data = this.ms.requestManage(await this.ms.post('patients', {
        ...generalInformation,
        gender: generalInformation.gender == 'male' ? true : false,
        age: parseInt(generalInformation.age),
        tests: tests
      }))
      this.loading = false
      if (data) {
        this.patients.push({ ...data })

        if (this.isContactSaved) {
          this.saveContact({
            ...generalInformation,
            gender: generalInformation.gender == 'male' ? true : false,
            age: parseInt(generalInformation.age),
          })
        } else {
          this.ms.showAlert('Success', 'Patient created succefully', 'success')
        }
      }

    }
    this.resetAll(false);
  }
  // read templetes
  public readTemplates = async () => {
    const data = this.ms.requestManage(await this.ms.get('templates'))
    if (data) {
      this.templates = data
      for (let index = 0; index < this.templates.length; index++) {
        this.templates[index]['selected'] = false
      }
      this.templatesComplete = this.templates

    }
  }
  // read contacts
  public readContacts = async () => {
    const data = this.ms.requestManage(await this.ms.get('contacts'))
    if (data) {
      this.contacts = data
      this.contactsComplete = this.contacts

    }
  }
  // read contacts
  public saveContact = async (patient: Patient) => {
    const data = this.ms.requestManage(await this.ms.post('contacts', patient))
    if (data) {
      this.ms.showAlert('Success', 'Patient created and saved like contact succefully', 'success')
      this.readContacts()
    }
  }
  // select contact
  public selectContact = (contact: Patient) => {
    
    this.generalForm.setValue({
      _id: '',
      firstname: contact.firstname,
      secondname: contact.secondname || '',
      lastname1: contact.lastname1,
      lastname2: contact.lastname2 || '',
      age: contact.age,
      dateOfBirth: moment(contact.dateOfBirth).format('yyyy-MM-DD'),
      business: contact.business,
      gender: contact.gender ? 'male' : 'female',
      email: contact.email,
      phone: contact.phone,
    });
    this.toggleDisabled(true)
    this.isContactSaved = false
    this.isdisabled = true
  }
  // toggleDisabled
  public toggleDisabled=(value:boolean)=>{
    for (const key in this.generalForm.value) {
      if(key != '_id' && key != 'gender'){
        (document.getElementById(key) as HTMLInputElement).disabled = value
      }
      
    }
  }
  // extract some atribute
  public extractAtribute = (data: any[], name: string) => {
    return data.map(el => el[name])
  }
  // get selecteds
  public getTemplatesSelecteds = () => {
    this.tests = this.extractAtribute(this.templates.filter(el => el['selected']), '_id')

  }
  // get detail
  public getDetail = async (patient: Patient) => {
    this.patientSelected = patient
    this.pendingList = []
    this.capturedList = []
    const data = this.ms.requestManage(await this.ms.get('patients/' + patient._id))
    const reports = this.ms.requestManage(await this.ms.get('reports/patient/' + patient._id))
    if (data) {

      // patient=data[0].patient
      this.pendingList = data.tests
      this.capturedList = reports
      // edit pending list
      for (let index = 0; index < this.pendingList.length; index++) {
        const captured = this.capturedList.findIndex((el: any) => this.pendingList[index]['_id'] == el.results[0]['testId']['_id'])
        this.pendingList[index]['isCaptured'] = captured >= 0 ? true : false
      }
    }
  }
  // filter templates
  public filter = async (filterValue: string, section: string, e: any) => {
    filterValue = filterValue.toLowerCase()
    if (e.key == 'Enter') {
      if (section == 'templates') {
        this.templates = this.templatesComplete.filter(el => el.name.toLowerCase().indexOf(filterValue) >= 0)
      } else {
        this.patients = this.patientsComplete.filter(el => el.firstname.toLowerCase().indexOf(filterValue) >= 0 || el.lastname1.toLowerCase().indexOf(filterValue) >= 0)
      }

    }
  }


  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService) {

  }

  ngOnInit(): void {
    this.readContacts()
    this.readTemplates()
    this.pagination.startDate = moment().format('yyyy-MM-DD')
    this.pagination.endDate = this.pagination.startDate
    this.readPatients()
  }

}
