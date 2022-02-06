import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http/http.service";
import {ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService} from "primeng/api";
import {RiskType} from "../../../models/type-risk.model";
import {ResponseData} from "../../../models/response.model";

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TypesComponent implements OnInit {

  riskTypes: RiskType[] = [];
  riskType: RiskType = {id: 0, active: true, value: ''};
  loading = true;
  totalRecords = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }
  display = false;


  submittedRegister = false;
  titleModal = 'Guardar tipo';

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

    return this.httpService.getAll<ResponseData<RiskType>>(`type_risks?take=${take}&skip=${skip}`)
      .subscribe(response => {
        this.totalRecords = response.total;
        this.riskTypes = response.data;
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
    this.riskType = {id: 0, active: true, value: ''};
    this.titleModal = 'Guardar tipo';
  }

  onSave() {
    this.submittedRegister = true;
    if (this.riskType.value == "") {
      return;
    }


    if (this.riskType.id === 0) {
      this.httpService.post<any, any>('type_risks', {value: this.riskType.value, active: true})
        .subscribe(() => {
          this.display = false;
          this.riskType.value = '';
          this.titleModal = 'Guardar tipo';
          this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
        });
    } else {
      this.httpService.put<any, any>(`type_risks/${this.riskType.id}`, {value: this.riskType.value, active: true})
        .subscribe(() => {
          this.display = false;
          this.riskType.value = '';
          this.titleModal = 'Guardar tipo';
          this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
        });
    }

  }

  onLoadEdit(value: RiskType) {
    this.titleModal = 'Editar tipo';
    this.riskType = {id: value.id, value: value.value, active: value.active};
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
        this.httpService.delete<{ deleted: number }>(`type_risks/${id}`)
          .subscribe(data => {
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
