import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appResize]'
})
export class ResizeDirective {
  @Input() appResize: any;
  @Output() resizeEnd = new EventEmitter<{ width: number, height: number, widgetId: number }>();

  private resizing = false;

  constructor(private el: ElementRef) {
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.target === this.el.nativeElement) {
      this.resizing = true;
    }
  }
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.resizing) {
      this.resizing = false;
      const width = this.el.nativeElement.offsetWidth;
      const height = this.el.nativeElement.offsetHeight;
      this.resizeEnd.emit({width, height, widgetId: this.el.nativeElement.id});

    }
  }
}
