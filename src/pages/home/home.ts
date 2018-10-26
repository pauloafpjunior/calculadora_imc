import { DetailsPage } from './../details/details';
import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';
import { InfoPage } from '../info/info';
import { NativeStorage } from '@ionic-native/native-storage';
import { Person } from '../../model/person';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _person: Person;
  private readonly _dados_key: string = "DADOS";

  set person(person: Person) {
    this._person = person;
  }

  get person() {
    return this._person;
  }

  constructor(private toastCtrl: ToastController,
    private navCtrl: NavController,
    private nativeStorage: NativeStorage) {
      this._person = new Person();
  }

  irParaTabelaIMC() {
    this.navCtrl.push(InfoPage);
  }

  irParaPesoIdeal() {
    this.navCtrl.push(DetailsPage, {
      person: JSON.stringify(this._person)
    });
  }

  exibirIMC() {
    let imc = this.person.calcularIMC();
    this.criarToast("IMC = " + new DecimalPipe("en").transform(imc, "1.2-2"));
  }

  ionViewDidEnter() {
    this.nativeStorage.getItem(this._dados_key)
      .then(
        data => this.person = Person.copia(JSON.parse(data)),
        error => this.criarToast("Você não possui dados salvos no momento!")
      );
  }

  salvarDados() {
    this.nativeStorage.setItem(this._dados_key, JSON.stringify(this.person))
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
