import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KontaktComponent } from "./kontakt/kontakt.component";
import { SpecialInputComponent } from './shared/form/special-input/special-input.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, KontaktComponent, SpecialInputComponent]
})
export class AppComponent {
  title = 'FormFields';
}
