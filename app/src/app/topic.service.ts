import { Injectable } from '@angular/core';
import { Topic } from './topic'
import { TOPICS } from './mock-topics'

@Injectable()
export class TopicService {
    listTopics(): Promise<Topic[]> {
        return Promise.resolve(TOPICS);
    }
}
