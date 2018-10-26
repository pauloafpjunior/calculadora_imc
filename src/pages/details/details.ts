import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  private _imc: number;
  private _genero: string;
  private _altura: number;  

  constructor(private navParams: NavParams) {
    this._imc = navParams.get('imc');
    this._genero = navParams.get('genero');
    this._altura = navParams.get('altura');
  }

  calcularPesoIdeal() {
    if (this._genero == "M") {
      return ((this._altura * 100) - 100) * 0.9;
    } 
    return ((this._altura * 100) - 100) * 0.85;
  }  

  situacaoIMC() {
    if (this._imc < 18.5) {
      return "Abaixo do peso";
    } else if (this._imc <= 24.9) {
      return "Peso ideal :)";
    } else if (this._imc <= 29.9) {
      return "Sobrepeso";
    } 
    return "Obeso";
  }
}
