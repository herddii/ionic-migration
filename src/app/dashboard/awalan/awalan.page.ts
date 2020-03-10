import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {BrandService} from '../../brand.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {  IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: "app-awalan",
  templateUrl: "./awalan.page.html",
  styleUrls: ["./awalan.page.scss"]
})
export class AwalanPage implements OnInit {
  @ViewChild("pageContent") IonContent;
  @ViewChild("barChart") barChart;

  @ViewChild("video") video: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;

  config = {
    direction: "horizontal",
    slidesPerView: 3,
    spaceBetween: 10,
    height: "80px"
  };
  bars: any;
  colorArray: any;
  activebutton: number = 3;
  kategori = [];
  berita = [];
  imageIcon = [];
  clickable = 0;
  a = 0;
  b: any = [];
  c = 0;
  d: any = [];
  e = 0;
  f = [];
  g: any = [];
  h: any = [];
  i = 0;
  j: any = [];
  jk: any = [];
  jl = 0;
  k: any = [];
  kk: any = [];
  kl = 0;
  oldScroll;
  toolbarschange;
  itematas;
  iconatas;
  page = 1;
  youtube = [];
  myId = [];
  id_kategori: number = 3;
  logo: boolean = true;
  duration: any;
  currentTime;

  constructor(
    private brand: BrandService,
    private dom: DomSanitizer,
    public router: Router,
    public login: LoginService,
    public storage: Storage,
    public statusbar: StatusBar,
    public dashboardServ: DashboardService,
    public screen: ScreenOrientation
  ) {
    this.screen.unlock();
  }
  onScroll(ev) {
    if (ev.detail.scrollTop > 30) {
      this.toolbarschange.classList.remove("warna-background-color");
      this.logo = false;
      // this.statusbar.backgroundColorByHexString('#fff');
      this.iconatas.classList.remove("iconputih");
      this.toolbarschange.classList.add("white-background");
      this.iconatas.classList.add("iconabu");
    } else {
      this.logo = true;
      this.toolbarschange.classList.remove("white-background");
      this.iconatas.classList.remove("iconabu");
      this.toolbarschange.classList.add("warna-background-color");
      this.iconatas.classList.add("iconputih");
    }
    this.oldScroll = ev.scrollTop;
  }

  active(val) {
    if (this.activebutton !== val) {
      this.activebutton = val;
      this.berita = [];
      this.getDataBerita();
    }
  }

  getColor3(val) {
    if (val.id_kategori === 3) {
      return "linear-gradient(45deg, rgb(56,2,50), rgb(0,40,66))";
    } else if (val.id_kategori === 5) {
      return "linear-gradient(45deg, rgb(5,1,110), rgb(0,143,129))";
    } else if (val.id_kategori === 1) {
      return "linear-gradient(45deg, rgb(169,3,41), rgb(109,0,25))";
    } else if (val.id_kategori === 2) {
      return "linear-gradient(45deg, rgb(0,103,110), rgb(0,255,111))";
    } else if (val.id_kategori === 6) {
      return "linear-gradient(45deg, rgb(7,235,212), rgb(1,51,47))";
    }
  }

  setActive(v) {
    this.kategori.forEach(b => {
      b.isActive = false;
    });
    v.isActive = true;
    this.id_kategori = v.id_kategori;
    this.getDataBerita();
    console.log(this.kategori);
  }

  transform(val) {
    if (val.toLowerCase().includes("youtube.com")) {
      let v = val;
      let z = v.replace("https://www.youtube.com/watch?v=", "");
      return this.dom.bypassSecurityTrustResourceUrl(
        "https://www.youtube.com/embed/" +
          z +
          "?rel=0&showinfo=0&ecver=1&autoplay=1"
      );
    } else {
      return this.dom.bypassSecurityTrustResourceUrl(val);
    }
  }

  ngOnInit() {
    console.log(this.screen.type);
    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT_PRIMARY);
    this.getDataBerita();
    this.getkategori();
    this.toolbarschange = document.getElementById("toolbar");
    this.itematas = document.getElementById("itematas");
    this.iconatas = document.getElementById("iconatas");
    // this.createBarChart();
    this.menu();
    this.login
      .checking_me()
      .then(x => {
        this.myId = this.myId.concat(x["data"]);
        console.log(this.myId);
      })
      .catch(err => {
        if ((err.status = 401)) {
          this.storage
            .remove("token")
            .then(() => this.router.navigateByUrl("login"));
        }
      });
  }

  showmyname() {
    this.login.checking_me().then(x => {
      return x["NAME"];
    });
  }

  gotologout() {
    this.storage.remove("token").then(() => this.router.navigateByUrl("login"));
  }
  detail(value) {
    console.log(value)
    if(value.id_kategori = 1){
      this.router.navigate([
        "/photoviewer",
        {
          slug: value.slug,
          id_portal: value.id_portal,
          id_kategori: value.id_kategori
        }
      ])
    } else if(value.id_kategori = 2){
      this.router.navigate([
        "/photoviewer",
        {
          slug: value.slug,
          id_portal: value.id_portal,
          id_kategori: value.id_kategori
        }
      ])
    } else {
      this.router.navigate([
        "/detailarticle",
        {
          slug: value.slug,
          id_kategori: value.id_kategori
        }
      ]);
    }
    // this.router.navigate([
    //   "/detailarticle",
    //   {
    //     slug: value.slug,
    //     id_kategori: value.id_kategori
    //   }
    // ]);
  }

  getkategori() {
    this.dashboardServ
      .getKategori()
      .then(item => {
        this.kategori = this.kategori.concat(item);
        this.kategori = this.kategori.filter(
          x =>
            x.id_kategori === 3 ||
            x.id_kategori === 5 ||
            x.id_kategori === 1 ||
            x.id_kategori === 6 ||
            x.id_kategori === 2
        );
      })
      .then(() => {
        this.kategori.forEach(n => {
          n.isActive = false;
        });
        this.kategori[2].isActive = true;
      });
  }

  get_gambar(v) {
    let a = this.canvas.nativeElement;
    let b = this.video.nativeElement;
    a.width = b.videoWidth;
    a.height = b.videoHeight;
    a.getContext("2d").drawImage(b, 0, 0, b.videoWidth, b.videoHeight);
    var img = document.createElement("img");
    img.src = a.toDataURL();
  }

  getVideoImage(src) {
    src = src.replace("https://www.youtube.com/watch?","");
    return this.dom.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/'+src.split('v=')[1]+'/hqdefault.jpg');
  }

  getDataYoutube() {
    this.dashboardServ.getIndexBerita(this.page, 5).then(brandcampaign => {
      this.youtube = this.youtube.concat(brandcampaign["data"]);
    });
  }

  getDataBerita() {
    this.berita = [];
    this.dashboardServ
      .getIndexBerita(this.page, this.id_kategori)
      .then(berita => {
        this.berita = this.berita.concat(berita["data"]);
      });
  }

  getColor(val) {
    if (val.name === "CAM 2") {
      return "#3b2606";
    } else if (val.name === "Saleskit") {
      return "#f82e70";
    } else if (val.name === "Dashboard") {
      return "#09c5bb";
    } else if(val.name === 'SAM Concept'){
      return "#61047a";
    }
  }

  getcolor2(val) {
    return val.name === "test" ? "#000" : "#fff";
  }

  menu() {
    this.imageIcon = this.imageIcon.concat(
      {
        icon: "assets/icon/gift.svg",
        choosen: false,
        active: true,
        name: "CAM 2",
        color: "#9a0034"
      },
      {
        icon: "assets/icon/briefcase.svg",
        choosen: false,
        active: true,
        name: "Saleskit",
        color: "#f82e70"
      },
      // {
      //   icon: "assets/icon/statistics.svg",
      //   choosen: true,
      //   active: false,
      //   name: "Dashboard",
      //   color: "#09c5bb"
      // },
      {
        icon: "assets/icon/gears.svg",
        choosen: true,
        active: false,
        name: "SAM Concept",
        color: "#000"
      },
      // {
      //   icon: "assets/icon/noicon.svg",
      //   choosen: true,
      //   active: false,
      //   name: "test",
      //   color: "#ec225aa"
      // },
      // {
      //   icon: "assets/icon/noicon.svg",
      //   choosen: true,
      //   active: false,
      //   name: "test",
      //   color: "#ec225aa"
      // },
      // {
      //   icon: "assets/icon/noicon.svg",
      //   choosen: true,
      //   active: false,
      //   name: "test",
      //   color: "#ec225aa"
      // },
      // {
      //   icon: "assets/icon/noicon.svg",
      //   choosen: true,
      //   active: false,
      //   name: "test",
      //   color: "#ec225aa"
      // }
    );
  }

  setDate(val) {
    let e = new Date(val);
    return `${e.toLocaleString("default", { month: "short" })} ${this.addZero(
      e.getDate()
    )}, ${e.getFullYear()}`;
  }

  addZero(i) {
    return i < 10 ? `0${i}` : i;
  }

  getImage(v) {
    return v.cover
      ? this.dom.bypassSecurityTrustResourceUrl(
          `http://mncmediakit.com/datafile/portal/thumbnail/${v.id_kategori}/${v.cover}`
        )
      : `http://mncmediakit.com/datafile/portal/${v.id_kategori}/${v.images}`;
  }

  getyoutubeimage(v) {
    return v;
  }

  searchbegin() {
    this.clickable++;
    if (this.clickable % 2 == 0) {
      this.a = 0;
    } else {
      this.a = 1;
    }
  }

  searchbar(ev) {
    console.log(ev.target.value);
    if (ev.target.value != "") {
      this.imageIcon = this.imageIcon.filter(b =>
        b.name.toLowerCase().includes(ev.target.value.toLowerCase())
      );
    } else {
      this.imageIcon = [];
      this.menu();
    }
  }

  // createBarChart() {
  //   this.bars = new Chart(this.barChart.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: ['RCTI', 'MNCTV', 'GTV', 'INEWS'],
  //       datasets: [{
  //         label: 'Viewers in millions',
  //         data: [2.5, 3.8, 10, 6.9],
  //         backgroundColor: ['rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)'], // array should have same number of elements as number of dataset
  //         borderColor: ['rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)'],// array should have same number of elements as number of dataset
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }

  test() {
    this.a = 0;
  }

  gotopage(ev) {
    console.log(ev);
    if (ev.name === "CAM 2") {
      this.router.navigateByUrl("transaction");
      // this.statusbar.backgroundColorByHexString('#fff');
    } else if (ev.name === "Saleskit") {
      this.router.navigateByUrl("saleskit");
    } else if (ev.name === "SAM Concept"){
      this.router.navigateByUrl("samconcept");
    }
    // this.router.navigateByUrl('transaction');
  }
}
