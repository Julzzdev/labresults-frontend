import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Template } from 'src/app/interfaces/Template.interface';
import { Patient } from '../../interfaces/Patient.interface'
import { MasterService } from '../../services/master.service'
import * as moment from 'moment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  // 
  public contactsComplete: Patient[] = [];
  // 
  public contacts: Patient[] = [];
  // 
  public loading: boolean = false
  // 
  public pagination = { startDate: '', endDate: '', page: 1, numPages: 1 }
  // 
  public pendingList: any[] = []
  // 
  public capturedList: any[] = []
  // 
  public formView: boolean = false

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

  // functions

  // reset all forms
  public resetAll = (samePlace: boolean) => {
    if (!samePlace) {
      this.formView = !this.formView
    }
    this.contacts = this.contactsComplete
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


  // quest delete
  public deleteContact = async (id: any) => {
    this.ms.confirmAlert('Delete contact', 'Are you sure to delete this contact?', 'delete', (res: any) => {
      this.delete(id)
    })
  }
  // delete
  public delete = async (id: string) => {
    const res = this.ms.requestManage(await this.ms.delete('contacts', id))
    if (res) {
      this.readContacts()
      this.ms.showAlert('Success', 'Contact deleted succefully', 'success')
    }
  }

  // save new template
  public save = async (generalInformation: any) => {
    if (this.generalForm.value['_id']) {
      this.loading = true
      const data = this.ms.requestManage(await this.ms.patch('contacts', {
        ...generalInformation,
        gender: generalInformation.gender == 'male' ? true : false,
        age: parseInt(generalInformation.age)
      }))
      this.loading = false
      if (data) {
        this.readContacts()
        this.ms.showAlert('Success', 'Contacts updated succefully', 'success')
      }
    } else {
      // create
      this.loading = true

      let data = this.ms.requestManage(await this.ms.post('contacts', {
        ...generalInformation,
        gender: generalInformation.gender == 'male' ? true : false,
        age: parseInt(generalInformation.age)
      }))
      this.loading = false
      if (data) {
        this.contacts.push({ ...data })
        this.ms.showAlert('Success', 'Contact created succefully', 'success')
      }

    }
    this.resetAll(false);
  }

  // read contacts
  public readContacts = async () => {
    const data = this.ms.requestManage(await this.ms.get('contacts'))
    if (data) {
      this.contacts = data
      this.contactsComplete = this.contacts
    }
  }

  // select contact
  public selectContact = (contact: Patient) => {
    this.formView=true
    this.generalForm.setValue({
      _id: contact._id,
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
  }




  constructor(private _formBuilder: FormBuilder, private ms: MasterService) { }

  ngOnInit(): void {
    this.readContacts()
  }

}
