import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {

  @Input()
  public formField?: FormControl
  

  constructor() { }

  
  getErrorMessage(): string {
    if (this.formField?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.formField?.hasError('minlength')) {
      return 'Not long enough'
    }

    return this.formField?.hasError('email') ? 'Not a valid email' : '';
  }

}
