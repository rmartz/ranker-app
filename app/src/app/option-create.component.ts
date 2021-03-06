import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Option } from './option'
import { OptionService } from './option.service'

@Component({
  selector: 'app-option-create',
  templateUrl: 'app/option-create.component.html',
})
export class OptionCreateComponent {
    constructor(private optionService: OptionService) { }

    creating: boolean;
    @ViewChild('name') input: any;

    create(name: string): void {
        this.optionService.create(name).subscribe(() => {
            this.creating = false;
            this.input.nativeElement.value = '';
        });
    }

    showCreate() {
        this.creating = true;
        // Use setTimeout so focus is given after the element is un-hidden
        setTimeout(() => { this.input.nativeElement.focus() });
    }

    hideCreate() {
        this.creating = false;
    }
}
