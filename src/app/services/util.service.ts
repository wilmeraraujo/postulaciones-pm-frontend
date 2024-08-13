import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';//se importa para keycloaks

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  //en el constructor se agrerga => private keycloakService: KeycloakService
  constructor(private keycloakService: KeycloakService) { }
  //metodo para obtener roles de usuario de keycloak
  getRoles(){
    return this.keycloakService.getUserRoles();
  }
  isAdmin(){
    let roles = this.keycloakService.getUserRoles().filter(role => role =="admin");
    if (roles.length > 0)
      return true;
    else
      return false;
  }
}
