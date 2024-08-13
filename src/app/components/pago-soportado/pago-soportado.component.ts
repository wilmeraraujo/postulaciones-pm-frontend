import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PagoSoportadoService } from '../../services/pago-soportado.service';
import { PagoSoportadoElement } from '../../models/pago-soportado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-pago-soportado',
  templateUrl: './pago-soportado.component.html',
  styleUrl: './pago-soportado.component.css'
})
export class PagoSoportadoComponent implements OnInit{
  isAdmin:any;
  private pagoSoportadoService = inject(PagoSoportadoService);
  private snackBar= inject(MatSnackBar);
  private util= inject(UtilService); //importar para el rol de usuarios

  ngOnInit(): void {
    this.getPagoSoportado();
    //console.log(this.util.getRoles());
    this.isAdmin = this.util.isAdmin();
  }

  displayedColumns:string[] = ['id','nit','razonSocial','habilitado','valorPosiblePagoFactura','valorPosiblePagoSuministro','valorPagarFactura','valorPagarSuministro'];
  dataSource = new MatTableDataSource<PagoSoportadoElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getTotalFactura() {
    return this.dataSource.data.map(p => p.valorPagarFactura).reduce((acc, value) => acc + value, 0);
  }
  getTotalSuministro() {
    return this.dataSource.data.map(p => p.valorPagarSuministro).reduce((acc, value) => acc + value, 0);
  }

  getPagoSoportado(): void {
    this.pagoSoportadoService.getPagoSoportado().subscribe((data: any) => {
      this.processPagoSoportadoResponse(data);
    }, (error: any) => {
      console.log("error: ", error);
    });
  }
  processPagoSoportadoResponse(resp: any) {
    if (Array.isArray(resp)) {
      const dataPagoSoportadoSuministro: PagoSoportadoElement[] = resp.map((item: any) => ({
        id: item.id,
        nit: item.nit,
        razonSocial: item.razonSocial,
        habilitado:item.habilitado,
        valorPosiblePagoFactura: item.valorPosiblePagoFactura,
        valorPosiblePagoSuministro: item.valorPosiblePagoSuministro,
        valorPagarFactura: item.valorPagarFactura,
        valorPagarSuministro: item.valorPagarSuministro,
      }));

      this.dataSource = new MatTableDataSource<PagoSoportadoElement>(dataPagoSoportadoSuministro);
      this.dataSource.paginator = this.paginator;
    } else {
      console.log("Respuesta no es un array.");
    }
  }
  search(term: string){
    if(term.length === 0){
        return this.getPagoSoportado();
    }
    this.pagoSoportadoService.searchPagoSoportado(term).subscribe((data: any) =>{
      this.processPagoSoportadoResponse(data);
    },(error: any) =>{
      console.log("error: ", error);
    });

  }
  guardarCambios(element: PagoSoportadoElement) {
    console.log('Elemento modificado:', element);
    if (element.valorPagarFactura < 1000000 && element.valorPagarFactura!=0) {
      this.mostrarAlerta('El valor a pagar no puede ser menor a $1.000.000');
      element.valorPagarFactura = element.valorPosiblePagoFactura;
      return;
    }
    if (element.valorPagarSuministro < 1000000 && element.valorPagarSuministro!=0) {
      this.mostrarAlerta('El valor a pagar no puede ser menor a $1.000.000');
      element.valorPagarSuministro = element.valorPosiblePagoSuministro;
      return;
    }

    if (element.valorPagarFactura > element.valorPosiblePagoFactura) {
      this.mostrarAlerta('El valor a pagar nivel factura no puede ser mayor que el valor probable de pago nivel factura');
      element.valorPagarFactura = element.valorPosiblePagoFactura;
      return;

    }
    if (element.valorPagarSuministro > element.valorPosiblePagoSuministro) {
      this.mostrarAlerta('El valor a pagar nivel suministro no puede ser mayor que el valor probable de pago nivel suministro');
      element.valorPagarSuministro = element.valorPosiblePagoSuministro;
      return;

    }

    // Llamada al servicio para actualizar el valorPagar
    this.pagoSoportadoService.actualizarPagoSoportado(element).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
      },
      (error: any) => {
        console.error('Error al actualizar:', error);
      }
    );
  }
  mostrarAlerta(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 7000, // Duración de la alerta en milisegundos
      horizontalPosition: 'center', // Posición horizontal: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'top'
    });
  }
}
