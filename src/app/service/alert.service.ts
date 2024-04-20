import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  exitoso(mensaje:string){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
  }

  fallido(mensaje:string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: mensaje,
    });
  }
}