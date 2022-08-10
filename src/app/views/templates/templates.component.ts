import { Component, OnInit } from '@angular/core';
import {Template} from './template.interface'
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  // variables
public templates:Template[]=[
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]},
  {name:'test de un template',code:'tst',fields:[{name:'sangre',unity:'lts',value:'xyz'},{name:'excremento',unity:'pzs',value:'123'}]}
]
  // functions

  // life cycles
  constructor() { }

  ngOnInit(): void {
  }

}
