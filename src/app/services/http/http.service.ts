import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {URL_API} from "../../utils/app.util";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly url = URL_API;

  constructor(
    private http: HttpClient
  ) { }

  getAll<O>(endpoint: string){
    return this.http.get<O>(`${this.url}/${endpoint}`)
  }

  getOne<O>(endpoint: string){
    return this.http.get<O>(`${this.url}/${endpoint}`)
  }

  post<I, O>(endpoint: string, data: I){
    return this.http.post<O>(`${this.url}/${endpoint}`, data);
  }

  put<I, O>(endpoint: string, data: I){
    return this.http.put<O>(`${this.url}/${endpoint}`, data);
  }

  patch<I, O>(endpoint: string, data: I){
    return this.http.patch<O>(`${this.url}/${endpoint}`, data);
  }

  delete<O>(endpoint: string){
    return this.http.delete<O>(`${this.url}/${endpoint}`);
  }

  getAllForkJoin<O>(endpoints: string[]){
    const obs$: Observable<O>[] = [];
    for (const endpoint of endpoints) {
      obs$.push(this.http.get<O>(`${this.url}/${endpoint}`));
    }
    return forkJoin(obs$);
  }

  postFile(files: File[], endpoint: string){
    const formData:FormData = new FormData();
    console.log(files)
    for (const file of files) {
      formData.append('files', file);
    }

    const req = new HttpRequest(
      'POST',
      `${this.url}/${endpoint}`,
      formData,
      {reportProgress: true, responseType: 'json'});
    return this.http.request(req);
  }

}
