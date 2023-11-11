import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "./Users";

@Injectable({
    providedIn:'root',
})
export class AppService{
    constructor(private httpClient:HttpClient){}

    get(gender:string,search:string,domain:string,availbility:string,currentPage:number,pageSize:number):Observable<HttpResponse<any>>{
        let url='http://localhost:3000/Users?_page='+currentPage+'&_limit='+pageSize+'';

        if(gender!=''){
            url = ''+url+'&gender='+gender+'';
        }

        if(search!='' && search != undefined){
            if(url.indexOf("?")>-1){
                url = ''+url+'&first_name='+search+'';
            }else{
                url = ''+url+'?first_name='+search+'';
            }
        }

        if(domain!='' && domain!=undefined){
            if(url.indexOf("?")>-1){
                url = ''+url+'&domain='+domain+'';
            }else{
                url = ''+url+'?domain='+domain+'';
            }
        }

        if(availbility!='' && availbility!=undefined){
            if(url.indexOf("?")>-1){
                url = ''+url+'&available='+availbility+'';
            }else{
                url = ''+url+'?available='+availbility+'';
            }
        }

        return this.httpClient.get<HttpResponse<any>>(url,{observe:'response'});
    }
    
}