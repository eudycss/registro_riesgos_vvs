import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http/http.service";
import {ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService} from "primeng/api";
import {switchMap} from "rxjs/operators";
import {UnnitSupport} from "../../../models/unnit-support.model";
import {ResponseData} from "../../../models/response.model";

@Component({
  selector: 'app-unit-support',
  templateUrl: './unit-support.component.html',
  styleUrls: ['./unit-support.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UnitSupportComponent implements OnInit {

  unitSupports: UnnitSupport[] = [];
  unitSupport: UnnitSupport = {id: 0, active: true, value: '', code: ''};
  loading = true;
  totalRecords = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }
  display = false;


  submittedRegister = false;
  titleModal = 'Guardar unidad';

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

    this.httpService.getAll<ResponseData<UnnitSupport>>(`unit_supports?take=${take}&skip=${skip}`)
      .subscribe(response => {
        this.totalRecords = response.total;
        this.unitSupports = response.data;
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
    this.unitSupport = {id: 0, active: true, value: '', code: ''};
    this.titleModal = 'Guardar unidad';
  }

  onSave() {
    this.submittedRegister = true;
    if (this.unitSupport.value == "") {
      return;
    }

    if (this.unitSupport.id == 0) {
      this.httpService.post<any, any>('unit_supports',
        {
          value: this.unitSupport.value, active: true,
          code: 'SGR_' + this.unitSupport.value.substring(0, 3).toLocaleUpperCase()
        })
        .subscribe(() => {
          this.display = false;
          this.unitSupport.value = '';
          this.titleModal = 'Guardar unidad';
          this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
        });
    } else {
      this.httpService.put<any, any>(`unit_supports/${this.unitSupport.id}`,
        {
          value: this.unitSupport.value,
          active: this.unitSupport.active,
          code: this.unitSupport.code
        })
        .subscribe(() => {
          this.display = false;
          this.unitSupport.value = '';
          this.titleModal = 'Guardar unidad';
          this.loadData(this.lazyLoad.take, this.lazyLoad.skip);
        });
    }

  }

  onLoadEdit(value: UnnitSupport) {
    this.titleModal = 'Editar unidad';
    this.unitSupport = {id: value.id, value: value.value, active: value.active, code: value.code};
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
        this.httpService.delete<{ deleted: number }>(`unit_supports/${id}`)
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
