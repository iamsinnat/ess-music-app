import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import * as bcrypt from 'bcryptjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    //localStorage.clear();
  }

  userdata: any;
  subscription: Subscription = new Subscription();

  loginform = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  proceedlogin() {
    // Login com sucesso
    if (this.loginform.valid) {
      this.subscription.add(this.service.GetbyCode(this.loginform.value.username).subscribe(
        (res: any) => {
          this.userdata = res;
          //console.log(this.userdata);

          // Se acertar a senha:
          const validPassword = bcrypt.compareSync(this.loginform.value.password ?? '', this.userdata.password);
          if (validPassword) {
            // Se o usuário tiver permissão para entrar:
            if (this.userdata.isactive) {
              localStorage.setItem('username', this.userdata.id);
              localStorage.setItem('userrole', this.userdata.role);
              this.router.navigate(['/initial-page']);
            } else {
              this.toastr.error('Por favor, renove seu cadastro na Dizer ou contate nosso suporte');
            }
          } else {
            this.toastr.error('Credênciais Inválidas ou Usuário não existente');
          }
        },
        (error) => {
          if (error.status === 404) {
            this.toastr.error('Credênciais Inválidas ou Usuário não existente');
          } else {
            console.error(error);
          }
        }
      ));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
