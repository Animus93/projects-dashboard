import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProjectsDashboardComponent} from './components/projects-dashboard/projects-dashboard.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectsDashboardComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projects-dashboard';
}
