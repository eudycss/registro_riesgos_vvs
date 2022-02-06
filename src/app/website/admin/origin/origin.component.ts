import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http/http.service";
import {ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService} from "primeng/api";
import {RiskOrigin} from "../../../models/origin-risk.model";
import {ResponseData} from "../../../models/response.model";

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class OriginComponent implements OnInit {

  riskOrigins: RiskOrigin[] = [];
  riskOrigin: RiskOrigin = {id: 0, active: true, value: ''};
  loading = true;
  totalRecords = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }
  display = false;


  submittedRegister = false;
  titleModal = 'Guardar origen';

  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {

  }

  onLazyLoadData(event: LazyLoadEvent) {
    this.loading = true;
    this.loadData(event.rows!, event.first!)
  }

  loadData(take: number, skip: number) {

    return this.httpService.getAll<ResponseData<RiskOrigin>>(`origin_risks?take=${take}&skip=${skip}`)
      .subscribe(response => {
        this.totalRecords = response.total;
        this.riskOrigins = response.data;
        this.loading = false;
        this.lazyLoad = {
          take,
          skip
        }
      });
  }

  onEnter(value: string): void {
    console.log(value)
  }

  showModal() {
    this.display = true;
    this.submittedRegister = false;
    this.riskOrigin = {id: 0, active: true, value: ''};
    this.titleModal = 'Guardar origen';
  }

  onSave() {
    this.submittedRegister = true;
    if (this.riskOrigin.value == "") {
      return;
    }


    if (this.riskOrigin.id === 0) {
      this.httpService.post<any, any>('origin_risks', {value: this.riskOrigin.value, active: true})
        .subscribe(() => {
          this.display = false;
          this.riskOrigin.value = '';
          this.titleModal = 'Guardar origen';
          this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
        });
    } else {
      this.httpService.put<any, any>(`origin_risks/${this.riskOrigin.id}`, {value: this.riskOrigin.value, active: true})
        .subscribe(() => {
          this.display = false;
          this.riskOrigin.value = '';
          this.titleModal = 'Guardar origen';
          this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
        });
    }

  }

  onLoadEdit(value: RiskOrigin) {
    this.titleModal = 'Editar origen';
    this.riskOrigin = {id: value.id, value: value.value, active: value.active};
    this.display = true;
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
      message: '¿Desea eliminar el registro?',
      header: 'Eliminar',
      icon: 'pi pi-info-circle',
      acceptLabel: 'SI',
      rejectLabel: 'NO',
      accept: () => {
        this.httpService.delete<{ deleted: number }>(`origin_risks/${id}`)
          .subscribe(() => {
            this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rechazo', detail: 'Ha rechazado la operación'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelado', detail: 'Ha cancelado la operación'});
            break;
        }
      }
    });

  }
}
