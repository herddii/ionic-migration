import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, ToastController, MenuController, LoadingController} from "@ionic/angular";
// import {GalleryPage} from "../gallery/gallery";
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login/login.service';

import { Http, RequestOptions, Headers } from '@angular/http';
// import { IonicPage, LoadingController, Events } from 'ionic-angular';
// import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UserOptions } from '../UserOption';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    emailForm: string;
    passwordForm: string;
    usern: string;
    data: any;

  constructor(

    public navCtrl: NavController,
    public loginServ: LoginService,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    public storage: Storage,
    public route: Router

  ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    if(this.emailForm.includes('@')){
      let username = this.emailForm.split('@');
      this.usern = username[0];
    } else {
      this.usern = this.emailForm;
    }
    let unc = {
      email: this.usern+'@mncgroup.com',
      password: this.passwordForm
    }
    this.presentLoadingText();
    this.loginServ.redirect(unc).then(value =>{
      this.storage.set('token',value['token']).then(()=>{
        this.loading.dismiss();
        this.route.navigateByUrl('awalan');
      })
    }).catch((e)=>{
      this.loading.dismiss();
      this.presentAlert();
    })
  }

  async presentLoadingText() {
    let loading = await this.loading.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Wrong username and password',
      buttons: ['OK']
    });

    await alert.present();
  }
}
