import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    public storage: Storage,
    public route: Router,
    public login: LoginService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.storage.get('token').then(val =>{
      if(val){
        this.login.checking_me().then(x =>{
          this.storage.set('identitas',x['data'])
          this.route.navigateByUrl('awalan');
        }).catch(err => this.presentAlert());
      } else {
        this.route.navigateByUrl('login');
      }
    });
    }

    async presentAlert() {
      const alert = await this.alertCtrl.create({
        message: 'Sorry, You Have to Login Again',
        buttons: [{
          text: 'Okay',
          handler: () => {
            this.route.navigateByUrl('login');
          }
        }]
      });
  
      await alert.present();
    }
  

}
