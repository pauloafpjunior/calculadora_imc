import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';
import { Person } from '../../model/person';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  private _person: Person = new Person();  

  get person() {
    return this._person;
  }

  constructor(private navParams: NavParams) {
    this._person = Person.copia(JSON.parse(this.navParams.get("person")));
  }
}
