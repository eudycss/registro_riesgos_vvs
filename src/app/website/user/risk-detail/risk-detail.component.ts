import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common'
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../../services/http/http.service";
import {switchMap} from "rxjs/operators";
import {Risk} from "../../../models/risk.model";
import {URL_API} from "../../../utils/app.util";

@Component({
  selector: 'app-risk-detail',
  templateUrl: './risk-detail.component.html',
  styleUrls: ['./risk-detail.component.css']
})


export class RiskDetailComponent implements OnInit {

  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;

  api = '';

  mapTypeId: string = 'SATELLITE';
  map:any;
  mapClickListener:any;
  options: any;

  isLoading = true;

   riskId = 0;
   risk: Risk = {} as Risk;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.api = `${URL_API}/helper/get/`

    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
    this.activatedRoute.params.pipe(
      switchMap((data: Params) => {
        const id = Number(data['id']);
        this.riskId = id;
        return this.httpService.getOne<Risk>(`risks/${id.toString()}`)
      })
    ).subscribe(risk=>{
      this.risk = risk;
      this.lng = Number(risk.longitute);
      this.lat = Number(risk.latitude);
      this.isLoading = !this.isLoading;
    });

  }

  onPrevious(){
    this.location.back();
  }



}
