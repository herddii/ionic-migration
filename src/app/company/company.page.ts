import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CamServiceService } from '../service/cam/cam-service.service';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  
  myCompany = [];
  actionView = 'agency';

  constructor(
    public router: Router,
    public camServ: CamServiceService,
    public popOver: PopoverController
  ) { }

  ngOnInit() {
    this.getCompanyAgency();
  }

  gotodetail(val){
    let nama = val.nama_agencypintu ? val.nama_agencypintu : val.nama_adv;
    this.router.navigate(['/companydet',{
      val: nama
    }])
  }

  async presentPopover(ev: any) {
    const popover = await this.popOver.create({
      component: PopoverComponent,
      componentProps: {
        id: this.actionView
      },
      event: ev,
      cssClass: 'popover',
      translucent: true
    });
    popover.onDidDismiss().then((data)=>{
      console.log(data.data);
      if(data.data === 'agency'){
        this.actionView = 'advertiser';
        this.getCompanyAgency();
      } else if (data.data === 'advertiser'){
        this.actionView = 'agency';
        this.getCompanyAdvertiser();
      } 
    })
    return await popover.present();
  }


  getCompanyAgency(){
    this.myCompany = [];
    this.camServ.getListCompanyAgency().then(x => {
        this.myCompany = this.myCompany.concat(x[0]);
    })
  }

  setprofile(){
    return 'assets/icon/branch.svg';
  }

  getCompanyAdvertiser(){
    this.myCompany = [];
    this.camServ.getListCompanyAdvertiser().then(x => {
      this.myCompany = this.myCompany.concat(x[0]);
    })
  }

  searchclient(val){
    if(val.detail.value.length > 2 && val.detail.value !== ''){
      this.myCompany = this.myCompany.filter(x => {
        if(x.nama_agencypintu){
          return x.nama_agencypintu.toLowerCase().indexOf(val.detail.value.toLowerCase()) > -1;
        } else {
          return x.nama_adv.toLowerCase().indexOf(val.detail.value.toLowerCase()) > -1;
        }
      });
    } else if(val.detail.value === '' && val.detail.value.length < 3){
      this.myCompany = [];
      if(this.actionView === 'agency'){
        this.getCompanyAgency();
      } else {
        this.getCompanyAdvertiser();
      }
    } else{
      this.myCompany = this.myCompany;
    }
  }
  gobacktoawalan(){
    this.router.navigateByUrl('transaction');
  }

}
