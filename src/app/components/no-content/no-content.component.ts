import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div class="not-found">
      <img src="../../../assets/img/not-found.png" alt="not found">
    </div>
  `,
  styles: [`
    .not-found {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .not-found img {
      width: 400px;
      height: auto;
    }
  `]
})
export class NoContentComponent {

}
