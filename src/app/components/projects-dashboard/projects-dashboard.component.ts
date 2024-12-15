import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {ProjectsService} from './projects.service';
import {finalize, Subject, takeUntil, tap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {WidgetFormComponent} from './widgets/widget-form/widget-form.component';
import {Widget} from './widgets/widget.interface';
import {DeadlineComponent} from './widgets/deadline/deadline.component';
import {ProgressComponent} from './widgets/progress/progress.component';
import {TasksComponent} from './widgets/tasks/tasks.component';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {ResizeDirective} from '../../directives/resize.directive';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-projects-dashboard',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    DeadlineComponent,
    ProgressComponent,
    TasksComponent,
    CdkDropList,
    CdkDrag,
    MatIcon,
    CdkDragHandle,
    ResizeDirective,
    NgStyle
  ],
  templateUrl: './projects-dashboard.component.html',
  styleUrl: './projects-dashboard.component.css'
})
export class ProjectsDashboardComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<void> = new Subject<void>();
  public loading: boolean = false;
  public widgets: Widget[] = []
  private mouseMoveHandler!: () => void;

  constructor(private projectService: ProjectsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getWidgets()
  }

  onResize(data: { width: number, height: number, widgetId: number }): void {
    this.widgets.map(item => {
      if (data.widgetId == item.id) {
        item.width = data.width;
        item.height = data.height;
        console.log(item)
      }
      return item
    })

    this.projectService.updateWidgets(this.widgets)
    console.log('this.widgets', this.widgets)
  }

  deleteWidget(widget: Widget): void {
    this.loading = true
    this.projectService.deleteWidget(widget).pipe(takeUntil(this.unsubscribeAll), finalize(() => this.loading = false)).subscribe({
      next: () => {
        this.widgets = this.widgets.filter(item => item.id !== widget.id)
      },
      error: error => {
        console.log('Ошибка при выполнении операции', error)
      }
    })
  }

  getWidgets(): void {
    this.loading = true
    this.projectService.getWidgets().pipe(takeUntil(this.unsubscribeAll), finalize(() => this.loading = false)).subscribe({
      next: data => {
        this.widgets = [...data]
      },
      error: error => {
        console.log('Ошибка при выполнении операции', error)
      }
    })
  }

  createWidget(widget: Widget): void {
    this.loading = true
    this.projectService.createWidget(widget).pipe(takeUntil(this.unsubscribeAll), finalize(() => this.loading = false)).subscribe({
      next: data => {
        this.widgets.push(widget)
      },
      error: error => {
        alert(error.message)
      },
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
    this.projectService.updateWidgets(this.widgets)
  }


  showWidgetForm(): void {
    const dialogRef = this.dialog.open(WidgetFormComponent, {})
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
      if (data) {
        this.createWidget(data)
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
