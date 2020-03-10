import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { CamServiceService } from './service/cam/cam-service.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  me = [];
  navigate=[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public storage: Storage,
    public fcm: FCM,
    public camServ: CamServiceService,
    public localNotif: LocalNotifications
  ) {
    this.initializeApp();
    this.sideMenu();
    this.statusBar.hide();
    // this.storage.set('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMC4yMi4yNTMuOTc6OTE5MVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1NzA1MzcxNTEsImV4cCI6MTU3MDU0MDc1MSwibmJmIjoxNTcwNTM3MTUxLCJqdGkiOiJ1M09scmd4Y0tBSzZ6Q0w1Iiwic3ViIjo2LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.CRyV1bZPsvox3yX3_sfejNW76hp7ju-rTbRbgzHevww');
  }

  initializeApp() {
    

    this.platform.ready().then(() => {
      this.storage.get('token').then(val =>{
        if(val){
          this.camServ.getMe().then(user =>{
            this.fcm.getToken().then(token => {
              console.log(token);
            });
            this.fcm.onTokenRefresh().subscribe(token => {
              console.log(token);
            });            
            this.fcm.subscribeToTopic('getMessage_'+user['ID_USER']);
        
            this.fcm.onNotification().subscribe(data => {
              console.log('asdasd');
              console.log(data);
              if (data.wasTapped) {
                console.log('Received in background');

              } else {
                if(data.id_cam){
                  this.storage.set('notifcam',data);
                } if(data.id_content){
                  this.storage.set('notifsaleskit',data);
                }
                let date = new Date(data.start_date);
                let getDate = date.getDate();
                let year = date.getFullYear();
                let xc = date.toLocaleString('default', { month: 'short' });
                let tanggal = `${xc}, ${this.addZero(getDate)}-${year}`;
                this.localNotif.schedule({
                  id: data.id_cam,
                  title: data.subject,
                  text: "You've been added to new activity at "+tanggal
                })

                this.localNotif.on('click').subscribe(notificate => {
                  this.router.navigate(['/viewdetail',{
                    id_acti : data.id_activity,
                    id_cam: data.id_cam
                  }]);
                })
                // 
              }
            });
          })
        }
      })
      // this.router.navigateByUrl('awalan');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Chat",
        url   : "/chat",
        icon  : "chatboxes"
      },
      {
        title : "Contacts",
        url   : "/contacts",
        icon  : "contacts"
      },
    ]
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
}
