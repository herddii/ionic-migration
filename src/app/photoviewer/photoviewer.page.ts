import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../service/dashboard/dashboard.service';
@Component({
  selector: 'app-photoviewer',
  templateUrl: './photoviewer.page.html',
  styleUrls: ['./photoviewer.page.scss'],
})
export class PhotoviewerPage implements OnInit {
  @ViewChild('slider',{read: ElementRef})slider: ElementRef;
  info = [];
  photo = [];
  number: number
  // config = {
  //   zoom: {
  //     maxRatio: 3
  //   },
  //   allowTouchMove: false,
  //   touchMoveStopPropagation: true,
  //   passiveListeners: false,
  //   slidePrevClass: 'swiper-button-prev',
  //   slideNextClass: 'swiper-button-next'
  // };
  constructor(
    public screen: ScreenOrientation,
    public locate: Location,
    public platform: Platform,
    public router: Router,
    public dashboardServ: DashboardService,
    public route: ActivatedRoute
  ) { 

    

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.info = [];
      this.number = params.id_kategori;
      this.info = this.info.concat(params);
      console.log({params: params, info: this.info, number: this.number})
    });
    this.photo = [];
    this.getDataFoto();
    this.platform.backButton.subscribe(()=>{
      this.screen.unlock();
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
      this.router.navigateByUrl('awalan');
    })
    this.screen.unlock();
    this.screen.lock(this.screen.ORIENTATIONS.LANDSCAPE);
  }

  gobacktoawalan(){
    this.screen.unlock();
    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
    this.router.navigateByUrl('awalan');
  }

  getDataFoto(){
    this.dashboardServ.getFoto(this.info[0].id_portal).then(info => this.photo = this.photo.concat(info));
  }

}
