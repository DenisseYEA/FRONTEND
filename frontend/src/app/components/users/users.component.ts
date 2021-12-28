import { Component, OnInit } from '@angular/core';
import { DbService } from "../../services/db.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usuarios
  usuario = "";
  password = "";
  tipo = "";
  search = "";

  update = false;
  nuevo = true;
  guardar = false;
  formuser = false;
  inicio = false;
  index = 0;
  tipoEditar = false;
  cargando = true;
  nofound = false;

  constructor(private apiBD: DbService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.cargando = true;
    this.route.paramMap.subscribe(
      (params) => {
        this.apiBD.getUsers().subscribe(
          (usuarios_result) => {
            this.usuarios = usuarios_result;
            if (this.usuarios.data.length === 0) {
              this.nofound = true;
              this.cargando = false;
            } else {
              console.log(this.usuarios);
              this.cargando = false;
              this.nofound = false;
            }
          },
          (err) => {
            console.log(err);
            this.usuarios = err;
          }
        );
      },
      () => { }
    );
  }

  guardarUsuario() {
    if (this.usuario === '' || this.password === '' || this.tipo === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      this.index = 0;
      this.update = false;
      this.tipoEditar = false;
      const usuario = {
        "usuario": this.usuario,
        "password": this.password,
        "tipo": this.tipo
      }
      this.usuarios.data.push(usuario);
      console.log(usuario);
      this.route.paramMap.subscribe(
        (params) => {
          let peticion: Observable<any>;
          peticion = this.apiBD.postUsers(usuario);
          peticion.subscribe(
            (user) => {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>' + usuario.usuario + '</h2> <h4>Usuario creado correctamente</h4> ',
                confirmButtonColor: "#4B515D",
              });
              this.cargando = true;
              this.apiBD.getUsers().subscribe(
                (users_result) => {
                  this.usuarios = users_result;
                  if (this.usuarios.data.length === 0) {
                    this.nofound = true;
                    this.cargando = false;
                  } else {
                    console.log(this.usuarios);
                    this.usuario = "";
                    this.password = "";
                    this.tipo = "";

                    this.update = false;
                    this.nuevo = true
                    this.guardar = false;
                    this.formuser = false;
                    this.inicio = false;
                    this.cargando = false;
                    this.nofound = false;
                  }
                },
                (err) => {
                  console.log(err);
                  this.usuarios = err;
                }
              );
            },
            (err) => {
              Swal.fire({
                text: 'USUARIO NO CREADO',
                title: 'ERROR AL CREAR',
                icon: 'error',
              });
            }
          );
        },
        () => { }
      );
    }
  }

  eliminarUsuario(index) {
    this.update = false;
    this.nuevo = true;
    this.guardar = false;
    this.formuser = false;
    this.inicio = false;
    this.update = false;
    this.tipoEditar = false;

    Swal.fire({
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-question-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg> <h2>¿Está seguro?</h2><h4>Desea borrar ' + this.usuarios.data[index].USUARIO + '</h4>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CC0000"
    }).then(resp => {
      if (resp.value) {
        const idu = this.usuarios.data[index].IDU;
        console.log(idu);
        this.usuarios.data.splice(index, 1);
        this.route.paramMap.subscribe(
          (params) => {
            this.apiBD.deleteUsers(idu).subscribe(
              (user) => {
                this.cargando = true;
                this.apiBD.getUsers().subscribe(
                  (users_result) => {
                    this.usuarios = users_result;
                    if (this.usuarios.data.length === 0) {
                      this.nofound = true;
                      this.cargando = false;
                    } else {
                      console.log(this.usuarios);
                      this.cargando = false;
                      this.nofound = false;

                      this.usuario = "";
                      this.password = "";
                      this.tipo = "";
                      this.index = 0;
                    }
                  },
                  (err) => {
                    console.log(err);
                    this.usuarios = err;
                  }
                );
              },
              (err) => {
                Swal.fire({
                  text: 'USUARIO NO ELIMINADO',
                  title: 'ERROR AL ELIMINAR',
                  icon: 'error',
                });
              }
            );
          },
          () => { }
        );
      }
    });


  }

  editarUsuario(index) {
    this.update = true;
    this.nuevo = false;
    this.guardar = false;
    this.formuser = true;
    this.inicio = true;
    this.tipoEditar = true;
    this.index = index;
    this.usuario = this.usuarios.data[this.index].USUARIO;
    this.password = this.usuarios.data[this.index].PASSWORD;
    this.tipo = this.usuarios.data[this.index].TIPO;
  }

  actualizarUsuario() {
    if (this.usuario === '' || this.password === '' || this.tipo === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      this.update = false;
      this.nuevo = true;
      this.guardar = false;
      this.formuser = false;
      this.inicio = false;
      this.tipoEditar = false;

      const idu = this.usuarios.data[this.index].IDU;
      const usuario = {
        "usuario": this.usuario,
        "password": this.password,
        "tipo": this.tipo
      }
      this.route.paramMap.subscribe(
        (params) => {
          let peticion: Observable<any>;
          peticion = this.apiBD.putUsers(idu, usuario);
          peticion.subscribe(
            (user) => {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>' + this.usuario + '</h2> <h4>Usuario se actualizó correctamente</h4> ',
                confirmButtonColor: "#4B515D",
              });
              this.cargando = true;
              this.apiBD.getUsers().subscribe(
                (users_result) => {
                  this.usuarios = users_result;
                  if (this.usuarios.data.length === 0) {
                    this.nofound = true;
                    this.cargando = false;
                  } else {
                    console.log(this.usuarios);
                    this.cargando = false;
                    this.nofound = false;

                    this.usuario = "";
                    this.password = "";
                    this.tipo = "";
                    this.index = 0;
                  }
                },
                (err) => {
                  console.log(err);
                  this.usuarios = err;
                }
              );
            },
            (err) => {
              Swal.fire({
                text: 'USUARIO NO ACTUALIZADO',
                title: 'ERROR AL ACTUALIZAR',
                icon: 'error',
              });
            }
          );
        },
        () => { }
      );
    }
  }

  nuevoUsuario() {
    this.update = false;
    this.nuevo = false;
    this.guardar = true;
    this.formuser = true;
    this.inicio = true;
    this.tipoEditar = false;
    this.usuario = "";
    this.password = "";
    this.tipo = "";
  }

  inicioUsuario() {
    Swal.fire({
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-question-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg> <h2>¿Está seguro?</h2><h4>Desea regresar</h4>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CC0000"
    }).then(resp => {
      if (resp.value) {
        this.update = false;
        this.nuevo = true;
        this.guardar = false;
        this.formuser = false;
        this.inicio = false;
        this.tipoEditar = false;
        this.usuario = "";
        this.password = "";
        this.tipo = "";
      }
    });
  }


  buscar() {
    this.cargando = true;
    if (this.search) {
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getSearchUsers(this.search).subscribe(
            (usuarios_result) => {
              this.usuarios = usuarios_result;
              if (this.usuarios.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.usuarios);
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.usuarios = err;
            }
          );
        },
        () => { }
      );
    } else {
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getUsers().subscribe(
            (usuarios_result) => {
              this.usuarios = usuarios_result;
              if (this.usuarios.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.usuarios);
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.usuarios = err;
            }
          );
        },
        () => { }
      );
    }
  }

  inicioUsuarioRegresar() {
    Swal.fire({
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-question-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg> <h2>¿Está seguro?</h2><h4>Desea regresar</h4>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CC0000"
    }).then(resp => {
      if (resp.value) {
        this.search = "";
        this.route.paramMap.subscribe(
          (params) => {
            this.apiBD.getUsers().subscribe(
              (usuarios_result) => {
                this.usuarios = usuarios_result;
                if (this.usuarios.data.length === 0) {
                  this.nofound = true;
                  this.cargando = false;
                } else {
                  console.log(this.usuarios);
                  this.cargando = false;
                  this.nofound = false;
                }
              },
              (err) => {
                console.log(err);
                this.usuarios = err;
              }
            );
          },
          () => { }
        );
      }
    });
  }

}
