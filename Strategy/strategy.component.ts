import { Component, OnInit } from '@angular/core';

enum Status {
  APPROVED = 'approved',
  IN_PROGRESS = 'in_progress',
  TYPING = 'typing'
}

interface Step {
  title: string;
  subtitle: string;
  icon?: string;
}

type IconStrategy = (step: Step, array: Step[]) => string;

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {
  steps: Step[] = [];
  status: Status = Status.TYPING;

  constructor() {}

  ngOnInit(): void {
    this.loadSteps();
    this.updateIcons();
  }

  private loadSteps(): void {
    this.steps = [
      { title: "Step One", subtitle: "Description A" },
      { title: "Step Two", subtitle: "Description B" },
      { title: "Step Three", subtitle: "Description C" },
      { title: "Step Four", subtitle: "Description D" },
      { title: "Step Five", subtitle: "Description E" },
    ];
  }

  private iconStrategies: {
    [key in Status]: IconStrategy;
  } = {
    [Status.APPROVED]: () => 'done',
    [Status.IN_PROGRESS]: (step, array) =>
      step === array.at(-1) ? 'in_progress' : 'done',
    [Status.TYPING]: (step, array) => {
      if (step === array.at(0)) return 'done';
      if (step === array.at(1)) return 'in_progress';
      return 'pending';
    },
  };

  private updateIcons(): void {
    this.steps = this.steps.map((step, _, array) => {
      const strategy = this.iconStrategies[this.status];
      const icon = strategy ? strategy(step, array) : '';
      return { ...step, icon };
    });
  }

}
