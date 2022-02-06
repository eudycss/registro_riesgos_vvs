import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {Risk} from "../../../models/risk.model";
import {HttpService} from "../../../services/http/http.service";
import {ResponseData} from "../../../models/response.model";
import {RiskLevel} from "../../../models/level-risk.model";
import {RiskOrigin} from "../../../models/origin-risk.model";

@Component({
  selector: 'app-to-register',
  templateUrl: './to-register.component.html',
  styleUrls: ['./to-register.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ToRegisterComponent implements OnInit {

  risks: Risk[] = [];

  origins: RiskOrigin[] = [];
  levels: RiskLevel[] = [];

  riskSelected:Risk = {} as Risk;
  titleModal = 'Historial';
  loading = true;
  totalRecords = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }

  originSelected:number = 0;
  levelSelected:number = 0;

  display = false;
  display2 =  false;

  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.httpService.getAllForkJoin<ResponseData<RiskLevel>>(['level_risks', 'origin_risks'])
      .subscribe(response=>{
        this.levels = response[0].data;
        this.origins = response[1].data;
      })

  }


  onLazyLoadData(event: LazyLoadEvent) {
    this.loading = true;
    this.loadData(event.rows!, event.first!)
  }

  loadData(take: number, skip: number) {
    this.httpService.getAll<ResponseData<Risk>>(`risks/by/status/1?take=${take}&skip=${skip}`)
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
      `risks/registered_status/${this.riskSelected.id}/${this.originSelected}/${this.levelSelected}`,
      {}).subscribe(()=>{
        this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
        this.display2 = false;
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
