import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the GroceriesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/groceries/groceries.html',
})
export class GroceriesPage {

   groceries: any;

  constructor(private navCtrl: NavController) {
    this.groceries = [
            'No Milk',
            'Cheese',
            'Snacks',
            'Apples',
            'Bananas',
            'Peanut Butter',
            'Chocolate',
            'Avocada',
            'Vegemite',
            'Muffins',
            'Paper towels'
        ];
  }

}
