import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../../../interfaces/Patient.interface'

@Component({
  selector: 'card-test',
  templateUrl: './card-test.component.html',
  styleUrls: ['./card-test.component.scss']
})
export class CardTestComponent implements OnInit {
  // variables
  @Input() data: Patient = {code:'123456', firstName: 'Juan Carlos', lastName: 'Carrillo',dateOfBirth:'2000-08-08',business:'Bimbo',gender:'male',tests:[] }

  // functions

  // life cycles
  constructor() { }

  ngOnInit(): void {
  }

}
