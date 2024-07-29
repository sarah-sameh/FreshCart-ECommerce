import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBlankComponent,NavAuthComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
