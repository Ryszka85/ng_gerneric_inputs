import { FormControl } from "@angular/forms";

export interface FormControlError {
    name: string;
    control: FormControl;
    errorMessage: string;
}