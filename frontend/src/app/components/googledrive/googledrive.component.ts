import { Component, OnInit } from '@angular/core';
import { DbService } from "../../services/db.service";
import { ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-googledrive',
  templateUrl: './googledrive.component.html',
  styleUrls: ['./googledrive.component.css']
})
export class GoogledriveComponent implements OnInit {

  public basesdedatos
  public files
  basededatos
  search = "";

  filesFolder = false;
  cargando = true;
  nofound = false;

  constructor(private apiBD: DbService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.apiBD.getDBConfig().subscribe(
          (bd_result) => {
            this.basesdedatos = bd_result;
            if (this.basesdedatos.data.length === 0) {
              Swal.fire({
                html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-exclamation-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg><h2>CONFIGURACIONES</h2> <h4>No existen configuraciones</h4> ',
                confirmButtonColor: "#4B515D",
              });
            } else {
              console.log(this.basesdedatos);
            }
          },
          (err) => {
            console.log(err);
            this.basesdedatos = err;
          }
        );
      },
      () => { }
    );
  }

  seleccionarBD() {
    if (this.basededatos === undefined) {
      console.log(this.basededatos);
      Swal.fire({
        text: 'SELECCIONE UNA BASE DE DATOS',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      this.cargando = true;
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getFilesFolderGD(this.basededatos).subscribe(
            (files_result) => {
              this.files = files_result;
              if (this.files.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.files);
                this.filesFolder = true;
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.files = err;
              this.filesFolder = true;
              this.nofound = true;
              this.cargando = false;
            }
          );
        },
        () => { }
      );
    }
  }

  descargar(index) {
    Swal.fire({
      html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-question-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg> <h2>¿Está seguro?</h2><h4>Desea descargar ' + this.files.data[index].name + '</h4>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CC0000"
    }).then(resp => {
      if (resp.value) {
        Swal.fire({
          allowOutsideClick: false,
          confirmButtonColor: "#4B515D",
          html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-info-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/></svg><h2>Espere por favor</h2>'
        });
        Swal.showLoading();
        this.route.paramMap.subscribe(
          (params) => {
            this.apiBD.descargarFileGD(this.files.data[index].name).subscribe(
              (result) => {
                console.log(result);
                Swal.close();
                Swal.fire({
                  html: '<svg width="1em" height="1em" viewBox="0 0 16 16" style="zoom: 400%; color:gray;" class="bi bi-check-circle m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg> <h2>' + this.files.data[index].name + '</h2> <h4>Archivo se descargo correctamente</h4> ',
                  confirmButtonColor: "#4B515D",
                });
              },
              (err) => {
                console.log(err);
                Swal.fire({
                  text: 'DESCARGA INCOMPLETA',
                  title: 'ERROR AL DESCARGAR ARCHIVO',
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

  buscar() {
    this.cargando = true;
    if (this.search) {
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getFilesFolderGDSearch(this.basededatos, this.search).subscribe(
            (files_result) => {
              this.files = files_result;
              if (this.files.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.files);
                this.filesFolder = true;
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.files = err;
              this.filesFolder = true;
              this.nofound = true;
              this.cargando = false;
            }
          );
        },
        () => { }
      );
    } else {
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getFilesFolderGD(this.basededatos).subscribe(
            (files_result) => {
              this.files = files_result;
              if (this.files.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.files);
                this.filesFolder = true;
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.files = err;
              this.filesFolder = true;
              this.nofound = true;
              this.cargando = false;
            }
          );
        },
        () => { }
      );
    }
  }

  inicioRegresar() {
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
            this.apiBD.getFilesFolderGD(this.basededatos).subscribe(
              (files_result) => {
                this.files = files_result;
                if (this.files.data.length === 0) {
                  this.nofound = true;
                  this.cargando = false;
                } else {
                  console.log(this.files);
                  this.filesFolder = true;
                  this.cargando = false;
                  this.nofound = false;
                }
              },
              (err) => {
                console.log(err);
                this.files = err;
                this.filesFolder = true;
                this.nofound = true;
                this.cargando = false;
              }
            );
          },
          () => { }
        );
      }
    });
  }

}
