import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/users.interface';
import { MasterService } from '../../../../services/master.service'
@Component({
  selector: 'card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
// variables
@Input() data: User = {
  "username": "",
  "password": "",
  "isAdmin": "",
  "darkMode": ""
}
// emiter to templates component
@Output() cardUser$: EventEmitter<Object> = new EventEmitter()
// functions
public edit=()=>{
  debugger
  this.cardUser$.emit({message:'edit',data:this.data})
}
  // functions
  public delete=(data:any)=>{
    this.ms.confirmAlert('Delete user','Are you sure to delete this user?','Delete',(res:boolean)=>{
      if(res){
        debugger
        this.cardUser$.emit({message:'delete',id:data._id})
      }
    })
  }
// lifecycles
  constructor(private ms: MasterService) { }

  ngOnInit(): void {
  }

}
