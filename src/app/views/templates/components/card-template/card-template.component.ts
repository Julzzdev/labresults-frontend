import { Component, Input, OnInit } from '@angular/core';
import { Template } from '../../../../interfaces/Template.interface'
import {Validators,FormBuilder} from '@angular/forms';

@Component({
  selector: 'card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss']
})
export class CardTemplateComponent implements OnInit {
  // variables
  @Input() data: Template = { name: '', code: '', method:'', data: [] }
  // is editiong or not
 public isEditing:boolean=false
  // 
  namesForm = this._formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
    method: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
    code: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
  });
  fieldsForm = this._formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
    units: ['', [Validators.minLength(2), Validators.maxLength(10)]],
    reference: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
  });
  // functions

  // life cycles
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
