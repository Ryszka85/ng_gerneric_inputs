import { Component, Input, Output, inject, input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'special-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './special-input.component.html',
  styleUrl: './special-input.component.scss'
})
export class SpecialInputComponent {
  @Input() isReadOnly: boolean = false;
  @Input() formFieldName: string = '';
  @Input() labelName: string = '';

  form: FormGroup = {} as FormGroup;

  private rootFormGroup = inject(FormGroupDirective);

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;    
    this.labelName = this.isRequired() ? this.labelName + ' *' : this.labelName;
  }

  private isRequired(): boolean {
    return this.formControl.hasError('required');
  }

  public get formControl() {
    return this.form.get(this.formFieldName) as FormControl;
  }

}
