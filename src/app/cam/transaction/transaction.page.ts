import { 
  ViewChild,
  Component, 
  OnInit, ElementRef } from '@angular/core';
import { 
  ActionSheetController, 
  NavController, 
  AlertController, 
  IonSlides, 
  LoadingController, 
  ToastController, 
  PopoverController,
  MenuController } from '@ionic/angular';
import { PopoverComponent } from '../../popover/popover.component';
import { ScrollHideConfig } from '../../scroll-hide.directive';
import { Router } from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Storage } from '@ionic/storage';
import { CamServiceService } from '../../service/cam/cam-service.service';
import { LoginService } from '../../service/login/login.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { FcmService } from '../../service/fcm/fcm.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  
  // @ViewChild(IonSlides) slides: IonSlides;
  // footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  // headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  segment: string;
  loadView: boolean = true;
  clickActive: number;
  number: number = 0;
  date: string;
  myn = new Date();
  showdate : any;
  showtime: any;
  actionView: number = 0;
  dateMulti: String[] = [];
  type: 'object'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
  };
  showButton: boolean = false;
  mycostumarray = [];
  mentah = [];
  loads = 0;
  token;
  //for calendar directive
  eventSource = [];
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  g = [];
  findarray = [];
  nodata: boolean;
  monthSuppose: string;
  dodeletethings : boolean = false;
  me = [];
  width = `${window.screen.width - 20}px`;

  constructor(
    public actionSC: ActionSheetController,
    public router: Router,
    public menu: MenuController,
    public navctrl: NavController,
    public camServ: CamServiceService,
    public alertCtrl: AlertController,
    public storage: Storage,
    public toast: ToastController,
    public loading: LoadingController,
    public login: LoginService,
    public popover: PopoverController,
    public statusbar: StatusBar,
    public fcm: FCM,
    public fcmServ: FcmService,
    ) {
      this.getMe();
    }
    onViewTitleChanged(title) {
      this.viewTitle = title;
    }
    onEventSelected(event) {
      this.ActiveClick(event.id_cam, event.id_activity);
    }
    changeMode(mode) {
      this.calendar.mode = mode;
    }
    gobacktoawalan(){
      this.router.navigateByUrl('awalan');
    }
    today() {
      this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
      let m = ev.selectedTime;
      let xcd = m.toLocaleString('default', { month: 'long' });
      this.monthSuppose = xcd;
    }
    doRefresh(event) {
      this.refresh();
      event.target.complete();
    }
    bukamenu(){
      if(this.menu.open()){
        this.menu.close()
      } else {
        this.menu.open();
      }
    }
    onCurrentDateChanged(event:Date) {
      this.mycostumarray = [];
      let dateChanged = `${event.getFullYear()}-${this.addZero(event.getMonth() + 1)}-${this.addZero(event.getDate())}`;
      this.camServ.getaskLike(dateChanged).then((x)=>{
        this.nodata = (x['data'].length > 0) ? false : true;
        if(x['data'].length > 0){
          for(let i = 0; i < x['data'].length; i++){
            let datefor = new Date(x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].start_date);
            let dateforEnd = new Date(x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].end_date);
            let getmonthname = datefor.toLocaleString('default', { month: 'short'});
            let daysChange = this.addZero(datefor.getDate());
            let yearChange = datefor.getFullYear();
            this.mycostumarray = this.mycostumarray.concat({
              id_activity: x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].id_activity,
              id_cam: x['data'][i]['id_cam'],
              description: x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].description,
              nama_agency: x['data'][i].agencypintu.nama_agencypintu,
              nama_brand: x['data'][i]['cam_brand'][0].brand.nama_brand,
              status: x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].status,
              date: x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].start_date,
              client: x['data'][i]['cam_client'][0].name_userclient_account.edit_namaclient.nama,
              week: x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].week,
              days: `${daysChange} ${getmonthname}, ${yearChange}`,
              HoursD: this.addZero(datefor.getHours()),
              MinutesD: this.addZero(datefor.getMinutes()),
              HoursDEnd: this.addZero(dateforEnd.getHours()),
              MinutesDEnd: this.addZero(dateforEnd.getMinutes()),
              softdelete: 0,
              time: `${datefor.getHours()}:${this.addZero(datefor.getMinutes())}:${this.addZero(datefor.getSeconds())}`,
              month: x['data'][i]['cam_activity'][x['data'][i]['cam_activity'].length - 1].bulan_client_history
            });
          }
        }
        this.mycostumarray = this.mycostumarray.filter(x => x.softdelete === 0);
      }).catch(err => this.login.redirect({username:'adelia.fortiena@mncgroup.com',password:'welcome2017'}).then(tokenew =>{
          this.token = this.token.concat(tokenew['data'].original.access_token);
          this.storage.remove('token');
          this.storage.set('token',tokenew['data'].original.access_token);
          this.onCurrentDateChanged(event);

      }))
      let xcd = event.toLocaleString('default', { month: 'long' });
      this.monthSuppose = xcd;
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
    }

    onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
    };

    gotoadd(){
      this.router.navigateByUrl('addcam');
    }

    ngOnInit() {
      this.callData();
    }

    onChange(ev){
      console.log(ev);
    }

    getMe(){
      this.camServ.getMe().then((me =>{
        this.me.push(me);
      })).then(()=>{
        console.log('hai')
        // this.getNotif();
      })
    }

    // getNotif(){
    //   const options : PushOptions = {
    //     android: {
    //       senderID: '1045091395860',
    //       topics : [`ca`]
    //     },
    //     ios:{
    //       alert: true,
    //       badge: true,
    //       sound: true
    //     }
    //   }

    //   const pushObject: PushObject = this.push.init(options);

    //   pushObject.on('notification').subscribe((notif: any) =>{
    //     console.log(notif);
    //   })
    //   pushObject.on('error').subscribe( error => console.log(error));
    // }

    callData(){
      this.mycostumarray = [];
      var events = [];
      let month = '' + (this.myn.getMonth() + 1);
      let day = '' + this.myn.getDate();
      let year = this.myn.getFullYear();
      const xc = this.myn.toLocaleString('default', { month: 'long' });
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      this.showdate = `${xc} ${day}, ${year}`;
      setInterval(()=>{
        let dateshow = new Date();
        let hour = this.addZero(dateshow.getHours());
        let minute = this.addZero(dateshow.getMinutes());
        let second = this.addZero(dateshow.getSeconds());
        this.showtime = `${hour}:${minute}:${second}`;
      },1000);
      this.camServ.getask().then((data)=>{
        console.log(data);
        setTimeout(()=>{
          this.loads = 1;
        },2000);
        let toUser = [];
        let dataSend = [];
        // console.log(data['data']);
        
        if(data['data'].length > 0){
          
          console.log(toUser);
          this.mentah = this.mentah.concat(data['data']);
          this.mentah = this.mentah.filter( x => x['cam_client']);
          let costuming = data['data'];
          for(let i=0; i < costuming.length; i++){
            let datefor = new Date(costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].start_date);
            let getmonthname = datefor.toLocaleString('default', { month: 'short'});
            let daysChange = this.addZero(datefor.getDate());
            let yearChange = datefor.getFullYear();
            this.mycostumarray = this.mycostumarray.concat({
              id_activity: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].id_activity,
              id_cam_file: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].id_cam_file,
              id_cam: costuming[i]['id_cam'],
              description: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].description,
              nama_agency: costuming[i].agencypintu.nama_agencypintu,
              nama_brand: costuming[i]['cam_brand'][0].brand.nama_brand,
              status: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].status,
              date: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].start_date,
              yearD: yearChange,
              MonthD: datefor.toLocaleString('default', { month: 'short'}),
              DateD: daysChange,
              HoursD: this.addZero(datefor.getHours()),
              MinutesD: this.addZero(datefor.getMinutes()),
              DayD: datefor.toLocaleDateString('locale', { weekday: 'short' }),
              client: costuming[i]['cam_client'][0].name_userclient_account.edit_namaclient.nama,
              week: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].week,
              days: `${daysChange} ${getmonthname}, ${yearChange}`,
              softdelete: 0,
              month: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].bulan_client_history
            });
            let UTCTime = new Date(Date.UTC(datefor.getUTCFullYear(), datefor.getUTCMonth(), datefor.getUTCDate()));
            this.dateMulti = this.dateMulti.concat(costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].days);
            this.eventSource.push({
              title: `${datefor.getHours()}:${this.addZero(datefor.getMinutes())}:${this.addZero(datefor.getSeconds())} | ${costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].description}`,
              startTime: new Date(costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].start_date),
              endTime: new Date(costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].start_date),
              allDay: true,
              id_activity: costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].id_activity,
              id_cam: costuming[i]['id_cam'],
            });
            this.monthSuppose = xc;
          }
          this.mycostumarray = this.mycostumarray.filter(x => x.softdelete === 0);
          
        }
        setTimeout(()=>{
          this.loadView = false;
          this.nodata = (data['data'].length > 0) ? false : true;
          // this.statusbar.backgroundColorByHexString('#485fed');
        },2000);
        // this.fcmServ.sendCamActivity(data['data']).then(success => {
        //   console.log(success);
        // })
      })
    }

    refresh(){
      this.mycostumarray = [];
      this.mentah = [];
      this.loads = 0;
      // this.loadView = true;
      this.callData();
    }

    addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    editCam(val){
      this.router.navigate(['/editcam',{
        id_acti : val.id_activity,
        id_cam: val.id_cam
      }]);
    }

    deleteCam(idcam){
      this.g = [];
      let findar = this.mycostumarray.find(x => x.id_cam = idcam);
      this.findarray = this.findarray.concat(findar);
      this.mycostumarray = this.mycostumarray.filter(x => x !== findar);
      console.log(this.mycostumarray);
      this.nodata = (this.mycostumarray.length > 0) ? false : true;
      this.presentToastDelete('Data is deleted !');
    }

    async presentLoadingWithOptions() {
      const loading = await this.loading.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
    }
  
    async presentToast(text) {
      const toastw = await this.toast.create({
        message: text,
        duration: 2000
      });
      toastw.present();
    }

    async presentPopover(ev: any) {
      const popover = await this.popover.create({
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
        if(data.data === 'month'){
          this.actionView = 1;
          // this.callData();
        } else if (data.data === 'list'){
          this.actionView = 0;
          this.callData();
        } else if (data.data === 'reimburse'){
          // this.statusbar.backgroundColorByHexString('#fff');
          this.router.navigateByUrl('reimburse');
        } 
      })
      return await popover.present();
    }

    async presentToastDelete(text) {
      const toast = await this.toast.create({
        message: text,
        position: 'bottom',
        duration: 5000,
        buttons: [
          {
            text: 'Undo',
            handler: () => {
              this.findarray = [];
            }
          }
        ]
      });
      toast.present();
      toast.onDidDismiss().then((xa)=>{
        if(this.findarray.length > 0){
            this.camServ.deleteCam(this.findarray).then(xx => this.callData());
        } else {
          this.callData();
        }       
      })
    }

    segmentChanged(ev: any) {
      this.segment = ev.detail.value;
    }
    ActiveClick(idac, idcam){
      this.router.navigate(['/viewdetail',{
        id_acti : idac,
        id_cam: idcam
      }]);
    }

    async presentView() {
      const actionSheet = await this.actionSC.create({
        buttons: [{
          text: 'Month',
          // cssClass: this.cssClassForButton(1),
          // icon: 'today',
          handler: () => {
            this.calendar.mode = 'month';
            this.actionView = 1;
          }
        },
        // }, {
        //   text: 'Week',
        //   // icon: 'calendar',
        //   // cssClass: this.cssClassForButton(0),
        //   handler: () => {
        //     this.calendar.mode = 'week';
        //     this.actionView = 1;
        //   }
        // }, {
        //   text: 'Day',
        //   // icon: 'calendar',
        //   // cssClass: this.cssClassForButton(2),
        //   handler: () => {
        //     this.actionView = 1;
        //     this.calendar.mode = 'day';
        //   }
        // },
        {
          text: 'Tasks',
          // icon: 'calendar',
          // cssClass: this.cssClassForButton(2),
          handler: () => {
            this.callData();
            this.actionView = 0;
          }
        }]
      });
      await actionSheet.present();
    }

    scrollToTop() {
      // this.pageContent.scrollToTop();
      // this.pageContent.scrollToTop(0);
      this.showButton=false;
    }

    onScroll(event: any){
      if(event.detail.scrollTop > 150){
        this.showButton=true;
      } else {
        this.showButton=false;
      }
    }


    gotoreimburse(){
      this.router.navigate(['reimburse',{
        userid: this.me[0].data.USER_ID,
        position: this.me[0].data.POSITION
      }])
    }

    cssClassForButton(number){
      let cssClass = '';
      if(number === this.actionView){
        cssClass = 'disable-action-sheet-btns';
      }
    }
  }
