import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageComponent {
  private messageService = inject(MessageService);
  enteredText = '';

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    this.messageService.addMessage(this.enteredText)
    this.enteredText = ''
  }
}
