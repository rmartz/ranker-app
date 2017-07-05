import { OptionService } from './option.service'

import { Component, Input } from '@angular/core';
import { Option } from './option'

@Component({
  selector: 'app-option-detail',
  templateUrl: 'app/option-detail.component.html'
})
export class OptionDetailComponent {
    @Input()
    option: Option;

    confirmingDelete: boolean

    constructor(private optionService: OptionService) { }

    updateName(name: string) {
        console.log("Updating name to '" + name + "'")
        this.optionService
            .update(this.option, {'label': name})
            .subscribe(() => this.option.label = name)
    }

    delete() {
        this.optionService
            .delete(this.option)
            .subscribe(() => this.option = null)
    }
}
