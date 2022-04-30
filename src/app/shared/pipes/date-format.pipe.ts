import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let output = '';

    let offset = new Date(value).getTime() - (new Date(value)).getTimezoneOffset() * 60000;

    let todayOffset = new Date().getTime() - (new Date()).getTimezoneOffset() * 60000;

    value = new Date(offset).toISOString();

    value = value.split('.')[0];

    let array = value.split('T');

    output = array[1];

    let today = new Date(todayOffset).toISOString().split('T')[0];

    if (today !== array[0]) {
      let dateArray = array[0].split('-');

      let todayArray = today.split('-');

      output = dateArray[1] + '. ' + dateArray[2] + '.' + ' ' + output;

      if (todayArray[0] !== dateArray[0]) {
        output = dateArray[0] + '. ' + output;
      }
    }

    return output;
  }
}
