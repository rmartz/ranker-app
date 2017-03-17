import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Topic } from './topic'
import { TopicService } from './topic.service'

@Component({
  selector: 'my-app',
  providers: [TopicService],
  template: `
  <h1>{{title}}</h1>
  <app-topic-detail [topic]="selectedTopic"></app-topic-detail>
  <ul class='topics'>
    <li *ngFor="let topic of topics" [class.selected]="topic === selectedTopic" (click)="onSelect(topic)">
        <span class="badge">{{topic.id}}</span>
        {{topic.label}}
    </li>
  </ul>
  `,
  styles: [`
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .topics {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
      }
      .topics li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
      }
      .topics li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
      }
      .topics li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
      }
      .topics .text {
        position: relative;
        top: -3px;
      }
      .topics .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
      }
  `]
})
export class AppComponent implements OnInit {
    constructor(private topicService: TopicService) { }

    ngOnInit(): void {
        this.getTopics();
    }

    name = 'Ranker';
    topics: Topic[];
    selectedTopic: Topic;
    onSelect(topic: Topic): void {
        this.selectedTopic = topic;
    }

    getTopics(): void {
        this.topicService.listTopics().then(topics => this.topics = topics)
    }
}
