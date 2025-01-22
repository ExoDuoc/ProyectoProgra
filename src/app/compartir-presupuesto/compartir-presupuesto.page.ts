import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-compartir-presupuesto',
  templateUrl: './compartir-presupuesto.page.html',
  styleUrls: ['./compartir-presupuesto.page.scss'],
})
export class CompartirPresupuestoPage {
  // Declaramos la propiedad 'correo'
  correo: string = '';

  constructor(private toastController: ToastController) {}

  // Función 'compartir' que maneja la lógica del botón
  compartir() {
    if (!this.correo) {
      this.presentToast('Por favor ingrese un correo válido.', 'danger');
      return;
    }

    // Aquí agregar lógica para verificar si el correo está en la base de datos local
    // Si es válido, se procederá con el envío del presupuesto

    this.presentToast('Presupuesto enviado con éxito!', 'success');
  }

  // Función para mostrar un mensaje de Toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}
