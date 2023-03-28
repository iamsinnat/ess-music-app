import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr:ToastrService, private service:AuthService, private router:Router ){
  }

  userdata:any;

  loginform=this.builder.group({
    username:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required),
  })

  proceedlogin() {
    //Login com sucesso
    if (this.loginform.valid){
    //   this.service.Proceedregister(this.loginform.value).subscribe(res=> {
    //     this.toastr.success('Registro feito com sucesso!');
    //     this.router.navigate(['login'])
    //   })
    // } 
    // //Falha no Login
    // else {
    //   this.toastr.warning('Por favor, colocar um dado válido!')
    // }
    this.service.Getbycode(this.loginform.value.username).subscribe(res=>{
      this.userdata=res;
      console.log(this.userdata);
    })
  }
  }
}