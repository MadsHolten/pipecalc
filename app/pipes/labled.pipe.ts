import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'labled'})

export class LabledPipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
      if (!items) return [];
      
      //Only return items with a label
      return items.filter( item => item['dk_label']);
  }
}