import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControlError } from './model/form-control-error';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss'
})
export class ErrorMessagesComponent {
  @Input() form: FormGroup = {} as FormGroup;
  @Output() errors: EventEmitter<FormControlError[]> =
    new EventEmitter<FormControlError[]>();

  public errorList(): FormControlError[] {
    let errorList: FormControlError[] = [];
    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName) as FormControl;
      if (control && control.invalid && (control.dirty && control.touched)) {
        const errorMsg = control.hasError('required') ? ' ist ein Pflichtfeld.' : ' hat eine fehlerhafte Eingabe.'
        errorList.push(
          {
            name: controlName,
            control: control,
            errorMessage: this.capitalizeFirstLetter(controlName) + errorMsg
          }
        )
      }
    });

    this.errors.emit(errorList);

    return errorList;
  }

  public capitalizeFirstLetter(el: string) {
    return el.charAt(0).toUpperCase() + el.slice(1);
  }

}
