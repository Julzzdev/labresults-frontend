import { Component, Input, OnInit } from '@angular/core';
import { Template } from '../../template.interface';

@Component({
  selector: 'card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss']
})
export class CardTemplateComponent implements OnInit {
  // variables
  @Input() data: Template = { name: '', code: '', fields: [] }
  // functions

  // life cycles
  constructor() { }

  ngOnInit(): void {
  }

}
