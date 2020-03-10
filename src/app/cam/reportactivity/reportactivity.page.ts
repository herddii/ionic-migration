import { Component, OnInit } from '@angular/core';
import { CamServiceService } from '../../service/cam/cam-service.service';
import { Location } from '@angular/common';
import { UniquePipe } from 'ngx-pipes';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-reportactivity',
  templateUrl: './reportactivity.page.html',
  styleUrls: ['./reportactivity.page.scss'],
})
export class ReportactivityPage implements OnInit {

  jumlahreport: number = 0;
  jumlahplan: number = 0;
  accounthandling = [];
  gm = [];
  sm = [];
  sgm = [];
  ae = [];
  me = [];
  infouser = [];
  config = {
    slidesPerView: 1.3,
    spaceBetween: 10
  };
  mentah = [];
  mycustomarray = [];
  constructor(
    public camServ: CamServiceService,
    public locate: Location,
    public unique: UniquePipe,
    public login: LoginService
  ) { }

  ngOnInit() {
    // this.jumlahReport();
    // this.jumlahPlan();
    // this.getDataTask();
    this.getAccount();
    this.checkingme();
    
  }


  checkingme(){
    this.login.checking_me().then(me => this.me = this.me.concat({
      me: me['data'].USER_NAME,
      position: me['data'].POSITION
    }));
  }

  getUserinfo(value){
    this.camServ.checkingpeople(value).then(x => this.infouser = this.infouser.concat(x));
  }

  // jumlahReport(){
  //   this.camServ.getReportCount().then(x => this.jumlahreport = x[0].jumlah_report);
  // }
  jumlahPlan(val){
    this.camServ.getPlanCount(val.USER_ID, val.POSITION).then(x => x[0].jumlah_plan);
  }

  getAccount(){
    this.camServ.accounthandling().then(x => {
      this.accounthandling = this.accounthandling.concat(x);
      let a = [];
      a = a.concat(x);
      let ae = a.map(b => b.staff);
      ae = this.unique.transform(ae);

      console.log(ae);
      let sgm = a.map(b => b.head);
      sgm = this.unique.transform(sgm);
      let sm = a.map(b => b.manager);
      sm = this.unique.transform(sm);
      let gm = a.map(b => b.gm);
      gm = this.unique.transform(gm)
      this.ae = this.ae.concat(ae);
      this.sgm = this.sgm.concat(sgm);
      this.sm = this.sm.concat(sm);
      this.gm = this.gm.concat(gm);
    }).then(()=> {
      this.getUserinfo(this.ae);
      this.getDataTask(this.ae);
    });
  }

  gobacktoawalan(){
    this.locate.back();
  }

  getDataTask(data){
    this.camServ.getaskreport(data).then((data)=>{
      console.log(data);
      setTimeout(()=>{
      },2000);
      let toUser = [];
      let dataSend = [];
      this.mentah = this.mentah.concat(data['data']);
      this.mentah = this.mentah.filter( x => x['cam_client']);
      let costuming = data['data'];
      for(let i=0; i < costuming.length; i++){
        let datefor = new Date(costuming[i]['cam_activity'][costuming[i]['cam_activity'].length - 1].start_date);
        let getmonthname = datefor.toLocaleString('default', { month: 'short'});
        let daysChange = this.addZero(datefor.getDate());
        let yearChange = datefor.getFullYear();
        this.mycustomarray = this.mycustomarray.concat({
          id_am : costuming[i].user_am.USER_NAME,
          id_sgm : costuming[i].user_sgm.USER_NAME,
          id_sm : costuming[i].user_sm.USER_NAME,
          id_gm : costuming[i].user_gm.USER_NAME,
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
      this.mycustomarray = this.mycustomarray.filter(x => x.softdelete === 0);
      console.log(this.mycustomarray);
  }
    });
  }


  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

}
