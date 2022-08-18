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
  {name:'test de un template',code:'tst',fields:[{name:'sangre',units:'lts',reference:'xyz'},{name:'excremento',units:'pzs',reference:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',units:'lts',reference:'xyz'},{name:'excremento',units:'pzs',reference:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',units:'lts',reference:'xyz'},{name:'excremento',units:'pzs',reference:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',units:'lts',reference:'xyz'},{name:'excremento',units:'pzs',reference:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',units:'lts',reference:'xyz'},{name:'excremento',units:'pzs',reference:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',units:'lts',reference:'xyz'},{name:'excremento',units:'pzs',reference:'123'}]}
]
namesForm = this._formBuilder.group({
  name: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
  code: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
});
fieldsForm = this._formBuilder.group({
  name: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
  units: ['', [Validators.minLength(2), Validators.maxLength(10)]],
  reference: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
});

  // functions
public addFieldsGroup=(form:any)=>{
  if(form.status=='VALID'){
    this.newFields.push({...form['value']})
    this.fieldsForm.reset()
  }
}
// reset all forms
public resetAll=()=>{
 
  this.newFields=[]
  this.resetTemplateName()
  this.resetFieldsForm()
}
// reset names template
public resetTemplateName=()=>{
  for (let name in this.namesForm.controls) {
    this.namesForm.controls[name].setErrors(null)
  }
  this.namesForm.reset()
}
// reset all field forms
public resetFieldsForm=()=>{
  for (let name in this.fieldsForm.controls) {
    this.fieldsForm.controls[name].setErrors(null)
  }
  this.fieldsForm.reset()
  
}
// save new template
public save=(names:any,newFields:any[])=>{
this.templates.push({...names,fields:newFields})
this.resetAll();
}
  // life cycles
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
