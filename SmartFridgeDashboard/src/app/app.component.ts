import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';
import { DataService } from './data.service';
import { PicturePopUpComponent } from './picture-pop-up/picture-pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SmartFridgeDashboard';
  user: CognitoUserInterface;
  authState: AuthState;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  identityId = null;

  ngOnInit() {
    this.dataService.user.subscribe((user) => {
      this.user = user;
    });
    this.dataService.authState.subscribe((authState) => {
      this.authState = authState;
    });
    onAuthUIStateChange((authState, authData: CognitoUserInterface) => {
      this.dataService.setAuthState(authState);
      this.dataService.setUser(authData as CognitoUserInterface);
      this.identityId = 'us-east-1:' + authData?.attributes?.sub;
      this.ngZone.run(() => this.cdr.detectChanges()); //https://github.com/aws-amplify/docs/issues/2031
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  expandPicture() {
    this.dialog.open(PicturePopUpComponent, null);
  }
}
