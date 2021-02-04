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

  ngOnInit() {
    onAuthUIStateChange((authSate, authData) => {
      this.authState = authSate;
      this.user = authData as CognitoUserInterface;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
