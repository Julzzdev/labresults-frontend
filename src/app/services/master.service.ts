import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'



@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public host: string = environment.host
  private headers: object = { headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}   }

  // functions
  public get = async (section: string) => {
    debugger
    let x=await axios.get(`${this.host}${section}`, this.headers)
    debugger
    return x
  }
  // control request
  public requestManage = (res: any) => {
    debugger
    if (res) {
      if (res == 200) {
        return res.data
      } else {
        this.showAlert('We had a problem', res.error, 'warning')
      }
    } else {
      this.showAlert('API no response', 'The api did not respond', 'warning')
    }
  }

  // functions
  public showAlert = (title: string, text: string, icon: any) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Continue'
    })
  }
  // confirm alert
  public confirmAlert = (title: string, text: string, button: string, callback: any) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: button,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Success!', '', 'success')
        callback(true)
      }
    })
  }
  constructor() { 
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  }
}
