import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KontaktComponent } from '../kontakt/kontakt.component';
import { FormControlError } from '../shared/form/error-messages/model/form-control-error';
import { ErrorMessagesComponent } from '../shared/form/error-messages/error-messages.component';
import { SpecialInputComponent } from '../shared/form/special-input/special-input.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    SpecialInputComponent,
    ErrorMessagesComponent],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.scss'
})
export class BankComponent {

  public isReadOnly = false;
  public form: FormGroup = {} as FormGroup;
  public formFields: FormControl[] = [];

  public formInput: FormControlError[] = [];
  private hasError = false;

  private fb = inject(FormBuilder);


  private static readonly EMAIL = 'email';
  private static readonly VORNAME = 'vorname';
  private static readonly NACHNAME = 'nachname';

  constructor() {
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{12,}$/;
    this.form = this.fb.group(
      {
        iban: ['', [Validators.required, Validators.pattern(ibanRegex)]]
      }
    );

    this.formFields = [
      this.formControlFrom('iban'),
    ];

  }

  public isInvalid(): boolean {
    return this.formFields.filter(item => item.invalid).length > 0;
  }

  public formControlFrom(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  handleErrorList(errorList: FormControlError[]) {    
    this.hasError = errorList.length > 0;
  }


  validate() {
    this.isReadOnly = !this.hasError;
  }


  cancel() {
    this.isReadOnly = false;
  }

}
