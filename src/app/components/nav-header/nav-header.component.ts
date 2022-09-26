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
    isAdmin: false
  }
  // functions
  // log out
  public logout = async () => {
    localStorage.removeItem('tokenLAB')
    this.ms.user = {
      id: '',
      username: '',
      isAdmin: true
    }
    this.router.navigate(['/'])
    
  }
  // 
  public getCookie = async () => {
    
    const res = await this.ms.get('auth/whoami')
    if(res.data){
      this.ms.user = res.data
      this.user = this.ms.user
      if(this.user.isAdmin==false && this.router.url=='/users'){
        this.router.navigate(['/pending'])
      }
    }else{
      // unauthorized token
      this.router.navigate(['/'])
    }
  }
  // life cycles
  constructor(private ms: MasterService, public router: Router) {
    if (this.ms.user.id) {
      // no find info, just take information from service
      this.user = this.ms.user
      if(this.user.isAdmin==false && this.router.url=='/users'){
        this.router.navigate(['/pending'])
      }
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
