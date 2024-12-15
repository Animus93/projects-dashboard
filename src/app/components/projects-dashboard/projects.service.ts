import {Injectable} from '@angular/core';
import {delay, Observable, of, throwError} from 'rxjs';
import {Project} from './project.Interface';
import {Widget} from './widgets/widget.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects = [
    {
      "id": 1,
      "name": "Проект A",
      "tasksCompleted": 25,
      "tasksTotal": 100,
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }, {
      "id": 4,
      "name": "Проект test",
      "tasksCompleted": 125,
      "tasksTotal": 1100,
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    },
    {
      "id": 2,
      "name": "Проект B",
      "tasksCompleted": 75,
      "tasksTotal": 140,
      "startDate": "2023-06-01",
      "endDate": "2024-03-31"
    },
    {
      "id": 3,
      "name": "Проект С",
      "tasksCompleted": 80,
      "tasksTotal": 85,
      "startDate": "2024-06-01",
      "endDate": "2024-09-31"
    }
  ]

  public widgets: Widget[] = []


  getProjects(): Observable<Project[]> {
    return of(this.projects).pipe(delay(Math.random() * 1000))
  }

  getWidgets(): Observable<Widget[]> {
    const savedWidgets = localStorage.getItem('widgets')
    if (savedWidgets) {
      this.widgets = JSON.parse(savedWidgets)
    }
    return of(this.widgets).pipe(delay(Math.random() * 1000))
  }

  deleteWidget(widget: Widget): Observable<null> {
    this.widgets = this.widgets.filter(item => item.id !== widget.id)
    this.updateWidgets(this.widgets)
    return of(null).pipe(delay(Math.random() * 1000))
  }

  createWidget(widget: Widget): Observable<Widget> {
    const existedWidget = this.widgets.find(item => item.type === widget.type && item.project.id === widget.project.id)
    if (!existedWidget) {

      this.widgets.push(widget)
      this.updateWidgets(this.widgets)

      return of(widget).pipe(delay(Math.random() * 1000))
    } else {
      return throwError(() => new Error(`Виджет данного типа для проекта "${widget.project.name}" уже существует`)).pipe(delay(Math.random() * 1000))
    }
  }

  updateWidgets(widgets: Widget[]) {
    localStorage.setItem('widgets', JSON.stringify(widgets))
  }
}
