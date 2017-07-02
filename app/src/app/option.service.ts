import { Injectable } from '@angular/core';
import { Option } from './option'
import { OPTIONS } from './mock-options'

@Injectable()
export class OptionService {
    listTopics(): Promise<Option[]> {
        return Promise.resolve(OPTIONS);
    }
}
