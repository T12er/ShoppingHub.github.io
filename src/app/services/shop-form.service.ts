import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '@popperjs/core';
import { map, Observable } from 'rxjs';
import { of } from 'rxjs';
import { Country } from '../common/country';
import { MyState } from '../common/my-state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {


  private countriesUrl = 'http://localhost:4040/api/countries';
  private statesUrl = 'http://localhost:4040/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }


  getStates(theCountryCode : String): Observable<MyState[]> {


    const searchStatesUrl=`${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }
  

  

  getCreditCardMonths(startMonth : number) : Observable<number[]>{
    let data: number[]=[];

    //build the array
    for(let theMonth=startMonth; theMonth<=12 ; theMonth++){
      data.push(theMonth);
    }

    return of(data); // tye of operator wraps the object as an observable

  }


  getCreditCardYears() : Observable<number[]>{
    let data: number[]=[];

    const startYear: number=new Date().getFullYear();
    const endYear : number=startYear + 10;

    //build the array
    for(let theYear=startYear; theYear<=endYear ; theYear++){
      data.push(theYear);
    }

    return of(data); // tye of operator wraps the object as an observable

  }

  
}


interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}


interface GetResponseStates {
  _embedded: {
    states: MyState[];
  }
}


