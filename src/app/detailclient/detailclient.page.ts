import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CamServiceService } from '../service/cam/cam-service.service';

@Component({
  selector: "app-detailclient",
  templateUrl: "./detailclient.page.html",
  styleUrls: ["./detailclient.page.scss"]
})
export class DetailclientPage implements OnInit {
  
  // @ViewChild('set') set: ElementRef;
  @ViewChild('Content') content;

  item = [];
  details = [];
  listclientcompany = [];
  setBackground = false;

  constructor(
    public router: ActivatedRoute,
    public camServ: CamServiceService,
    public route: Router,
    public locate: Location
  ) {
    this.router.params.subscribe(params => {
      this.item = [];
      this.item = this.item.concat(params);
      console.log(params)
    });
  }

  ngOnInit() {
    // this.set.nativeElement.style.width = `${window.screen.width}px`;
    this.getdetailclient();
    this.getlistclientcompany();
  }

  onScroll(ev){
    if(ev.detail.scrollTop > 200) {
      this.setBackground = true;
    } else {
      this.setBackground = false;
    }
  }

  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  goedit(item){
    this.route.navigate(['/inputclient',{
      id_client_account: item.id_client_account,
      phone: item.phone,
      photo: item.photo,
      email: item.email
    }])
  }

  getdetailclient() {
    this.camServ.getDetailClient(this.item[0].id_client_account).then(i => {
      this.details = this.details.concat(i);
    });
  }

  getlistclientcompany() {
    this.listclientcompany = [];
    this.camServ.getlistClientCompany(this.item[0].company).then(h => {
      this.listclientcompany = this.listclientcompany.concat(h);
    });
  }

  setposition(val) {
    return val.position ? val.position : "-";
  }

  setimage(item) {
    return item.photo === "man_icon.svg" || item.photo === "girl_icon.svg"
      ? `assets/icon/${item.photo}`
      : `http://mncmediakit.com/datafile/user/thumb/${item.photo}`;
  }

  goback(){
    this.locate.back();
  }

  searchclient(val) {
    if (val.detail.value.length > 2 && val.detail.value !== "") {
      this.listclientcompany = this.listclientcompany.filter(
        x =>
          x.firstname.toLowerCase().indexOf(val.detail.value.toLowerCase()) > -1
      );
    } else {
      this.getlistclientcompany();
    }
  }

  setname(i) {
    return `${i.gender} ${i.firstname} ${i.lastname}`;
  }

  setbirth(i) {
    // console.log(i.birthdate);
    if (i.birthdate !== "0000-00-00") {
      let iz = new Date(i.birthdate);
      return `${iz.toLocaleString("default", {
        month: "short"
      })} ${this.addZero(iz.getDate())}, ${iz.getFullYear()}`;
    } else {
      return "NOT SET";
    }
  }

  addZero(f) {
    if (f < 10) {
      return `0${f}`;
    } else {
      return f;
    }
  }

  setTypeCompany(item) {
    return item.typeCompany !== "AGC" ? "Advertiser" : "Agency";
  }
}
