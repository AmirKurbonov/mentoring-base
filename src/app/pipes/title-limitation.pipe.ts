import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'titleLimitation',
  standalone: true
})
export class TitleLimitationPipe implements PipeTransform {
  transform(value: string): string {
    return value.length > 20 ? value.substring(0, 19) + '...' : value;
  }
}
