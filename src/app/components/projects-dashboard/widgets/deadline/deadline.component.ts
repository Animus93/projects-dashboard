import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Widget} from '../widget.interface';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-deadline',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './deadline.component.html',
  styleUrl: './deadline.component.css'
})
export class DeadlineComponent {
  @Input() widget!: Widget;
  @Output() widgetEvent = new EventEmitter<Widget>();

  delete(): void {
    this.widgetEvent.emit(this.widget);
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль, если день < 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  getDaysRemaining(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMs = end.getTime() - start.getTime();
    const daysRemaining = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? daysRemaining : 'проект завершен';
  }
}
