import { Injectable } from '@angular/core';
import { Topic } from './topic'
import { TOPICS } from './mock-topics'
import { Option } from './option'
import { OPTIONS } from './mock-options'

@Injectable()
export class TopicService {
    listTopics(): Promise<Topic[]> {
        return Promise.resolve(TOPICS);
    }

    listTopicOptions(topic: Topic): Promise<Option[]> {
        return Promise.resolve(topic.options.map(function(id) {
            return OPTIONS[id]
        }));
    }
}
