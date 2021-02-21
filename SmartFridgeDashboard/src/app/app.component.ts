import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';
import { FridgeDataModel, FridgeItem } from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SmartFridgeDashboard';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  identityId = null;

  ngOnInit() {
    onAuthUIStateChange((authSate, authData: CognitoUserInterface) => {
      this.authState = authSate;
      this.user = authData as CognitoUserInterface;
      this.identityId = 'us-east-1:' + authData?.attributes?.sub;
      this.ngZone.run(() => this.cdr.detectChanges()); //https://github.com/aws-amplify/docs/issues/2031
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
