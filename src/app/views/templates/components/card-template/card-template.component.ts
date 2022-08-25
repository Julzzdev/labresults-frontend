import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../interfaces/Template.interface'
import { Validators, FormBuilder } from '@angular/forms';
import { MasterService } from '../../../../services/master.service'
@Component({
  selector: 'card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss']
})
export class CardTemplateComponent implements OnInit {
  // variables
  @Input() data: Template = {_id:'', name: '', code: '', method: '', data: [] }
  // emiter to templates component
  @Output() cardTemplate$: EventEmitter<Object>=new EventEmitter()
  // is editiong or not
  public isEditing: boolean = false
  // 
  namesForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    method: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    code: ['', [ Validators.minLength(2), Validators.maxLength(10)]],
  });
  fieldsForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    units: ['', [Validators.minLength(2), Validators.maxLength(10)]],
    reference: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  });
  // functions
public edit=()=>{
  this.cardTemplate$.emit({message:'edit',data:this.data})
}
  // functions
  public delete=(data:any)=>{
    this.ms.confirmAlert('Delete Template','Are you sure to delete this template?','Delete',(res:boolean)=>{
      if(res){
        
        this.cardTemplate$.emit({message:'delete',id:data._id})
      }
    })
  }
  // life cycles
  constructor(private _formBuilder: FormBuilder,private ms: MasterService) { }

  ngOnInit(): void {
  }

}
