import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../../interfaces/users.interface';
import { MasterService } from '../../services/master.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // variables
  public formView = false
  // all templates
  public users: User[] = []
  // names
  userForm = this._formBuilder.group({
    _id: ['', []],
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });

  //  user selected
  public userSelected: number = -1

  // reset all forms
  public reset = () => {
    this.userForm.reset()
    this.formView = !this.formView
    for (let name in this.userForm.controls) {
      this.userForm.controls[name].setErrors(null)
    }
    this.userForm.reset()
  }
  public save = (names: any, password: any) => {
    this.users.push({ ...names, ...password })
  }
  // select an user
  public selectUser = (index: number) => {
    this.userSelected = index
  }
  // update user
  public updateUser = (user: User) => {
    if (this.userForm.valid) {
      this.ms.showAlert('Success !', 'User Updated.', 'success')
      this.userSelected = -1

      const res = this.ms.requestManage(this.ms.patch('auth/users', { ...user }))
      if (res) {
        this.readUsers()
        this.ms.showAlert('Success', 'Patient deleted succefully', 'success')
      }
    } else {
      this.ms.showAlert('Failure !', 'Password, firstName or lastName invalid.', 'warning')
    }
  }
  // delete an user
  public deleteUser = (i: number) => {
    this.ms.confirmAlert('Delete User', 'Do you want to delete this user?', 'delete', (res: any) => {
      if (res) {
        this.users.splice(i, 1)
      }
    })
  }
  // users
  public listenerUser = (e: any) => {
    switch (e.message) {
      case 'delete':

        break;
      case 'edit':

        break;

      default:
        break;
    }
  }
  // readusers
  public readUsers = async () => {
    const data = this.ms.requestManage(await this.ms.get('auth/users'))
    if (data) {
      this.users = data
    }
  }
  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService) { }

  ngOnInit(): void {
    this.readUsers()
  }

}
