import { Pipe, PipeTransform } from '@angular/core';

import { STATUS_DISPLAY } from '@constants';

@Pipe({
  name: 'orderStatusPipe'
})
export class OrderStatusPipePipe implements PipeTransform {
  transform(status: string): string {
    return STATUS_DISPLAY[status] ? STATUS_DISPLAY[status] : 'Unavailable';
  }
}
