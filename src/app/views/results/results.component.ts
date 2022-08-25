import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from 'src/app/interfaces/Template.interface';
import { MasterService } from '../../services/master.service'
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  // variables
  public id: string = ''
  // 
  public userId: string = ''
  // 
  public data: Template = {
    name: '',
    method: '',
    data: []
  }
  public slaveForm = this._formBuilder.group({
    parameter: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    reference: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    unit: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    result: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
  });
  // functions
  public getDetail = async (id: string) => {
    const data = this.ms.requestManage(await this.ms.get('templates/' + id))
    if (data) {
      this.data = data
    }
  }
  // return to pending
  public returnPending=()=>{
    this.router.navigate(['/tests'])
  }
  // save
  public save = () => {
    if(this.areValidValues()){
      const data = this.ms.requestManage(this.ms.post('reports',{patient:this.userId ,results:this.data.data,capturedBy:'6303db126b0776813cf25796'}))
      if (data) {
        // success
        this.ms.showAlert('Success', 'Results captured succefully', 'success')
        this.returnPending()
      }
    }else{
      this.ms.showAlert('warning', 'There are some invalid values, please check it and try again.', 'success')
    }
  }
  // check all results are valid
  public areValidValues = (): boolean => {
    for (let index = 0; index < this.data.data.length; index++) {
      debugger
      this.slaveForm.setValue({
        ...this.data.data[index]
      })
      debugger
      if (this.slaveForm.invalid) {
        return false
      }
    }
    return true
  }
  // life cycles
  constructor(private _formBuilder: FormBuilder, private ms: MasterService, private route: ActivatedRoute,private router: Router) {
    this.userId = this.route.snapshot.params['userId']
    this.id = this.route.snapshot.params['id']

    this.getDetail(this.id)
  }

  ngOnInit(): void {


  }

}
