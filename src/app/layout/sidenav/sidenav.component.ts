import { Component, inject, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  mobileQuery: MediaQueryList;
  private keycloakService = inject(KeycloakService);//inyectar para keycloak
  username:any;
  menuNav = [
    {
      name:"Inicio",
      route:"home",
      icon:"home"
    },
    {
      name:"Pago soportado",
      route:"pago-soportado",
      icon:"monetization_on"
    }
  ]
  constructor(media:MediaMatcher){
    this.mobileQuery = media.matchMedia('max-width: 600px');
  }
  ngOnInit(): void {
    this.username = this.keycloakService.getUsername();
  }
  logout(){
   this.keycloakService.logout();
  }
}
