import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'deletePhoneDashes',
  standalone: true
})
export class DeletePhoneDashesPipe implements PipeTransform {

  transform(value: string | undefined): string | null {
    if (!value) {
      return null;
    } else {
      return value.includes('-') ? value.replaceAll('-', '') : value;
    }
  }

}
