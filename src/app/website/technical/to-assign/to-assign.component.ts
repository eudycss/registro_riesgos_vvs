import { Component, OnInit } from '@angular/core';
import {Risk} from "../../../models/risk.model";
import {RiskOrigin} from "../../../models/origin-risk.model";
import {RiskLevel} from "../../../models/level-risk.model";
import {HttpService} from "../../../services/http/http.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {ResponseData} from "../../../models/response.model";
import {UnnitSupport} from "../../../models/unnit-support.model";

@Component({
  selector: 'app-to-assign',
  templateUrl: './to-assign.component.html',
  styleUrls: ['./to-assign.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ToAssignComponent implements OnInit {

  risks: Risk[] = [];

  unitSupports: UnnitSupport[] = [];

  riskSelected:Risk = {} as Risk;
  titleModal = 'Historial';
  loading = true;
  totalRecords = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }

  unitSelected:number = 0;
  supportSelected:number = 0;

  display = false;
  display2 =  false;

  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {


    this.httpService.getAll<ResponseData<UnnitSupport>>(`unit_supports`).subscribe(response=>{
      this.unitSupports = response.data;
    })

  }


  onLazyLoadData(event: LazyLoadEvent) {
    this.loading = true;
    this.loadData(event.rows!, event.first!)
  }

  loadData(take: number, skip: number) {
    this.httpService.getAll<ResponseData<Risk>>(`risks/by/status/2?take=${take}&skip=${skip}`)
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

  onSave(){
    this.httpService.
    put(
      `risks/assigned_status/${this.riskSelected.id}/${this.unitSelected}/${this.supportSelected}`,
      {}).subscribe(()=>{
      this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
      this.display2 = false;
      this.unitSelected = 0;
      this.supportSelected = 0;
    });
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
