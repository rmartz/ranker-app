import { Component } from '@angular/core';

export class Topic {
  id: number;
  label: string;
};

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <h2>{{topic.label}}</h2>
  <div><label>id: </label>{{topic.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="topic.label" placeholder="label">
  </div>
  `
})
export class AppComponent  {
    name = 'Ranker';
    topic: Topic = {
        id: 1,
        label: "Best Restaurants"
    };
}
