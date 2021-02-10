import { ChangeDetectorRef, Component } from '@angular/core';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SmartFridgeDashboard';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private cdr: ChangeDetectorRef) {}

  identityId = null;

  ngOnInit() {
    onAuthUIStateChange((authSate, authData: CognitoUserInterface) => {
      this.authState = authSate;
      this.user = authData as CognitoUserInterface;
      this.identityId = 'us-east-1:' + authData?.attributes?.sub;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
