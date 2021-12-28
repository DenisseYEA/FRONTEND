import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from "../../services/db.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = "";
  password = "";

  public logi

  constructor(private apiBD: DbService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm, data) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonColor: "#4B515D",
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-info-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/></svg><h2>Espere por favor</h2>'
    });
    Swal.showLoading();

    this.route.paramMap.subscribe(
      (params) => {
        this.apiBD.loginUsers(this.usuario, this.password).subscribe(
          (usuarios_result) => {
            this.logi = usuarios_result;
            if (this.logi.data[0]) {
              const idUsuario = this.logi.data[0].IDU;
              const tipoUsuario = this.logi.data[0].TIPO;
              this.apiBD.guardarToken(idUsuario,tipoUsuario);
              this.apiBD.leerToken();
              Swal.close();
              location.assign('/backups');
            } else {
              Swal.fire({
                text: 'USUARIO NO EXISTE',
                title: 'ERROR AL AUTENTICAR',
                icon: 'error',
              });
            }
          },
          (err) => {
            console.log(err);
            this.logi = err;
            Swal.fire({
              text: 'USUARIO NO EXISTE',
              title: 'ERROR AL AUTENTICAR',
              icon: 'error',
            });
          }
        );
      },
      () => { }
    );

  }

}
