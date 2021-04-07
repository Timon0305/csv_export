import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {error} from 'selenium-webdriver';

const API_BASE_URL = '';
@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(
      private httpClient: HttpClient
  ) { }


    public actionPlaResource(){
      return this.httpClient.get(API_BASE_URL + 'ap/callReport/csv', {
          headers: {
              'Accept' : 'text/csv'
          }
      }).pipe(map(response => response))}

}
