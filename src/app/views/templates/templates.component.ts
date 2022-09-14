import { Component, OnInit } from '@angular/core';
import { Template } from '../../interfaces/Template.interface'
import { Test } from '../../interfaces/Test.interface'
import { Validators, FormBuilder } from '@angular/forms';
import { MasterService } from '../../services/master.service'
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  // variables
  public loading:boolean=false
  // 
  public filterTemplatesValue: string = ''
  // 
  public templatesComplete: Template[] = [];
  // 
  public fieldSelected: number = -1
  // 
  public formView: boolean = false
  // all new fields
  public newFields: Test[] = []
  // all templates
  public templates: Template[] = []
  namesForm = this._formBuilder.group({
    _id: ['', []],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    method: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    code: ['', [Validators.minLength(2), Validators.maxLength(10)]],
  });
  fieldsForm = this._formBuilder.group({
    parameter: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    unit: ['', [Validators.minLength(2), Validators.maxLength(10)]],
    reference: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  });

  // functions
  public addFieldsGroup = (form: any) => {
    if (form.valid) {
      if (this.fieldSelected == -1) {
        this.newFields.push({ ...form['value'] })
      } else {
        this.newFields[this.fieldSelected] = { ...form['value'] }
        this.fieldSelected = -1
      }
      this.fieldsForm.reset()
    }
  }
  // reset all forms
  public resetAll = () => {
    this.newFields = []
    this.formView = !this.formView
    this.resetTemplateName()
    this.resetFieldsForm()
  }
  // reset names template
  public resetTemplateName = () => {
    for (let name in this.namesForm.controls) {
      this.namesForm.controls[name].setErrors(null)
    }
    this.namesForm.reset()
  }
  // reset all field forms
  public resetFieldsForm = () => {
    for (let name in this.fieldsForm.controls) {
      this.fieldsForm.controls[name].setErrors(null)
    }
    this.fieldSelected = -1
    this.fieldsForm.reset()

  }
  // save new template
  public save = async (names: any, newFields: any[]) => {
    if (this.namesForm.value['_id']) {
      this.loading=true
      const data = this.ms.requestManage(await this.ms.patch('templates', { ...names, data: newFields }))
      this.loading=false
      if (data) {
        this.readTemplates()
        this.ms.showAlert('Success', 'Template updated succefully', 'success')
      }
    } else {
      // create
      this.loading=true
      let data = this.ms.requestManage(await this.ms.post('templates', { ...names, data: newFields }))
      this.loading=false
      if (data) {
        this.templates.push({ ...data })
        this.ms.showAlert('Success', 'Template created succefully', 'success')
      }

    }
    this.resetAll();
  }
  // read templetes
  public readTemplates = async () => {
    const data = this.ms.requestManage(await this.ms.get('templates'))
    if (data) {
      this.templates = data
      this.templatesComplete = data
    }
  }
  // listener 
  public listenerTemplate = (e: any) => {
    switch (e.message) {
      case 'edit':
        this.resetAll()
        this.namesForm.setValue({
          _id: e.data['_id'],
          name: e.data['name'],
          method: e.data['method'],
          code: e.data['code'] ? e.data['code'] : ''
        })
        this.newFields = e.data['data']
        break;
      case 'delete':
        this.deleteTemplate(e.id)
        break;

      default:
        break;
    }

  }
  // select
  public editParam = (data: Test, index: number) => {
    this.fieldSelected = index
    this.fieldsForm.setValue({ ...data })
  }
  // delete

  public deleteTemplate = async (id: string) => {
    const res = this.ms.requestManage(await this.ms.delete('templates', id))
    if (res) {
      this.readTemplates()
      this.ms.showAlert('Success', 'Template deleted succefully', 'success')
    }
  }
  // filter templates
  public filter = async (filterValue: string, e: any) => {
    filterValue=filterValue.toLowerCase()
    if (e.key == 'Enter') {
      this.templates = this.templatesComplete.filter(el => el.name.toLowerCase().indexOf(filterValue) >= 0)
    }
  }
  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService) { }

  ngOnInit(): void {
    this.readTemplates()
  }

}
