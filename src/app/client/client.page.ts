import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, IonInfiniteScroll } from '@ionic/angular';
import { CamServiceService } from '../service/cam/cam-service.service';
import { PopoverComponent } from '../popover/popover.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Storage } from '@ionic/storage';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: "app-client",
  templateUrl: "./client.page.html",
  styleUrls: ["./client.page.scss"]
})
export class ClientPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  myclient = [];
  actionView: string;
  mylist = [];
  position = '';
  should_cc = '';
  page = 1;
  last_page: number;

  constructor(
    public router: Router,
    public camServ: CamServiceService,
    public popOver: PopoverController,
    public caller: CallNumber,
    private emailComposer: EmailComposer,
    public storage: Storage,
    public login: LoginService
  ) {}

  ngOnInit() {
    this.myclient = [];
    this.login.checking_me().then(x => {
      this.position = x['POSITION'];
      x['POSITION'] === 'AM' ? this.actionView = 'listclient' : this.actionView = 'myclient';
    }).then(()=>{
      this.camServ.getListAm().then(k => {
        this.mylist = this.mylist.concat(k['me']);
        if(this.position === 'AM'){
          this.should_cc = this.mylist[0]['ID_SGM'];
        } else if(this.position === 'SGM'){
          this.should_cc = this.mylist[0]['ID_SM'];
        } else {
          this.should_cc = this.mylist[0]['ID_GM'] !== '' ? this.mylist[0]['ID_GM'] : null;
        }
      })
    }).then(()=>{
      this.actionView === 'listclient' ? this.getListClient() : this.getMyClient();
    })
  }

  async presentPopover(ev: any) {
    console.log(this.actionView);
    const popover = await this.popOver.create({
      component: PopoverComponent,
      componentProps: {
        id: this.actionView
      },
      event: ev,
      cssClass: "popover",
      translucent: true
    });
    popover.onDidDismiss().then(data => {
      if(data.data !== undefined){
        this.myclient = [];
      this.last_page = 0;
      this.page = 1;
      }
      if (data.data === "myclient") {
        this.actionView = "myclient";
        this.getMyClient();
      } else if (data.data === "listclient") {
        this.actionView = "listclient";
        this.getListClient();
      }
    });
    return await popover.present();
  }

  email(v){
    
    this.emailComposer.addAlias('outlook','com.microsoft.android.outlook');
    this.emailComposer.isAvailable().then((c) =>{
      let a = `${v.gender} ${v.firstname} ${v.lastname}`;
      let email = {
        app: 'outlook',
        to: v.email,
        cc: this.should_cc,
        subject: 'Hai '+a,
        body: 'How are you? Nice greetings from me'
      }
 
      
      
      // Send a text message using default options
      this.emailComposer.open(email);
     });
     
     
  }

  seeprofile(item){
    this.router.navigate(['/detailclient', {
      id_client: item.id_client,
      id_client_account: item.id_client_account,
      firstname: item.firstname,
      lastname: item.lastname,
      gender: item.gender !== '' ? item.gender : 'none',
      birthdate: item.birth_date,
      email: item.email,
      typeCompany: item.type_company,
      position: item.position,
      company: item.company,
      photo: item.photo,
      phone: item.phone_number ? item.phone_number : null,
      myclient: this.actionView === 'listclient' ? 'no' : 'yes'
    }]);
  }

  getMyClient() {
    this.camServ.getClientHandling(this.page).then(res => {
        this.myclient = this.myclient.concat(res['data']);
        this.last_page = res['last_page'];
    });
  }

  onPress(index){
    console.log(index);
    // this.myclient[index].choosen  = true;
  }

  getListClient() {
    this.camServ.getClientNotHandling(this.page).then(res => {
      this.myclient = this.myclient.concat(res['data']);
      this.last_page = res['last_page'];
    });
  }

  loadData(event) {
    this.page ++;
    if(this.actionView == 'listclient'){
      this.getListClient();
    } else {
      this.getMyClient();
    }
    setTimeout(()=>{
      event.target.complete();
    },500);
    // setTimeout(() => {
    //   this.page ++;
    //   console.log('Done');
    //   this.getListClient(IonInfiniteScroll);
    //   event.target.complete();

    //   // App logic to determine if all data is loaded
    //   // and disable the infinite scroll
    //   if (this.last_page == this.page) {
    //     event.target.disabled = true;
    //   }
    // }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  calling(value) {
    if (value.phone_number !== "" || value.phone_number) {
      if (value.phone_number.includes("/")) {
        let o = value.phone_number.split(" / ")[0];
        this.caller
          .callNumber(o, true)
          .then(res => console.log("Launched dialer!", res))
          .catch(err => console.log("Error launching dialer", err));
      } else {
        this.caller
          .callNumber(value.phone_number, true)
          .then(res => console.log("Launched dialer!", res))
          .catch(err => console.log("Error launching dialer", err));
      }
    }
  }

  mergename(val) {
    return `${val.gender} ${val.firstname} ${val.lastname}`;
  }
  setprofile(val) {
    return val.gender === "MR"
      ? "assets/icon/manicon.svg"
      : "assets/icon/girlicon.svg";
  }
  setphone(val) {
    return val.includes("/") ? val.split(" / ")[0] : val;
  }
  setposition(val) {
    return val.position ? val.position : "-";
  }
  searchclient(val) {
    if (val.detail.value.length > 2 && val.detail.value !== "") {
      if (this.actionView === "myclient") {
        this.camServ.getClientHandling(this.page,val.detail.value).then(x =>{
          this.myclient = [];
          this.myclient = this.myclient.concat(x['data']);
        })
      } else {
        this.camServ.getClientNotHandling(this.page,val.detail.value).then(x =>{
          this.myclient = [];
          this.myclient = this.myclient.concat(x['data']);
        })
      }
    } else if (val.detail.value === "" && val.detail.value.length < 3) {
      if (this.actionView === "myclient") {
        this.getMyClient();
      } else {
        this.getListClient();
      }
    } else {
      this.myclient = this.myclient;
    }
  }
  gobacktoawalan() {
    this.router.navigateByUrl("transaction");
  }
}
