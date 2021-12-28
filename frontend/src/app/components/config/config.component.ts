import { Component, OnInit } from '@angular/core';
import { DbService } from "../../services/db.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public configs
  bd = "";
  urlapi = "";
  ubigeabat = "";
  ubigear = "";
  ubigoogle = "";
  correouno = "";
  correodos = "";
  min = "";
  hora = "";
  dia = "";
  codegd = "";
  codegm = "";
  search = "";

  update = false;
  nuevo = true;
  nueva = true;
  guardar = false;
  guardarGD = false;
  guardarGDBD = false;
  guardarGM = false;
  formconfig = false;
  formgoogledrive = false;
  formgmail = false;
  inicio = false;
  regresar = false;
  index = 0;
  diaEditar = false;
  cargando = true;
  nofound = false;

  constructor(private apiBD: DbService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.cargando = true;
    this.route.paramMap.subscribe(
      (params) => {
        this.apiBD.getConfig().subscribe(
          (config_result) => {
            this.configs = config_result;
            if (this.configs.data.length === 0) {
              this.nofound = true;
              this.cargando = false;
            } else {
              console.log(this.configs);
              this.cargando = false;
              this.nofound = false;
            }
          },
          (err) => {
            console.log(err);
            this.configs = err;
          }
        );
      },
      () => { }
    );
  }

  guardarConfig() {
    if (this.bd === '' || this.urlapi === '' || this.ubigeabat === '' || this.ubigear === '' || this.ubigoogle === '' || this.min === '' || this.hora === '' || this.dia === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO',
        title: 'ERROR',
        icon: 'error',
      });
    } else if (this.min < '0' || this.min > '59' || this.hora < '0' || this.hora > '23') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO CON VALORES VÁLIDOS',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      this.index = 0;
      this.update = false;
      this.diaEditar = false;

      const config = {
        "bd": this.bd,
        "urlapi": this.urlapi,
        "ubigeabat": this.ubigeabat,
        "ubigear": this.ubigear,
        "ubigoogle": this.ubigoogle,
        "min": this.min,
        "hora": this.hora,
        "dia": this.dia
      }
      this.configs.data.push(config);
      console.log(config);
      this.route.paramMap.subscribe(
        (params) => {
          let peticion: Observable<any>;
          peticion = this.apiBD.postConfig(config);
          peticion.subscribe(
            (conf) => {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>' + config.bd + '</h2> <h4>Configuración creada correctamente</h4> ',
                confirmButtonColor: "#4B515D",
              });
              this.cargando = true;
              this.apiBD.getConfig().subscribe(
                (conf_result) => {
                  this.configs = conf_result;
                  if (this.configs.data.length === 0) {
                    this.nofound = true;
                    this.cargando = false;
                  } else {
                    console.log(this.configs);

                    this.update = false;
                    this.nuevo = true;
                    this.nueva = true;
                    this.guardar = false;
                    this.formconfig = false;
                    this.inicio = false;
                    this.cargando = false;
                    this.nofound = false;
                  }

                  let peticion: Observable<any>;
                  const configB = {
                    "BASEDEDATOS": this.bd,
                    "UBICACIONGEABAT": this.ubigeabat,
                    "UBICACIONGEARESPALDO": this.ubigear,
                    "UBICACIONGOOGLE": this.ubigoogle,
                    "MINUTOS": this.min,
                    "HORA": this.hora,
                    "DIA": this.dia
                  }
                  peticion = this.apiBD.apiConfigBackup(this.urlapi, configB);
                  peticion.subscribe(
                    (data) => {
                      Swal.fire({
                        html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>CONFIGURACIÓN</h2> <h4>Respaldo automático creado correctamente</h4> ',
                        confirmButtonColor: "#4B515D",
                      });
                      console.log(data);
                      this.bd = "";
                      this.urlapi = "";
                      this.ubigeabat = "";
                      this.ubigear = "";
                      this.ubigoogle = "";
                      this.min = "";
                      this.hora = "";
                      this.dia = "";
                    },
                    (err) => {
                      console.log(err);
                      Swal.fire({
                        text: 'CONFIGURACIÓN DE RESPALDO AUTOMÁTICO NO CREADA',
                        title: 'ERROR AL CREAR',
                        icon: 'error',
                      });
                    }
                  );
                },
                (err) => {
                  console.log(err);
                  this.configs = err;
                }
              );
            },
            (err) => {
              Swal.fire({
                text: 'CONFIGURACIÓN NO CREADA',
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

  eliminarConfig(index) {
    this.update = false;
    this.nuevo = true;
    this.guardar = false;
    this.formconfig = false;
    this.inicio = false;
    this.update = false;
    this.diaEditar = false;

    this.nueva = true;
    this.regresar = false;
    this.guardarGD = false;
    this.formgoogledrive = false;

    Swal.fire({
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-question-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg> <h2>¿Está seguro?</h2><h4>Desea borrar ' + this.configs.data[index].BASEDEDATOS + '</h4>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CC0000"
    }).then(resp => {
      if (resp.value) {
        const idbd = this.configs.data[index].IDBD;
        console.log(idbd);
        this.route.paramMap.subscribe(
          (params) => {
            this.apiBD.deleteConfig(idbd).subscribe(
              (conf) => {
                this.cargando = true;
                let peticion: Observable<any>;
                peticion = this.apiBD.apiDConfigBackup(this.configs.data[index].URLAPI);
                peticion.subscribe(
                  (data) => {
                    Swal.fire({
                      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>CONFIGURACIÓN</h2> <h4>Respaldo automático eliminado correctamente</h4> ',
                      confirmButtonColor: "#4B515D",
                    });
                    console.log(data);
                    this.configs.data.splice(index, 1);
                    this.apiBD.getConfig().subscribe(
                      (conf_result) => {
                        this.configs = conf_result;
                        if (this.configs.data.length === 0) {
                          this.nofound = true;
                          this.cargando = false;
                        } else {
                          console.log(this.configs);
                          this.cargando = false;
                          this.nofound = false;

                          this.bd = "";
                          this.urlapi = "";
                          this.ubigeabat = "";
                          this.ubigear = "";
                          this.ubigoogle = "";
                          this.min = "";
                          this.hora = "";
                          this.dia = "";
                          this.index = 0;
                        }

                      },
                      (err) => {
                        console.log(err);
                        this.configs = err;
                      }
                    );

                  },
                  (err) => {
                    console.log(err);
                    Swal.fire({
                      text: 'CONFIGURACIÓN DE RESPALDO AUTOMÁTICO NO ELIMINADA',
                      title: 'ERROR AL ELIMINAR',
                      icon: 'error',
                    });
                  }
                );

              },
              (err) => {
                Swal.fire({
                  text: 'CONFIGURACIÓN NO ELIMINADA',
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

  editarConfig(index) {
    this.update = true;
    this.nuevo = false;
    this.nueva = false;
    this.guardar = false;
    this.formconfig = true;
    this.inicio = true;
    this.diaEditar = true;
    this.index = index;

    this.regresar = false;
    this.guardarGD = false;
    this.formgoogledrive = false;

    this.bd = this.configs.data[this.index].BASEDEDATOS;
    this.urlapi = this.configs.data[this.index].URLAPI;
    this.ubigeabat = this.configs.data[this.index].UBICACIONGEABAT;
    this.ubigear = this.configs.data[this.index].UBICACIONGEARESPALDO;
    this.ubigoogle = this.configs.data[this.index].UBICACIONGOOGLE;
    this.min = this.configs.data[this.index].MINUTOS;
    this.hora = this.configs.data[this.index].HORA;
    this.dia = this.configs.data[this.index].DIA;
  }

  actualizarConfig() {

    if (this.bd === '' || this.urlapi === '' || this.ubigeabat === '' || this.ubigear === '' || this.ubigoogle === '' || this.min === '' || this.hora === '' || this.dia === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO',
        title: 'ERROR',
        icon: 'error',
      });
    } else if (this.min < '0' || this.min > '59' || this.hora < '0' || this.hora > '23') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO CON VALORES VÁLIDOS',
        title: 'ERROR',
        icon: 'error',
      });
    } else {

      this.update = false;
      this.nuevo = true;
      this.nueva = true;
      this.guardar = false;
      this.formconfig = false;
      this.inicio = false;
      this.diaEditar = false;

      const idbd = this.configs.data[this.index].IDBD;
      const config = {
        "bd": this.bd,
        "urlapi": this.urlapi,
        "ubigeabat": this.ubigeabat,
        "ubigear": this.ubigear,
        "ubigoogle": this.ubigoogle,
        "min": this.min,
        "hora": this.hora,
        "dia": this.dia
      }
      this.route.paramMap.subscribe(
        (params) => {
          let peticion: Observable<any>;
          peticion = this.apiBD.putConfig(idbd, config);
          peticion.subscribe(
            (conf) => {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>' + this.bd + '</h2> <h4>Configuración se actualizó correctamente</h4> ',
                confirmButtonColor: "#4B515D",
              });
              this.cargando = true;
              this.apiBD.getConfig().subscribe(
                (conf_result) => {
                  this.configs = conf_result;
                  if (this.configs.data.length === 0) {
                    this.nofound = true;
                    this.cargando = false;
                  } else {
                    console.log(this.configs);
                    this.cargando = false;
                    this.nofound = false;

                    this.bd = "";
                    this.urlapi = "";
                    this.ubigeabat = "";
                    this.ubigear = "";
                    this.ubigoogle = "";
                    this.min = "";
                    this.hora = "";
                    this.dia = "";
                  }

                  console.log(this.configs.data[this.index]);
                  let peticion: Observable<any>;
                  const configB = {
                    "BASEDEDATOS": this.configs.data[this.index].BASEDEDATOS,
                    "UBICACIONGEABAT": this.configs.data[this.index].UBICACIONGEABAT,
                    "UBICACIONGEARESPALDO": this.configs.data[this.index].UBICACIONGEARESPALDO,
                    "UBICACIONGOOGLE": this.configs.data[this.index].UBICACIONGOOGLE,
                    "MINUTOS": this.configs.data[this.index].MINUTOS,
                    "HORA": this.configs.data[this.index].HORA,
                    "DIA": this.configs.data[this.index].DIA
                  }
                  peticion = this.apiBD.apiConfigBackup(this.configs.data[this.index].URLAPI, configB);
                  peticion.subscribe(
                    (data) => {
                      Swal.fire({
                        html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>CONFIGURACIÓN</h2> <h4>Respaldo automático creado correctamente</h4> ',
                        confirmButtonColor: "#4B515D",
                      });
                      console.log(data);
                      this.index = 0;

                    },
                    (err) => {
                      console.log(err);
                      Swal.fire({
                        text: 'CONFIGURACIÓN DE RESPALDO AUTOMÁTICO NO CREADA',
                        title: 'ERROR AL CREAR',
                        icon: 'error',
                      });
                    }
                  );
                },
                (err) => {
                  console.log(err);
                  this.configs = err;
                }
              );
            },
            (err) => {
              Swal.fire({
                text: 'CONFIGURACIÓN NO ACTUALIZADA',
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

  nuevoConfig() {
    this.update = false;
    this.nuevo = false;
    this.nueva = false;
    this.guardar = true;
    this.formconfig = true;
    this.inicio = true;
    this.diaEditar = false;

    this.bd = "";
    this.urlapi = "";
    this.ubigeabat = "";
    this.ubigear = "";
    this.ubigoogle = "";
    this.min = "";
    this.hora = "";
    this.dia = "";
  }

  inicioConfig() {
    Swal.fire({
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-question-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg> <h2>¿Está seguro?</h2><h4>Desea regresar</h4>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CC0000"
    }).then(resp => {
      if (resp.value) {
        this.update = false;
        this.nuevo = true;
        this.nueva = true;
        this.guardar = false;
        this.formconfig = false;
        this.inicio = false;
        this.diaEditar = false;

        this.bd = "";
        this.urlapi = "";
        this.ubigeabat = "";
        this.ubigear = "";
        this.ubigoogle = "";
        this.min = "";
        this.hora = "";
        this.dia = "";
      }
    });
  }

  nuevaCuentaGD() {
    this.nueva = false;
    this.regresar = true;
    this.guardarGD = true;
    this.nuevo = false;
    this.formgoogledrive = true;
  }

  nuevaCuentaGDBD(index) {
    this.nueva = false;
    this.regresar = true;
    this.guardarGDBD = true;
    this.nuevo = false;
    this.formgoogledrive = true;
    this.index = index;
  }

  nuevaCuentaGM(index) {
    this.nueva = false;
    this.regresar = true;
    this.guardarGM = true;
    this.nuevo = false;
    this.formgmail = true;
    this.index = index;
  }

  regresarInicio() {
    Swal.fire({
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-question-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg> <h2>¿Está seguro?</h2><h4>Desea regresar</h4>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CC0000"
    }).then(resp => {
      if (resp.value) {
        this.nueva = true;
        this.regresar = false;
        this.guardarGD = false;
        this.guardarGDBD = false;
        this.guardarGM = false;
        this.nuevo = true;
        this.formgoogledrive = false;
        this.formgmail = false;
      }
    });
  }

  guardarCuentaGD() {
    if (this.codegd === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      const codigo = {
        "code": this.codegd
      }
      this.route.paramMap.subscribe(
        (params) => {
          let peticion: Observable<any>;
          peticion = this.apiBD.createTokenGD(codigo);
          peticion.subscribe(
            (data) => {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>GOOGLE DRIVE</h2> <h4>Conexión a cuenta creado correctamente</h4> ',
                confirmButtonColor: "#4B515D",
              });
              console.log(data);
              this.codegd = "";

              this.nueva = true;
              this.regresar = false;
              this.guardarGD = false;
              this.nuevo = true;
              this.formgoogledrive = false;
              this.update = false;
              this.diaEditar = false;
            },
            (err) => {
              console.log(err);
              Swal.fire({
                text: 'CONEXIÓN A CUENTTA NO CREADA',
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

  guardarCuentaGDBD() {
    if (this.codegd === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      const codigo = {
        "code": this.codegd
      }
      this.route.paramMap.subscribe(
        (params) => {
          let peticion: Observable<any>;
          peticion = this.apiBD.apicreateTokenGD(this.configs.data[this.index].URLAPI, codigo);
          peticion.subscribe(
            (data) => {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>GOOGLE DRIVE</h2> <h4>Conexión a cuenta creado correctamente</h4> ',
                confirmButtonColor: "#4B515D",
              });
              console.log(data);
              this.codegd = "";

              this.nueva = true;
              this.regresar = false;
              this.guardarGDBD = false;
              this.nuevo = true;
              this.formgoogledrive = false;
              this.update = false;
              this.diaEditar = false;

            },
            (err) => {
              console.log(err);
              Swal.fire({
                text: 'CONEXIÓN A CUENTTA NO CREADA',
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

  guardarCuentaGM() {
    if (this.codegm === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO CÓDIGO',
        title: 'ERROR',
        icon: 'error',
      });
    } else if (this.correouno === '' && this.correodos === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO CORREO',
        title: 'ERROR',
        icon: 'error',
      });
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(this.correouno) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(this.correodos)) {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO CON VALORES VÁLIDOS CORREO',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      const codigo = {
        "code": this.codegm
      }
      this.route.paramMap.subscribe(
        (params) => {
          let peticion: Observable<any>;
          peticion = this.apiBD.apicreateTokenGM(this.configs.data[this.index].URLAPI, codigo);
          peticion.subscribe(
            (data) => {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>GMAIL</h2> <h4>Conexión a cuenta Gmail creado correctamente</h4> ',
                confirmButtonColor: "#4B515D",
              });
              let peticion: Observable<any>;
              const configBGM = {
                "CORREO1": "",
                "CORREO2": ""
              }
              if(this.correouno === ''){
                configBGM.CORREO1 = this.correodos;
              }else if(this.correodos === ''){
                configBGM.CORREO1 = this.correouno;
              }else{
                configBGM.CORREO1 = this.correouno;
                configBGM.CORREO2 = this.correodos;
              }
              peticion = this.apiBD.apiConfigGM(this.configs.data[this.index].URLAPI, configBGM);
              peticion.subscribe(
                (data) => {
                  Swal.fire({
                    html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>CONFIGURACIÓN</h2> <h4>Configuración notificación correo electrónico creado correctamente</h4> ',
                    confirmButtonColor: "#4B515D",
                  });
                  console.log(data);
                  this.codegm = "";
                  this.correouno = "";
                  this.correodos = "";

                  this.nueva = true;
                  this.regresar = false;
                  this.guardarGM = false;
                  this.nuevo = true;
                  this.formgmail = false;
                  this.update = false;
                  this.diaEditar = false;
                },
                (err) => {
                  console.log(err);
                  Swal.fire({
                    text: 'CONFIGURACIÓN NOTIFICACIÓN CORREO ELECTRÓNICO NO CREADA',
                    title: 'ERROR AL CREAR',
                    icon: 'error',
                  });
                }
              );
            },
            (err) => {
              console.log(err);
              Swal.fire({
                text: 'CONEXIÓN A CUENTA GMAIL NO CREADA',
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

  buscar() {
    this.cargando = true;
    if (this.search) {
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getSearchConfig(this.search).subscribe(
            (config_result) => {
              this.configs = config_result;
              if (this.configs.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.configs);
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.configs = err;
            }
          );
        },
        () => { }
      );
    } else {
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getConfig().subscribe(
            (config_result) => {
              this.configs = config_result;
              if (this.configs.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.configs);
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.configs = err;
            }
          );
        },
        () => { }
      );
    }
  }

  inicioConfigRegresar() {
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
            this.apiBD.getConfig().subscribe(
              (config_result) => {
                this.configs = config_result;
                if (this.configs.data.length === 0) {
                  this.nofound = true;
                  this.cargando = false;
                } else {
                  console.log(this.configs);
                  this.cargando = false;
                  this.nofound = false;
                }
              },
              (err) => {
                console.log(err);
                this.configs = err;
              }
            );
          },
          () => { }
        );
      }
    });
  }

}
