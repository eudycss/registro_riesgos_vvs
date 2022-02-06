import { Component, OnInit } from '@angular/core';
import {Risk} from "../../../models/risk.model";
import {HttpService} from "../../../services/http/http.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {ResponseData} from "../../../models/response.model";

@Component({
  selector: 'app-risk-finalized',
  templateUrl: './risk-finalized.component.html',
  styleUrls: ['./risk-finalized.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RiskFinalizedComponent implements OnInit {

  risks: Risk[] = [];


  riskSelected:Risk = {} as Risk;
  titleModal = 'Historial';
  loading = true;
  totalRecords = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }




  display = false;
  display2 =  false;

  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {


  }


  onLazyLoadData(event: LazyLoadEvent) {
    this.loading = true;
    this.loadData(event.rows!, event.first!)
  }

  loadData(take: number, skip: number) {
    this.httpService.getAll<ResponseData<Risk>>(`risks/by/responsible/4?take=${take}&skip=${skip}`)
      .subscribe((response) => {
        this.totalRecords = response.total;
        this.risks = response.data;
        this.loading = false;
        this.lazyLoad = {
          take,
          skip
        }
      })
  }



  onEnter(value: string): void {
    console.log(value)
  }

  showModal() {
    this.display = true;
    this.titleModal = 'Guardar nivel';
  }

  onSelectRisk(index: number){
    this.riskSelected = this.risks[index];
    this.display = true;
  }

  showModalProcess(index:number){
    this.riskSelected = this.risks[index];
    this.display2 = true;
  }


}
