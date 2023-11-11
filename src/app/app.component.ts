import { Component } from '@angular/core';
import { AppService } from './app-service';
import { Users } from './Users';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  title = 'Heliverse_Assignment_Rahul';
  users:Users[]=[];
  genderText :string='' ;
  searchText :string='';
  domainText:string = '';
  availbilityText:string='';
  totalCount:number= 0;
  currentPageNo:number=1;
  pageSize:number=20;
  constructor(private appservice:AppService){}
  ngOnInit():void{
    this.get('','','','',0,20);

  }

  searchUser(){    
      this.appservice.get(this.genderText, this.searchText,this.domainText,this.availbilityText,this.currentPageNo,this.pageSize).subscribe((response) => {
        this.users = response.body as Users[];
        this.totalCount = response.headers.get('X-Total-Count')?
        Number(response.headers.get('X-Total-Count')):0;
      });
  }

  get(gender:string,search:string,domain:string,availbility:string,currentPage:number,pageSize:number){
    this.appservice.get(gender,search,domain,availbility,currentPage,pageSize)
    .subscribe((response)=>
    {
      this.users = response.body as Users[];
      this.totalCount = response.headers.get('X-Total-Count')?
      Number(response.headers.get('X-Total-Count')):0;
    });
  }  

  handlePageEvent(e:PageEvent){
    this.currentPageNo = (e.pageIndex+1);
    this.appservice.get(this.genderText, this.searchText,this.domainText,this.availbilityText,this.currentPageNo,this.pageSize).subscribe((response) => {
      this.users = response.body as Users[];
      this.totalCount = response.headers.get('X-Total-Count')?
      Number(response.headers.get('X-Total-Count')):0;
    });
  }
}





