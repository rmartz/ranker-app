import { Component, Input } from '@angular/core';
import { Option } from './option'

@Component({
  selector: 'app-option-detail',
  templateUrl: 'app/option-detail.component.html'
})
export class OptionDetailComponent {
    @Input()
    option: Option;
}
