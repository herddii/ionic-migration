import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { CalendarModule } from 'ion2-calendar';
import { SharedModule } from './shared.module';
import { NgPipesModule } from 'ngx-pipes';
import { FiletaskmodalPageModule } from './cam/filetaskmodal/filetaskmodal.module';
import { AngularFireModule } from '@angular/fire';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database'; 
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { Camera } from '@ionic-native/camera/ngx';
import { ScrollHideDirective } from './scroll-hide.directive';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import {IonicGestureConfig} from "./IonicGestureConfig";
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
// import { NgCircleProgressModule } from 'ng-circle-progress';
//page contents as modal
import { ModalbuPage } from './modalbu/modalbu.page';
import { ViewimagePage } from './viewimage/viewimage.page';
import { PopoverComponent } from './popover/popover.component';
// import { Push } from '@ionic-native/push/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalsamPage } from './modalsam/modalsam.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyB-5gcv6QJtAPB7XLqEfV0d7XgqGlJddNo",
  authDomain: "migration-9c2f2.firebaseapp.com",
  databaseURL: "https://migration-9c2f2.firebaseio.com",
  projectId: "migration-9c2f2",
  storageBucket: "migration-9c2f2.appspot.com",
  messagingSenderId: "1049489094534",
  appId: "1:1049489094534:web:eec55a73b1906699fb1e07",
  measurementId: "G-9T8M5S3WWT"
};

@NgModule({
  declarations: [
    AppComponent,
    ModalbuPage,
    ViewimagePage, 
    ModalsamPage ,
    PopoverComponent, 
    ScrollHideDirective
  ],
  entryComponents: [
    ModalbuPage,
    ModalsamPage,
    ViewimagePage, 
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    HttpClientModule,
    NgPipesModule,
    // SuperTabsModule.forRoot(),
    FiletaskmodalPageModule,
    HttpModule,
    CalendarModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
    Camera,
    File,
    // Push,
    LocalNotifications,
    Firebase,
    WebView,
    FilePath,
    Base64,
    EmailComposer,
    FileTransfer,
    SocialSharing,
    ScreenOrientation,
    CallNumber,
    PhotoLibrary,
    FileOpener,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
