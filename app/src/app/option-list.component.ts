import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Option } from './option'
import { OptionService } from './option.service'

@Component({
  selector: 'app-option-list',
  templateUrl: 'app/option-list.component.html',
})
export class OptionListComponent implements OnInit {
    constructor(private optionService: OptionService) { }

    ngOnInit(): void {
        this.getoptions();
    }

    options: Option[];
    selectedOption: Option;
    onSelect(option: Option): void {
        this.selectedOption = option;
    }

    getoptions(): void {
        this.optionService.list().subscribe(
            options => this.options = options.sort((a,b) =>
                a.label.localeCompare(b.label)
            )
        )
    }
}
