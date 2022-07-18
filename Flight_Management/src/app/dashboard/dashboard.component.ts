import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('userRole') == "1")
    {
       this.role = "Administrator";
    }
    else
    {
       this.role = "User";
    }
  }
role:string="";
}
