import { Component, OnInit } from '@angular/core';
import {Template} from '../../interfaces/Template.interface'
import {Test} from '../../interfaces/Test.interface'
import {Validators,FormBuilder} from '@angular/forms';
import {MasterService} from '../../services/master.service'
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
public templates:Template[]=[{"_id":"62fc0fb32fc95d50c434f1cd","name":"PRUEBA DE VIH EN SANGRE","method":"Inmunocromatografía","data":[{"parameter":"PRUEBA DE VIH","unit":"","reference":"NO REACTIVO"}]}]
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
// read templetes
public readTemplates=async()=>{
  this.templates= this.ms.requestManage(await this.ms.get('templates'))
}
  // life cycles
  constructor(private _formBuilder: FormBuilder,private ms:MasterService) { }

  ngOnInit(): void {
    this.readTemplates()
  }

}
