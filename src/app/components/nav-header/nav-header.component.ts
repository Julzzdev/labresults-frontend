import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service'
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  // variables
  public user: User = {
    id: '',
    username: '',
    isAdmin: ''
  }
  // functions
  // log out
  public logout = async () => {
    localStorage.removeItem('tokenLAB')
    this.ms.user = {
      id: '',
      username: '',
      isAdmin: ''
    }
    this.router.navigate(['/'])
    
  }
  // 
  public getCookie = async () => {
    const res = await this.ms.get('auth/whoami')
    this.ms.user = res.data
    this.user = this.ms.user
    
  }
  // life cycles
  constructor(private ms: MasterService, public router: Router) {
    if (this.ms.user.id) {
      // no find info, just take information from service
      this.user = this.ms.user
    } else {
      if (localStorage.getItem('tokenLAB')) {
        // if reload the page
        this.getCookie()
        
      } else {
        // if don't have token
        this.router.navigate(['/'])
      }

    }
  }

  ngOnInit(): void {

  }

}
