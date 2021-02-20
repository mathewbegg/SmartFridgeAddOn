import { ChangeDetectorRef, Component } from '@angular/core';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SmartFridgeDashboard';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  identityId = null;
  data: any;

  ngOnInit() {
    onAuthUIStateChange((authSate, authData: CognitoUserInterface) => {
      this.authState = authSate;
      this.user = authData as CognitoUserInterface;
      this.identityId = 'us-east-1:' + authData?.attributes?.sub;
      this.cdr.detectChanges();
    });

    this.dataService.getItems().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
