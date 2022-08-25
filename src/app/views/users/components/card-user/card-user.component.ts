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
public editMode:boolean=false
// 
@Input() data: User = {
  "username": "",
  "isAdmin": "",
  "darkMode": ""
}
// emiter to templates component
@Output() cardUser$: EventEmitter<Object> = new EventEmitter()
// functions
public edit=()=>{
  
  this.cardUser$.emit({message:'edit',data:this.data})
}
  // functions
  public delete=(data:any)=>{
    this.ms.confirmAlert('Delete user','Are you sure to delete this user?','Delete',(res:boolean)=>{
      if(res){
        
        this.cardUser$.emit({message:'delete',id:data.id})
      }
    })
  }
// lifecycles
  constructor(private ms: MasterService) { }

  ngOnInit(): void {
  }

}
