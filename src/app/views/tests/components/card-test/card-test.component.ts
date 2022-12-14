import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Patient } from 'src/app/interfaces/Patient.interface'
import { Template } from 'src/app/interfaces/Template.interface'
import { MasterService } from '../../../../services/master.service'
import { Router } from '@angular/router'
@Component({
  selector: 'card-test',
  templateUrl: './card-test.component.html',
  styleUrls: ['./card-test.component.scss'],
})
export class CardTestComponent implements OnInit {
  // variables
  @Input() pendingList: any[] = []
  // variable
  public loading: boolean = false
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
    tests: [],
  }
  // 
  @Output() cardEmitter$=new EventEmitter<any>()
  // functions
  public goTo = (
    section: string,
    test: Template,
    patient: Patient,
    isFlat: boolean
  ) => {
    if (section == 'results') {
      this.route.navigate([`/${section}/${test._id}/${patient._id}`])
    } else {
      this.route.navigate([`/${section}/${patient._id}/${isFlat}/1`])
    }
  }
  // send email
  public sendEmail = () => {
    this.cardEmitter$.emit()
    
  }
  // life cycles
  constructor(private ms: MasterService, private route: Router) {}

  ngOnInit(): void {}
}
