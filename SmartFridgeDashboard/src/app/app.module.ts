import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';

//https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:e60c14f2-765a-4df5-896d-77e1530fdd64', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_uXBP3sFJL', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '2tng0e42u314eqvuh1jmtps30a',
  },
  Storage: {
    AWSS3: {
      bucket: 'smart-fridge-pictures', //REQUIRED -  Amazon S3 bucket name
      region: 'us-east-1', //OPTIONAL -  Amazon service region
    },
  },
});

//docs.amplify.aws/lib/storage/configureaccess/q/platform/js#customize-object-key-path
https: Storage.configure({
  customPrefix: {
    public: '',
  },
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AmplifyUIAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
