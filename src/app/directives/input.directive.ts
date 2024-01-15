import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  WritableSignal,
} from '@angular/core';

// EXPERIMENTING - with signals and directives - do not use in production app
@Directive({
  selector: '[signalInput]',
  standalone: true,
})
export class SignalInputDirective implements OnInit {
  // TODO: keep an eye out for the RC version containing signal components
  // update below input to use `model` input function once available
  // will the `model` input function allow me to run the effect in this component when the
  // signal updates? Today, this doesn't work so I don't have "true" two-way data-binding functionality
  @Input() signal!: WritableSignal<string>;
  @HostBinding('value') inputValue!: string;
  @HostListener('input', ['$event.target.value'])
  handleInput(value: string): void {
    this.signal.set(value);
  }

  ngOnInit(): void {
    this.inputValue = this.signal();
  }
}
