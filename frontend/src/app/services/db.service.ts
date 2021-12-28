import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  userID: string;
  tipoUsuario: string;

  constructor(private http: HttpClient) {
    this.leerToken();
   }

  public postUsers(user){
    return this.http.post("http://localhost:3000/api/db/users",user);
  }

  public putUsers(id,user){
    return this.http.put("http://localhost:3000/api/db/users/"+id,user);
  }

  public deleteUsers(id){
    return this.http.delete("http://localhost:3000/api/db/users/"+id);
  }

  public getUsers(){
    return this.http.get("http://localhost:3000/api/db/users");
  }

  public getSearchUsers(buscar){
    return this.http.get("http://localhost:3000/api/db/users/search/"+buscar);
  }

  public loginUsers(usuario,password){
    return this.http.get("http://localhost:3000/api/db/users/login/"+usuario+"/"+password);
  }

  public postConfig(config){
    return this.http.post("http://localhost:3000/api/db/config",config);
  }

  public putConfig(id,config){
    return this.http.put("http://localhost:3000/api/db/config/"+id,config);
  }

  public deleteConfig(id){
    return this.http.delete("http://localhost:3000/api/db/config/"+id);
  }

  public getConfig(){
    return this.http.get("http://localhost:3000/api/db/config");
  }

  public getDBConfig(){
    return this.http.get("http://localhost:3000/api/db/config/db");
  }

  public getSearchConfig(buscar){
    return this.http.get("http://localhost:3000/api/db/config/search/"+buscar);
  }
 
  public getSearchUrlApiConfig(bd){
    return this.http.get("http://localhost:3000/api/db/config/search/"+bd);
  }
  
  public getSearchRegistro(sem,fecha,mes){
    return this.http.get("http://localhost:3000/api/db/registro/"+sem+"/"+fecha+"/"+mes);
  }

  public getSearchRegistroFechaMes(fecha,mes){
    return this.http.get("http://localhost:3000/api/db/registro/"+fecha+"/"+mes);
  }

  public getSearchRegistroFecha(fecha){
    return this.http.get("http://localhost:3000/api/db/registro/"+fecha);
  }

  public getSearchDateRegistro(){
    return this.http.get("http://localhost:3000/api/db/registro/basededatos");
  }

  public getSearchDateRegistroBuscar(buscar){
    return this.http.get("http://localhost:3000/api/db/registro/basededatos/"+buscar);
  }

  public getFilesFolderGD(namefolder){
    return this.http.get("http://localhost:3000/api/config/folder/"+namefolder);
  }

  public descargarFileGD(namefile){
    return this.http.get("http://localhost:3000/api/config/file/"+namefile);
  }

  public getFilesFolderGDSearch(namefolder,buscar){
    return this.http.get("http://localhost:3000/api/config/folder/"+namefolder+"/"+buscar);
  }

  public createTokenGD(codigo){
    return this.http.post("http://localhost:3000/api/config/",codigo);
  }

  public apiRespaldoIniciar(urlapi){
    return this.http.get(urlapi+"/api/resp/");
  }

  public apicreateTokenGD(urlapi,codigo){
    return this.http.post(urlapi+"/api/config/",codigo);
  }

  public apiConfigBackup(urlapi,config){
    return this.http.post(urlapi+"/api/config/configb",config);
  }

  public apiDConfigBackup(urlapi){
    return this.http.delete(urlapi+"/api/config/");
  }

  public apicreateTokenGM(urlapi,codigo){
    return this.http.post(urlapi+"/api/gmconfig/",codigo);
  }

  public apiConfigGM(urlapi,config){
    return this.http.post(urlapi+"/api/gmconfig/mail",config);
  }

  guardarToken(idUsuario,tipoUsuario){
    localStorage.setItem("idu", idUsuario);
    localStorage.setItem("tipo",tipoUsuario);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira',hoy.getTime().toString());

  }

  leerToken(){
    if(localStorage.getItem('idu')){
      this.userID = localStorage.getItem('idu');
      this.tipoUsuario = localStorage.getItem('tipo');
    }else{
      this.userID = '';
      this.tipoUsuario = '';
    }
    return this.userID;
  }

  autenticadoLogin(): boolean {
    if(this.userID.length < 1){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }
  
  logout(){
    localStorage.removeItem('idu');
    localStorage.removeItem('expira');
    localStorage.removeItem('tipo');
  }
  
}
