import { DetailsPage } from './../details/details';
import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';
import { InfoPage } from '../info/info';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _genero: string = "M";
  private _peso: number = 1.0;
  private _altura: number = 1.0;
  private _dados_key: string = "DADOS";

  constructor(private toastCtrl: ToastController,
    private navCtrl: NavController,
    private nativeStorage: NativeStorage) {
  }

  set genero(genero: string) {
    this._genero = genero;
  }

  get genero() {
    return this._genero;
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

  irParaTabelaIMC() {
    this.navCtrl.push(InfoPage);
  }

  irParaPesoIdeal() {
    this.navCtrl.push(DetailsPage, {
      altura: this._altura,
      imc: this.calcularIMC(),
      genero: this.genero
    });
  }

  calcularIMC() {
    return (this._peso / (this._altura * this._altura));
  }

  exibirIMC() {
    let imc = this.calcularIMC();
    this.criarToast("IMC = " + new DecimalPipe("en").transform(imc, "1.2-2"));
  }

  salvarDados() {
    let dados = {
      altura: this._altura,
      peso: this._peso,
      genero: this._genero,
    };

    this.nativeStorage.setItem(this._dados_key, dados)
      .then(
        () => this.criarToast("Dados salvos com sucesso!"),
        error => this.criarToast("Erro: " + error)
      );
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
