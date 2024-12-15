import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Widget} from '../widget.interface';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input() widget!: Widget;
  @Output() widgetEvent = new EventEmitter<Widget>();

  delete(): void {
    this.widgetEvent.emit(this.widget);
  }
}
