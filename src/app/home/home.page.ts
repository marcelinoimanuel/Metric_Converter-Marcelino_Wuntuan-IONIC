import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    
  }
  result: number = 0;
  checkPrincipalAmount: string | undefined;
  checkInput: boolean = true;
  checkMetricInput: string | undefined;
  inputValue: number = 0;
  indexMetric1: number = 0;
  indexMetric2: number = 0;
  indexMetric3: number = 0;
  metrics = [
    {name: "Suhu"},
    {name: "Massa"},
    {name: "Waktu"},
    {name: "Arus listrik"},
    {name: "Panjang"},
  ];

  lengths = [
    {name: "Milimeter", id: 1},
    {name: "Centimeter", id: 2},
    {name: "Desimeter", id: 3},
    {name: "Meter", id: 4},
    {name: "Dekameter", id: 5},
    {name: "Hektometer", id: 6},
    {name: "Kilometer", id: 7},
  ];

  mass = [
    {name: "Miligram", id: 1},
    {name: "Centigram", id: 2},
    {name: "Desigram", id: 3},
    {name: "Gram", id: 4},
    {name: "Dekagram", id: 5},
    {name: "Hektogram", id: 6},
    {name: "Kilogram", id: 7},
  ];

  time = [
    {name: "Milisekon", id: 1},
    {name: "Centisekon", id: 2},
    {name: "Desisekon", id: 3},
    {name: "Sekon", id: 4},
    {name: "Dekasekon", id: 5},
    {name: "Hektosekon", id: 6},
    {name: "Kilosekon", id: 7},
  ];

  electric_current = [
    {name: "Miliampere", id: 1},
    {name: "Centiampere", id: 2},
    {name: "Desiampere", id: 3},
    {name: "Ampere", id: 4},
    {name: "Dekaampere", id: 5},
    {name: "Hektoampere", id: 6},
    {name: "Kiloampere", id: 7},
  ];

  temperature = [
    {name: "Celcius", id: 1},
    {name: "Fahrenheit", id: 2},
    {name: "Kelvin", id: 3},
  ];

  getMetricIndex1(x: any) {
    this.indexMetric1 = x.target.value.id;
    if(this.inputValue != 0 && this.indexMetric2 != 0)
      this.calculateResult(this.inputValue);
  }

  getMetricIndex2(x: any) {
    this.indexMetric2 = x.target.value.id;
    if(this.inputValue != 0 && this.indexMetric1 != 0)
      this.calculateResult(this.inputValue);
  }

  calculateResult(x: any) {
    if(typeof x == "object") {
      this.inputValue = x.target.value;
    } else {
      this.inputValue = x;
    }
    if(this.indexMetric1 != 0 && this.indexMetric2 != 0) {
      if(this.checkPrincipalAmount == "Panjang" || this.checkPrincipalAmount == "Massa" || this.checkPrincipalAmount == "Waktu" || this.checkPrincipalAmount == "Arus listrik") {
        this.indexMetric3 = this.indexMetric1 - this.indexMetric2;
        console.log(this.inputValue)
        console.log(this.indexMetric1)
        console.log(this.indexMetric2)
        if (this.indexMetric3 > 0) {
          this.result = this.inputValue;
          for(let i=0; i < this.indexMetric3; i++)
            this.result *= 10;
        } else if (this.indexMetric3 < 0) {
          this.indexMetric3 = Math.abs(this.indexMetric3);
          this.result = this.inputValue;
          for(let i=0; i < this.indexMetric3; i++)
            this.result /= 10;
        } else if (this.indexMetric3 == 0)
            this.result = this.inputValue;
      } else if(this.checkPrincipalAmount == "Suhu") {
        if((this.indexMetric1 == 1 && this.indexMetric2 == 1) || (this.indexMetric1 == 2 && this.indexMetric2 == 2) || (this.indexMetric1 == 3 && this.indexMetric2 == 3))
          this.result = this.inputValue;
        else if(this.indexMetric1 == 1 && this.indexMetric2 == 2)
          this.result = (this.inputValue * 9 / 5) + 32;
        else if(this.indexMetric1 == 1 && this.indexMetric2 == 3)
          this.result = Number(this.inputValue) + 273.15;
        else if(this.indexMetric1 == 2 && this.indexMetric2 == 1)
          this.result = (this.inputValue - 32) * 5 / 9;
        else if(this.indexMetric1 == 2 && this.indexMetric2 == 3)
          this.result = ((this.inputValue - 32) * 5 / 9) + 273,15;
        else if(this.indexMetric1 == 3 && this.indexMetric2 == 1)
          this.result = Number(this.inputValue) - 273.15;
        else if(this.indexMetric1 == 3 && this.indexMetric2 == 2)
          this.result = ((this.inputValue - 273.15) * 9 / 5) + 32;
        // Celcius -> Fahrenheit = (0 °C × 9/5) + 32
        // Fahrenheit -> Celcius =  (0 °F − 32) × 5/9
        // Celcius -> Kelvin = 0 °C + 273,15
        // Kelvin -> Celcius = 0 K − 273,15
        // Kelvin -> Fahrenheit = (0 K − 273,15) × 9/5 + 32
        // Fahrenheit -> Kelvin = (0 °F − 32) × 5/9 + 273,15
      }
    }
  }


  handleChange(x: any) {
    this.checkPrincipalAmount = JSON.stringify(x.target.value.name);
    this.checkPrincipalAmount = this.checkPrincipalAmount.replace(/['"]+/g, '');
    this.checkInput = false;
    this.result = 0;
    this.indexMetric1 = 0;
    this.indexMetric2 = 0;
    this.indexMetric3 = 0;
  }

}