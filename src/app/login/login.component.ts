import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user:any
  password:any;

  constructor() { }s


  ngOnInit() {
  }

  updateUser(e) {
    this.user = e.target.value;
    
  }

  updatePassword(e) {
    this.password = e.target.value;
    
  }

  login(){
    console.log(this.user);
    console.log(this.password);

  }


}
