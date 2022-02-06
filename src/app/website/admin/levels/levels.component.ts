import {Component, OnInit} from '@angular/core';
import {RiskLevel} from "../../../models/level-risk.model";
import {HttpService} from "../../../services/http/http.service";
import {LazyLoadEvent, MessageService, ConfirmationService, ConfirmEventType} from "primeng/api";
import {ResponseData} from "../../../models/response.model";

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class LevelsComponent implements OnInit {

  riskLevels: RiskLevel[] = [];
  riskLevel: RiskLevel = {id: 0, active: true, value: ''};
  loading = true;
  totalRecords = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }
  display = false;


  submittedRegister = false;
  titleModal = 'Guardar nivel';

  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {

  }

  onLazyLoadLevels(event: LazyLoadEvent) {
    this.loading = true;
    this.loadLevels(event.rows!, event.first!)
  }

  loadLevels(take: number, skip: number) {
    return this.httpService.getAll<ResponseData<RiskLevel>>(`level_risks?take=${take}&skip=${skip}`)
      .subscribe(response => {
      this.totalRecords = response.total;
      this.riskLevels = response.data;
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
    this.riskLevel = {id: 0, active: true, value: ''};
    this.titleModal = 'Guardar nivel';
  }

  onSave() {
    this.submittedRegister = true;
    if (this.riskLevel.value == "") {
      return;
    }


    if (this.riskLevel.id === 0) {
      this.httpService.post<any, any>('level_risks', {value: this.riskLevel.value, active: true})
        .subscribe(() => {
          this.display = false;
          this.riskLevel.value = '';
          this.titleModal = 'Guardar nivel';
          this.loadLevels(this.lazyLoad.take, this.lazyLoad.skip);
        });
    } else {
      this.httpService.put<any, any>(`level_risks/${this.riskLevel.id}`, {value: this.riskLevel.value, active: true})
        .subscribe(() => {
          this.display = false;
          this.riskLevel.value = '';
          this.titleModal = 'Guardar nivel';
          this.loadLevels(this.lazyLoad.take, this.lazyLoad.skip);
        });
    }

  }

  onLoadEdit(value: RiskLevel) {
    this.titleModal = 'Editar nivel';
    this.riskLevel = {id: value.id, value: value.value, active: value.active};
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
        this.httpService.delete<{ deleted: number }>(`level_risks/${id}`)
          .subscribe(() => {
            this.loadLevels(this.lazyLoad.take, this.lazyLoad.skip);
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


