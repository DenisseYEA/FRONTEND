import { Component, OnInit } from '@angular/core';
import { DbService } from "../../services/db.service";
import { ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registros
  semana = "";
  mes = ""
  fecha = ""

  cargando = false;
  nofound = false;

  constructor(private apiBD: DbService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  seleccionarRegistro() {
    if (this.semana === '' && this.fecha === '' && this.mes === '') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO',
        title: 'ERROR',
        icon: 'error',
      });
    } else if (this.semana === '' && this.fecha > '2019' && this.mes != '') {
      this.cargando = true;
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getSearchRegistroFechaMes(this.fecha, this.mes).subscribe(
            (registro_result) => {
              this.registros = registro_result;
              if (this.registros.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.registros);
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.registros = err;
              this.cargando = false;
              this.nofound = false;
            }
          );
        },
        () => { }
      );
    } else if (this.semana === '' && this.fecha > '2019' && this.mes === '') {
      this.cargando = true;
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getSearchRegistroFecha(this.fecha).subscribe(
            (registro_result) => {
              this.registros = registro_result;
              if (this.registros.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.registros);
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.registros = err;
              this.cargando = false;
              this.nofound = false;
            }
          );
        },
        () => { }
      );
    }else if (this.semana < '1' || this.semana > '52' || this.fecha < '2019') {
      Swal.fire({
        text: 'COMPLETAR FORMULARIO CON VALORES VÁLIDOS',
        title: 'ERROR',
        icon: 'error',
      });
    } else {
      this.cargando = true;
      this.route.paramMap.subscribe(
        (params) => {
          this.apiBD.getSearchRegistro(this.semana, this.fecha, this.mes).subscribe(
            (registro_result) => {
              this.registros = registro_result;
              if (this.registros.data.length === 0) {
                this.nofound = true;
                this.cargando = false;
              } else {
                console.log(this.registros);
                this.cargando = false;
                this.nofound = false;
              }
            },
            (err) => {
              console.log(err);
              this.registros = err;
              this.cargando = false;
              this.nofound = false;
            }
          );
        },
        () => { }
      );
    }

  }
}
