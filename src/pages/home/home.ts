import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _peso: number = 1.0;
  private _altura: number = 1.0;

  constructor(private toastCtrl: ToastController) {
  }

  set peso(peso: number) {
    this._peso = peso;
  }

  get peso() {
    return this._peso;
  }

  set altura(altura: number) {
    this._altura = altura;
  }

  get altura() {
    return this._altura;
  }

  calcularIMC() {
    let imc = this._peso / (this._altura * this._altura);
    this.criarToast("IMC = " + new DecimalPipe("en").transform(imc, "1.2-2"));
  }

  criarToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }

}
