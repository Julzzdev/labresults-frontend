import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/interfaces/Patient.interface';
import { Template } from 'src/app/interfaces/Template.interface';
import { Test } from 'src/app/interfaces/Test.interface';
import { MasterService } from '../../../../services/master.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'card-test',
  templateUrl: './card-test.component.html',
  styleUrls: ['./card-test.component.scss']
})
export class CardTestComponent implements OnInit {
  // variables
  @Input() pendingList: Template[] = []
  // 
  @Input() capturedList: any[] = []
  // user id
  @Input() patientSelected: Patient = {
    firstname: '',
    lastname1: '',
    lastname2: '',
    age: 0,
    dateOfBirth: '',
    business: '',
    gender: false,
    secondname: '',
    email: '',
    phone: '',
    tests: []
  }
  // functions
  public goToCapture = (test: Template, patient: Patient) => {
    
    this.route.navigate(['/results/'+test._id+'/'+patient._id])
  }

  // life cycles
  constructor(private ms: MasterService, private route: Router) { }

  ngOnInit(): void {
  }

}
