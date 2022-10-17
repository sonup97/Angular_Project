import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], args?: string): any[] {
    if (args === 'itemName' || args === 'itemType' || args === 'sourceCountry' || args === 'destinationCountry' || args === 'selectedHarborLocations') {
      if (args === 'itemName') {
        return value.sort((a: any, b: any) => {
          if (a.itemName < b.itemName) {
            return -1;
          } else if (a.itemName > b.itemName) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (args === 'itemType') {
        return value.sort((a: any, b: any) => {
          if (a.itemName < b.itemName) {
            return -1;
          } else if (a.itemName > b.itemName) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (args === 'sourceCountry') {
        return value.sort((a: any, b: any) => {
          if (a.itemName < b.itemName) {
            return -1;
          } else if (a.itemName > b.itemName) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (args === 'destinationCountry') {
        return value.sort((a: any, b: any) => {
          if (a.itemName < b.itemName) {
            return -1;
          } else if (a.itemName > b.itemName) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (args === 'selectedHarborLocations') {
        return value.sort((a: any, b: any) => {
          if (a.itemName < b.itemName) {
            return -1;
          } else if (a.itemName > b.itemName) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    } else if (args === 'quantity' || args === 'amount') {
      if (args === 'quantity') {
        return value.sort((a: any, b: any) => {
          if (a.quantity < b.quantity) {
            return -1;
          } else if (a.quantity > b.quantity) {
            return 1;
          } else {
            return 0;
          }
        })
      }
      if (args === 'amount') {
        return value.sort((a: any, b: any) => {
          if (a.amount < b.amount) {
            return -1;
          } else if (a.amount > b.amount) {
            return 1;
          } else {
            return 0;
          }
        })

      }
    }
    return value;
  }
}
