import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FridgeDataModel } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<FridgeDataModel> {
    return this.http
      .get(`${environment.apiUrl}/Data`)
      .pipe(catchError(this.handleDataError));
  }

  handleDataError(err: HttpErrorResponse): Observable<any> {
    console.error('Error fetching fridge data from endpoint:\n', err);
    return null;
  }
}
