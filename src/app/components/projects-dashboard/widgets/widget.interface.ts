import {Project} from '../project.Interface';

export interface Widget {
  width?: number,
  height?: number,
  id: number,
  type: 'deadline' | 'progress' | 'tasks';
  project: Project
}
