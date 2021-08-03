import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() timeOutInMillis: number = 1500;

  @Input() text: string = '';

  status: 'idle' | 'pending' | 'success' | 'error' = 'idle';

  @Input() color: 'primary' | 'accent' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  get colorInverse(): 'primary' | 'accent' {
    if (this.color == 'primary') return 'accent';

    return 'primary';
  }

  @Input() pendingText: string = 'button.messages.loading';
  @Input() successMessage: string = 'button.messages.successMessage';
  @Input() errorMessage: string = 'button.messages.errorMessage';

  @Input() disabled: boolean = false;

  get disabledMode(): boolean {
    return this.disabled || this.status != 'idle';
  }

  @Input() action: () => Promise<any> = async () => {};

  constructor() {}

  ngOnInit(): void {}

  async execute() {
    try {
      this.status = 'pending';
      await this.action();
      this.status = 'success';
      await this.delay(this.timeOutInMillis);

      this.status = 'idle';
    } catch (error) {
      console.error('Failed executing action with error', error);

      this.status = 'error';
      await this.delay(this.timeOutInMillis);
      this.status = 'idle';
    }
  }

  delay = (timeOutInMilliSeconds: number) =>
    new Promise((resolve) => setTimeout(resolve, timeOutInMilliSeconds));
}
