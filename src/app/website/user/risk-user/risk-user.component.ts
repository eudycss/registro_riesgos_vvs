import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http/http.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {Risk} from "../../../models/risk.model";
import {ResponseData} from "../../../models/response.model";

@Component({
  selector: 'app-risk-user',
  templateUrl: './risk-user.component.html',
  styleUrls: ['./risk-user.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RiskUserComponent implements OnInit {

  risks: Risk[] = [];
  titleModal = '';
  loading = true;
  totalRecords = 0;
  display = false;
  lazyLoad = {
    take: 0,
    skip: 0
  }


  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  onLazyLoadData(event: LazyLoadEvent){
    this.loading = true;
    this.loadData(event.rows!, event.first!)
  }

  loadData(take: number, skip: number){
    this.httpService.getAll<ResponseData<Risk>>(`risks/by/user?take=${take}&skip=${skip}`)
      .subscribe(response=>{
        this.totalRecords = response.total;
        this.risks = response.data;
        this.loading = false;
        this.lazyLoad = {take, skip}
      })
  }

  onEnter(value: string): void {
    console.log(value)
  }

  showModal() {
    this.display = true;

    this.titleModal = 'Guardar nivel';
  }



}
