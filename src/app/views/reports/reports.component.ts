import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { NgxQrcodeElementTypes,NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  // variable
  public isFlat:boolean=false
  // 
  public loading:boolean=false
  // 
  public userId: string = ''
  // 
  public id: string = ''
  // 
  public data=[]
  // 
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';
  // functions
  // get detail
  public getDetail = async (id: string) => {
    const data = this.ms.requestManage(await this.ms.get('reports/patient/' + id))
    if (data) {
      
      this.data=data
    }

  }
  
  // life cycles
  constructor(private route: ActivatedRoute, private ms: MasterService) {
    this.userId = this.route.snapshot.params['userId']
    this.isFlat = this.route.snapshot.params['isFlat']=='true'?true:false
  }

  ngOnInit(): void {
    this.getDetail(this.userId)
  }

}
