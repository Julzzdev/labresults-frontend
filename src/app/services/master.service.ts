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

  // function get
  public get = async (section: string) => {   
    return await axios.get(`${this.host}${section}`, this.headers)
  }
  // functions get id
  public getById = async (section: string,id:string) => {   
    return await axios.get(`${this.host}${section}/${id}`, this.headers)
  }
  // function post
  public post = async (section: string,body:any) => {   
    return await axios.post(`${this.host}${section}`, body,this.headers)
  }
  // functions patch
  public patch = async (section: string,body:any) => {   
    return await axios.patch(`${this.host}${section}/${body['_id'] || body['id']}`, body,this.headers)
  }
  // function delete 
  public delete = async (section: string,id:string) => {   
    return await axios.delete(`${this.host}${section}/${id}`, this.headers)
  }
  // control request
  public requestManage = (res: any) => {
    
    if (res) {

      if (res.status == 200 || res.status == 201) {
        return res.data
      } else {
        this.showAlert('We had a problem', res.error, 'warning')
        return null
      }
    } else {
      this.showAlert('API no response', 'The api did not respond', 'warning')
      return null
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
        callback(true)
      }
    })
  }
  constructor() { 
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  }
}
