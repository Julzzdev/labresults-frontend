import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from '../../../../interfaces/Patient.interface'
import { MasterService } from '../../../../services/master.service'
@Component({
  selector: 'card-test',
  templateUrl: './card-test.component.html',
  styleUrls: ['./card-test.component.scss']
})
export class CardTestComponent implements OnInit {
  // variables
  @Input() data: Patient = {
    "secondname": "",
    "phone": "",
    "firstname": "",
    "lastname1": "",
    "lastname2": "",
    "dateOfBirth": "",
    "business": "",
    "gender": true,
    "age": 0,
    "email": "",
    "tests": []
  }
  // emiter to templates component
  @Output() cardPatient$: EventEmitter<Object> = new EventEmitter()
  // functions
  public edit=()=>{
    debugger
    this.cardPatient$.emit({message:'edit',data:this.data})
  }
    // functions
    public delete=(data:any)=>{
      this.ms.confirmAlert('Delete patient','Are you sure to delete this patient?','Delete',(res:boolean)=>{
        if(res){
          debugger
          this.cardPatient$.emit({message:'delete',id:data._id})
        }
      })
    }
  // life cycles
  constructor( private ms: MasterService) { }

  ngOnInit(): void {
  }

}
