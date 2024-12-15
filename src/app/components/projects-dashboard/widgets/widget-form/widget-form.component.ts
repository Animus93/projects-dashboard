import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Project} from '../../project.Interface';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {ProjectsService} from '../../projects.service';
import {finalize, map, of, startWith, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {MatInput} from '@angular/material/input';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDialogClose, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-widget-form',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput,
    MatProgressSpinner,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './widget-form.component.html',
  styleUrl: './widget-form.component.css'
})
export class WidgetFormComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<void> = new Subject<void>();
  public loading: boolean = false
  public options = [
    {value: 'deadline', name: 'сроки завершения'},
    {value: 'progress', name: 'прогресс выполнения'},
    {value: 'tasks', name: 'количество задач'}]
  public widgetForm: FormGroup = new FormGroup({
    id: new FormControl<number>(Date.now(), Validators.required),
    width: new FormControl<number>(250, Validators.required),
    height: new FormControl<number>(250, Validators.required),
    type: new FormControl<'deadline' | 'progress' | 'tasks' | null>(null, Validators.required),
    project: new FormControl<Project | null>(null, Validators.required),
  })
  public projects: Project[] = []

  constructor(public dialogRef: MatDialogRef<WidgetFormComponent>, private projectService: ProjectsService) {
  }

  ngOnInit() {
    this.widgetForm.get('project')?.valueChanges.pipe(startWith(''), takeUntil(this.unsubscribeAll), switchMap(search => {
      if (typeof search === 'string') {
        this.loading = true
        return this.projectService.getProjects().pipe(tap(() => this.loading = true), map(projects => {
          this.projects = projects.filter(item => item.name.toLowerCase().includes(search?.toLowerCase()));
        }), finalize(() => this.loading = false))
      }

      return of(null)
    })).subscribe()
  }

  onSubmit(): void {
    this.dialogRef.close(this.widgetForm.getRawValue());
  }

  projectName(project: Project): string {
    return project?.name
  }

  clearProjectField(): void {
    this.widgetForm.patchValue({
      project: ''
    })
  }

  ngOnDestroy() {
    this.unsubscribeAll.next()
    this.unsubscribeAll.complete()
  }
}
