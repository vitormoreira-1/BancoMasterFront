import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutesComponent } from './components/routes/routes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoutesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BancoMasterACT';
}
