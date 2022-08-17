import { Component, OnInit } from '@angular/core';
import {Template} from '../../interfaces/Template.interface'
import {Test} from '../../interfaces/Test.interface'
import {Validators,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  // variables
  // all new fields
public newFields:Test[]=[]
  // all templates
public templates:Template[]=[
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]}
]
namesForm = this._formBuilder.group({
  name: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
  code: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
});
fieldsForm = this._formBuilder.group({
  name: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
  unity: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
  value: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
});
passForm = this._formBuilder.group({
  field: ['stepper',Validators.required]
});

  // functions
public addFieldsGroup=(form:any)=>{
  if(form.status=='VALID'){
    this.newFields.push({...form['value']})
    this.fieldsForm.reset()
  }
}
// reset all forms
public reset=(stepper:any)=>{
  stepper.reset()
  this.namesForm.reset()
  this.templates=[]
  this.fieldsForm.reset()
  this.passForm.setValue({field:'stepper'})
}
public save=(names:any,newFields:any[])=>{
this.templates.push({...names,fields:newFields})
}
  // life cycles
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
