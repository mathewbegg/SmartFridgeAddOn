import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FridgeDataModel } from './data.model';
import { CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import Auth from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  user: BehaviorSubject<CognitoUserInterface> = new BehaviorSubject(null);
  authState: BehaviorSubject<AuthState> = new BehaviorSubject(null);

  getItems(): Observable<FridgeDataModel> {
    const options = {
      headers: {
        Authorization: this.user.value.signInUserSession.idToken.jwtToken,
      },
    };
    return this.http.get(`${environment.apiUrl}`, options).pipe(
      catchError(this.handleDataError),
      map((response) => {
        return { Items: response.body };
      })
    );
  }

  handleDataError(err: HttpErrorResponse): Observable<any> {
    console.error('Error fetching fridge data from endpoint:\n', err);
    return null;
  }

  setUser(user: CognitoUserInterface) {
    this.user.next(user);
  }

  setAuthState(authState: AuthState) {
    this.authState.next(authState);
  }
}
