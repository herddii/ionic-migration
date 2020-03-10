import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
	url: string = 'http://10.22.253.86:8000/';
	// urlApi: string = 'http://mncmediakit.com/api/';
	urlApi: string = `${this.url}api/`;
	urlphoto: string = `http://mncmediakit.com`;
	// url: string = this.url;
	// urlApi: string = 'http://10.22.253.64:8000/api/';
	// urlFile: string = 'http://mncmediakit.com/datafile/';
	urlFile: string = `${this.url}datafile/`;
  constructor() { }
}
