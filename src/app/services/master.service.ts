import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MasterService {

// functions
public showAlert=(title:string,text:string,icon:any)=>{
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'Continue'
  })
}
// confirm alert
public confirmAlert=(title:string,text:string,button:string,callback:any)=>{
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
  constructor() { }
}
