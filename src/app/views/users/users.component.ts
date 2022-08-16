import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from './users.interface';
import { MasterService } from '../../services/master.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // variables
  // all templates
  public users: User[] = [
    { firstName: 'Juan Carlos', lastName: 'carrillo', password: '12345' },
    { firstName: 'Juan Carlos', lastName: 'carrillo', password: '12345' }
  ]
  // names
  namesForm = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  // settings
  passwordForm = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  //  user selected
  public userSelected: number = -1


  // reset all forms
  public reset = (stepper: any) => {
    stepper.reset()
    this.namesForm.reset()
    this.passwordForm.reset()
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
    this.namesForm.setValue({ firstName: user.firstName, lastName: user.lastName })
    this.passwordForm.setValue({ password: user.password })
    if (this.namesForm.valid && this.passwordForm.valid) {
      this.ms.showAlert('Success !', 'User Updated.', 'success')
      this.userSelected = -1
    } else {
      this.ms.showAlert('Failure !', 'Password, firstName or lastName invalid.', 'warning')
    }
  }
  // delete an user
  public deleteUser = (i:number) => {
    this.ms.confirmAlert('Delete User', 'Do you want to delete this user?', 'delete',(res:any) => {
      if(res) {
        this.users.splice(i, 1)
      }
    })
  }
  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService) { }

  ngOnInit(): void {
  }

}
