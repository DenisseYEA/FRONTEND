import { Component, OnInit } from '@angular/core';
import { DbService } from "../../../services/db.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login
  user = false;
  admin = false;

  constructor(private db: DbService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('idu')) {
      this.login = true;
      if (this.db.tipoUsuario === 'ADMIN') {
        this.admin = true;
        this.user = false;
      } else {
        this.admin = false;
        this.user = true;
      }
    } else {
      this.login = false;
      this.admin = false;
      this.user = false;
    }
  }

  salir() {
    this.db.logout();
    this.db.leerToken();
    location.assign('/login');
  }

}
