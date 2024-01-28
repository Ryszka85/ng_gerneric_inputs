import { Component, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SpecialInputComponent } from '../shared/form/special-input/special-input.component';
import { CommonModule } from '@angular/common';
import { FormControlError } from '../shared/form/error-messages/model/form-control-error';
import { ErrorMessagesComponent } from '../shared/form/error-messages/error-messages.component';



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    SpecialInputComponent,
    ErrorMessagesComponent
  ],
  templateUrl: './kontakt.component.html',
  styleUrl: './kontakt.component.scss'
})
export class KontaktComponent {
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
    const nameRegex = /^[a-zA-Z]+(?:['-][a-zA-Z]+)*$/;
    this.form = this.fb.group(
      {
        email: ['', Validators.email],
        vorname: ['', [Validators.required, Validators.pattern(nameRegex)]],
        nachname: ['', [Validators.required, Validators.pattern(nameRegex)]]
      }
    );

    this.formFields = [
      this.formControlFrom(KontaktComponent.EMAIL),
      this.formControlFrom(KontaktComponent.VORNAME),
      this.formControlFrom(KontaktComponent.NACHNAME)
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
