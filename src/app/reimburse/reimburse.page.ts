import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CamServiceService } from '../service/cam/cam-service.service';
import { LoginService } from '../service/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-reimburse',
  templateUrl: './reimburse.page.html',
  styleUrls: ['./reimburse.page.scss'],
})
export class ReimbursePage implements OnInit {
  loadview = true;
  ketut = [];
  reimburse = [];
  duitotal = [];
  totalcost : number;
  saldo : number;
  kerabat = [];
  me = [];
  config = {
    direction: "horizontal",
    slidesPerView: 1.3,
    spaceBetween: 10,
    height: 400
  };
  slideOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  report = [];
  monthsList = [
    {
    id: 1,
    month: 'January'
    },
    {
      id: 2,
      month: 'February'
    },
    {
      id: 3,
      month: 'March'
    },
    {
      id: 4,
      month: 'April'
    },
    {
      id: 5,
      month: 'May'
    },
    {
      id: 6,
      month: 'June'
    },
    {
      id: 7,
      month: 'July'
    },
    {
      id: 8,
      month: 'August'
    },
    {
      id: 9,
      month: 'September'
    },
    {
      id: 10,
      month: 'October'
    },
    {
      id: 11,
      month: 'November'
    },
    {
      id: 12,
      month: 'December'
    }];
    account = [];

  constructor(
    public camServ: CamServiceService,
    public loginServ: LoginService,
    public route: Router,
    public actRoute: ActivatedRoute,
    public status: StatusBar,
    public locate: Location
  ) { 
    this.actRoute.params.subscribe(g => {
      this.account = this.account.concat(g);
    })
    this.status.backgroundColorByHexString('#fff');
  }

  ngOnInit() {
      this.getPlafond();
      this.getReimburse(); 
      this.getListAm();
      this.getReportMonth();
    // this.status.backgroundColorByHexString('#fff');
  }

  async getPlafond(){
    console.log(this.account);
    await this.camServ.getPlafond(this.account[0].userid).then((x) =>{
      this.ketut = this.ketut.concat(x);
      // console.log(x)
      console.log(x)
    })
  }

  async getReimburse(){
    await this.camServ.getReimburse(this.account[0].userid).then((y)=>{
      this.reimburse = this.reimburse.concat(y['data']);
      console.log(y);
    })
    if(this.reimburse.length > 0){
      await this.reimburse.forEach((v)=>{
        this.duitotal = this.duitotal.concat(v.cost);
      })
      let bb = this.duitotal.reduce((total,num)=>{
        return total + num;
      })
      this.totalcost = bb;
      console.log(this.ketut);
      this.saldo = parseInt(this.ketut[0]['limit']) - this.totalcost;
    } else {
      this.totalcost = 0;
      this.saldo = parseInt(this.ketut[0]['limit']);
    }
    // this.saldo = parseInt(this.ketut[0]['limit']) - this.totalcost;
  }

  async getReportMonth(){
    await this.camServ.getReportMonthly(this.account[0].userid).then(set =>{
      let arr = [];
      arr = arr.concat(set);
      console.log(arr);
      this.report = Array.from(
        arr.reduce(
          (m,o) =>{
            let t = m.get(o.bulan) || {};
            Object.keys(o).forEach( k =>{
              if(Array.isArray(o[k])){
                t[k] = t[k] || [];
                o[k].forEach(v => t[k].includes(v) || t[k].push(v));
              } else if(t[k] !== o[k]){
                t[k] = o[k];
              }
            })
            return m;
          },
          this.monthsList.reduce((m,o) => m.set(o.id, Object.assign({}, o)), new Map)
        ).values()
      )
    }).then(()=>{
      console.log(this.report);
    })
  }

  getJumlah(e){
    return e.jumlah ? e.jumlah.toLocaleString() : 0;
  }
  async getListAm(){
    await this.camServ.getUserAm().then((g)=>{
      this.kerabat = this.kerabat.concat(g);
    }).then(()=> this.loadview = false );
  }

  getDetails(val){
    console.log(val);
    this.route.navigate(['reimburse',{
      userid: val.USER_ID,
      position: val.POSITION
    }]);
  }

  gobacktoawalan(){
    this.locate.back();
    this.status.backgroundColorByHexString('#fff');
  }

  gotoreport(){
    this.route.navigateByUrl('reportcam');
  }

}
