import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CamServiceService } from '../../service/cam/cam-service.service';
import { PopoverComponent } from '../../popover/popover.component';


@Component({
  selector: 'app-listam',
  templateUrl: './listam.page.html',
  styleUrls: ['./listam.page.scss'],
})
export class ListamPage implements OnInit {

  myAm = [];

  constructor(
    public router: Router,
    public camServ: CamServiceService,
    public popOver: PopoverController
  ) { }

  ngOnInit() {
    this.getListAm();
  }

  getListAm(){
    this.camServ.getListAm().then(x => {
      this.myAm = this.myAm.concat(x['kerabat']);
    })
  }

  setprofile(val){
    return val.IMAGES === '' ? 'assets/img/noprofile.jpg' : `http://mncmediakit.com/datafile/user/thumb/${val.IMAGES}`;
  }

  gotoreimburse(){
    this.router.navigateByUrl('reimburse');
  }

}
