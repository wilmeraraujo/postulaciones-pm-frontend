import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

import { PagoSoportadoComponent } from './components/pago-soportado/pago-soportado.component';
import { HomeComponent } from './components/home/home.component';

import { KeycloakService,KeycloakAngularModule } from 'keycloak-angular';

//metodo que se incluye para keyCloaks
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        //url: 'http://localhost:8082/',
        url: 'http://192.168.10.60:8082/',
        realm: 'sagas',
        clientId: 'angular-postulacion-pm'
      },
      initOptions: {
        onLoad: 'login-required',
        flow: "standard",
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp:true //obtiene informacion del usuario
    });
}


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PagoSoportadoComponent,
    HomeComponent//importar para keyCloak
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,//importar
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginator,
    MatInputModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
