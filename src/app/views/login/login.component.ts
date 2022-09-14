import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MasterService } from '../../services/master.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // variables 
  userForm = this._formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  // functions
  public logIn = async () => {
    const data = this.ms.requestManage(await this.ms.post('auth/signin', this.userForm.value))
    
    if (data) {
      
      localStorage.setItem('tokenLAB',data)
      const user = await this.ms.get('auth/whoami')
      
      this.ms.user=user.data
      // document.cookie = `{"userId" : "${data.id}"}`
      // this.ms.user = data
      this.router.navigate(['/tests'])
    }
  }
  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService, private router: Router) { }

  ngOnInit(): void {
  }

}
