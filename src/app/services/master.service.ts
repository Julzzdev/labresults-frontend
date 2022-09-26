import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { User } from '../interfaces/users.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public host: string = environment.host
  // private headers: object = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
  public user:User= {
    id: '',
    username: '',
    isAdmin: false
  }
  // function get
  public get = async (section: string) => {
    
    return await axios.get(`${this.host}${section}`).catch(error=>{
      return error
    })
  }
  // functions get id
  public getById = async (section: string, id: string) => {
    return await axios.get(`${this.host}${section}/${id}`).catch(error=>{
      return error
    })
  }
  // function post
  public post = async (section: string, body: any) => {
    const res=await axios.post(`${this.host}${section}`, body).catch(error=>{
      return error
    })
    
    if(section=='auth/signin'){
      
      axios.defaults.headers.common['Authorization']=`Bearer ${res.data}`
    }
    return res
  }
  // functions patch
  public patch = async (section: string, body: any) => {
    return await axios.patch(`${this.host}${section}/${body['_id'] || body['id']}`, body).catch(error=>{
      return error
    })
  }
  // function delete 
  public delete = async (section: string, id: string) => {
    return await axios.delete(`${this.host}${section}/${id}`).catch(error=>{
      return error
    })
  }
  // control request
  public requestManage = (res: any) => {

    if (res) {

      if (res.status == 200 || res.status == 201) {
        return res.data
      } else {
        
        this.showAlert('We had a problem', res.response.data.message, 'warning')
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
  constructor(private router: Router) {
    axios.defaults.headers.common['Content-Type']='application/json'
    axios.defaults.headers.common['Access-Control-Allow-Origin']='*'
    axios.defaults.headers.common['Authorization']=`Bearer ${localStorage.getItem('tokenLAB')}`
     
    
  }
}
