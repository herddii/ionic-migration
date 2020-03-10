import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard/dashboard.service';
@Component({
  selector: 'app-detailarticle',
  templateUrl: './detailarticle.page.html',
  styleUrls: ['./detailarticle.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailarticlePage implements OnInit {

  slug;
  id_kategori;
  article = [];
  posted : string;
  posted_sgs : string;
  suggest = [];

  constructor(

    public locate: Location,
    public activateroute: ActivatedRoute,
    public dashboardServ: DashboardService,
    public router: Router

  ) { }

  ngOnInit() {
    this.activateroute.params.subscribe(nav =>{
      this.slug = nav['slug'];
      this.id_kategori = nav['id_kategori'];
    })
    this.getdetailarticle();
  }

  async getdetailarticle(){
    await this.dashboardServ.getDetailArticle(this.slug,this.id_kategori).then(article =>{
      this.article = this.article.concat(article['berita']);
      this.suggest = this.suggest.concat(article['market']);
    }).then(()=>{
      let date = new Date(this.article[0]['created_at']);
      let getMonthname = date.toLocaleString('default', { month: 'long' });
      let getDay = date.getDate();
      let getYear = date.getFullYear();

      let date2 = new Date(this.suggest[0]['created_at']);
      let getMonthname2 = date2.toLocaleString('default', { month: 'long' });
      let getDay2 = date2.getDate();
      let getYear2 = date2.getFullYear();

      this.posted = `${getMonthname} ${getDay}, ${getYear}`;
      this.posted_sgs = `${getMonthname2} ${getDay2}, ${getYear2}`;
    })
  }

  goback(){
    this.locate.back();
  }

  detail(val){
    this.router.navigate(['/detailarticle',{
      slug: val.slug,
      id_kategori: val.id_kategori
    }])
  }

}
