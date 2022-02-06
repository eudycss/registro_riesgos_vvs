

import {Component, NgZone, OnInit} from '@angular/core';
import {Canton, Country, CreateRisk, Province, Risk} from "../../../models/risk.model";
import {RiskType} from "../../../models/type-risk.model";
import {HttpService} from "../../../services/http/http.service";
import {Message, MessageService} from "primeng/api";
import {ResponseData} from "../../../models/response.model";
import {isValidRisk} from "../../../utils/app.util";
import {Router} from "@angular/router";
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-create-risk',
  templateUrl: './create-risk.component.html',
  styleUrls: ['./create-risk.component.css'],
  providers: [MessageService]
})
export class CreateRiskComponent implements OnInit {

  dateTime = new Date();

  
  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  map:any;
  mapClickListener:any;

  isLoading = true;

  risk: CreateRisk = {
    canton: 0,
    typeRisk: 0,
    country: 0,
    description: "",
    email: "",
    dateNotification: new Date(),
    location: "",
    latitude: "",
    phoneNumber: "",
    province: 0,
    zone: "",
    username: "",
    longitute: ""
  }

  userInfo = {
    name: '',
    lastname: ''
  }

  cantons: Canton[] = [];
  countries: Country[] = [];
  provinces: Province[] = [];

  riskTypes: RiskType[] = [];



  submitted = false;
  multiple = true;
  buttons = false;
  maxFileSize=1000000
  uploadedFiles: any[] = [];
  options: any;

  files: any[] = [];

  overlays: any[] = [];

  constructor(
    private zone: NgZone,
    private httpService: HttpService,
    private messageService: MessageService,
    private router: Router
   
    ) {
    this.lat = 	 0.3413620874499189;
    this.lng = 	-78.21024712670531;
    this.zoom = 18;
    this.mapTypeId = 'SATELLITE';
    this.dateTime.setDate(this.dateTime.getDate() );

  }



  ngOnInit(): void {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };

    this.httpService.getAll<ResponseData<RiskType>>('type_risks').subscribe(response=>{
      this.riskTypes = response.data;
    });

    this.httpService.getAllForkJoin<Country[]>(['countries', 'provinces', 'cantons'])
      .subscribe(response=>{
        console.log(response)
        this.countries = response[0];
        this.provinces = response[1];
        this.cantons = response[2];
      });
    this.isLoading = false;
  }

  onSave(){
    this.submitted = true;
    this.isLoading = true;
    if (this.files.length > 4 ||
      this.userInfo.name == "" ||
      this.userInfo.lastname == "" ||
      !isValidRisk(this.risk)){
      this.showMessage({
        severity: 'error',
        summary: 'Error',
        detail: 'Los datos ingresados son incorrectos!'
      });
      this.isLoading = false;
      return;
    }

    this.risk.username = `${this.userInfo.name} ${this.userInfo.lastname}`;
    this.risk.latitude = this.lat.toString();
    this.risk.longitute = this.lng.toString();

    //console.log(this.risk)
    //console.log(this.uploadedFiles)
   // console.log(this.files)
    this.httpService.post<CreateRisk, Risk>(`risks`, this.risk).subscribe(data=>{
      if (this.files.length > 0){
        this.httpService.postFile(this.files, `risks/upload/${data.id}`)?.subscribe((data)=>{
          this.router.navigate(['/user/risks']).then();
        });
      }
    });

  }


  onSelectProvince({value}: {value: number}){
    this.httpService.getAll<Canton[]>(`cantons?province=${value}`)
      .subscribe(response=>{
        this.cantons = response;
      })
  }

  showMessage(message: Message): void {
    this.messageService.add({
      severity: message.severity,
      summary: message.summary,
      detail: message.detail
    });
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.zoom = 11;
    });
  }


  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
        // Here we can get correct event
        console.log(e.latLng.lat(), e.latLng.lng());
        this.lat = e.latLng.lat()
        this.lng = e.latLng.lng()
      });
    });
  }

  getMapClick(event: any) {
    console.log(event);
  }

  onCancel(){
    this.router.navigate(['/user/risks']).then();
    this.isLoading = !this.isLoading;
  }

  onUpload(event: any){

    this.files = event.currentFiles;


    //for(let file of event.files) {
      //this.uploadedFiles.push(file);
    //}
  }

}
