import { Component, Input } from '@angular/core';
import { Option } from './option'

@Component({
  selector: 'app-option-detail',
  templateUrl: 'app/topic-detail.component.html'
})
export class OptionDetailComponent {
    @Input()
    option: Option;
}
