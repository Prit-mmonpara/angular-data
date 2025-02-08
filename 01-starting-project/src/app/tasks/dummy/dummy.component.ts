import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.css'
})
export class DummyComponent {
  @Input() showChild! : boolean;
}
