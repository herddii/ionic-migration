import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, IonInfiniteScroll } from '@ionic/angular';
import { CamServiceService } from '../../service/cam/cam-service.service';
import { PopoverComponent } from '../../popover/popover.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Storage } from '@ionic/storage';
import { LoginService } from '../../service/login/login.service';
@Component({
  selector: "app-birthday",
  templateUrl: "./birthday.page.html",
  styleUrls: ["./birthday.page.scss"]
})
export class BirthdayPage implements OnInit {
  myclient = [];
  position = [];
  actionView: string;
  should_cc: string;

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
    this.getData();

    this.login.checking_me().then(x => {
      this.position = x["POSITION"];
      x["POSITION"] === "AM"
        ? (this.actionView = "listclient")
        : (this.actionView = "myclient");
    });
  }

  getData() {
    this.myclient = [];
    this.camServ.getBirthdayClient().then(x => {
      this.myclient = this.myclient.concat(x);
    });
  }

  searchclient(ev) {
    if (ev.detail.value.length > 2 && ev.detail.value !== "") {
      this.camServ.getBirthdayClient(ev.detail.value).then(x => {
        this.myclient = [];
        this.myclient = this.myclient.concat(x);
      });
    } else {
      this.getData();
    }
  }

  email(v) {
    this.emailComposer.addAlias("outlook", "com.microsoft.android.outlook");
    this.emailComposer.isAvailable().then(c => {
      let a = `${v.gender} ${v.firstname} ${v.lastname}`;
      let email = {
        app: "outlook",
        to: v.email,
        cc: this.should_cc,
        subject: "Hai " + a,
        body: "How are you? Nice greetings from me"
      };

      // Send a text message using default options
      this.emailComposer.open(email);
    });
  }

  seeprofile(item) {
    this.router.navigate([
      "/detailclient",
      {
        id_client: item.id_client,
        id_client_account: item.id_client_account,
        firstname: item.firstname,
        lastname: item.lastname,
        gender: item.gender !== "" ? item.gender : "none",
        birthdate: item.birth_date,
        email: item.email,
        typeCompany: item.type_company,
        position: item.position,
        company: item.company,
        photo: item.photo,
        phone: item.phone_number ? item.phone_number : null,
        myclient: this.actionView === "listclient" ? "no" : "yes"
      }
    ]);
  }

  gobacktoawalan() {
    this.router.navigateByUrl("transaction");
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
}
