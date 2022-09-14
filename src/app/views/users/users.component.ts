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
  public loading:boolean=false
  // 
  public usersComplete: User[] = [];
  // 
  public filterValue: string = ''
  // 
  public formView = false
  // all templates
  public users: User[] = []
  // names
  userForm = this._formBuilder.group({
    id: ['', []],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    isAdmin: [false, [Validators.required]],
    darkMode: [false, [Validators.required]],
    password: ['', []],
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
    this.userForm.setValue({
      id: '',
      username: '',
      isAdmin: false,
      darkMode: false,
      password: '',
    })
    this.userForm.get('password')?.addValidators([Validators.required])
  }
  // save new template
  public save = async (form: any) => {
    if (this.userForm.value['id']) {
      this.loading=true
      const data = this.ms.requestManage(await this.ms.patch('auth/users', {
        ...form
      }))
      this.loading=false
      if (data!=null) {
        this.readUsers()
        this.ms.showAlert('Success', 'User updated succefully', 'success')
      }
    } else {
      // create
      this.loading=true
      let data = this.ms.requestManage(await this.ms.post('auth/signup', {
        ...form,
      }))
      this.loading=false
      if (data) {
        this.users.push({ ...data })
        this.ms.showAlert('Success', 'Patient created succefully', 'success')
      }

    }
    this.reset();
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
        this.ms.showAlert('Success', 'User deleted succefully', 'success')
      }
    } else {
      this.ms.showAlert('Failure !', 'Password or user name invalid.', 'warning')
    }
  }
// filter templates
public filter = async (filterValue: string, e: any) => {
  filterValue=filterValue.toLowerCase()
  if (e.key == 'Enter') {
    this.users = this.usersComplete.filter(el => el.username.toLowerCase().indexOf(filterValue) >= 0)
  }
}
  // users
  public listenerUser = (e: any) => {

    switch (e.message) {
      case 'delete':
        this.deleteUser(e.id)
        break;
      case 'edit':
        this.reset()
        this.userForm.setValue({
          id: e.data['id'],
          username: e.data['username'],
          isAdmin: e.data['isAdmin'],
          darkMode: e.data['darkMode'],
          password: '',
        })
        this.userForm.get('password')?.clearValidators()
        break;
      default:
        break;
    }
  }
  // read users
  public readUsers = async () => {
    const data = this.ms.requestManage(await this.ms.get('auth/users'))
    if (data) {
      this.users = data
      this.usersComplete = data
    }
  }
  // delete
  public deleteUser = async (id: string) => {
    const res = this.ms.requestManage(await this.ms.delete('auth/users', id))
    if (res!=null) {
      this.readUsers()
      this.ms.showAlert('Success', 'Template deleted succefully', 'success')
    }
  }
  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService) { }

  ngOnInit(): void {
    this.readUsers()
  }

}
