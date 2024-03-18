import {Component, inject, OnInit} from '@angular/core';
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-install-prompt',
  standalone: true,
  imports: [],
  template: `

    @if (modalPwaPlatform === 'IOS') {
      <div id="toast-interactive" class="w-full p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
        <div class="flex">
          <div class="ms-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900">Install Pokemon Companion on Home Screen</span>
            <div class="mb-2 text-sm font-normal">Tap the menu button and then select "Add to Home Screen".</div>
          </div>
          <button type="button" (click)="closePwa()"
                  class="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                  data-dismiss-target="#toast-interactive" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    }
    @if (modalPwaPlatform === 'ANDROID') {
      <div id="toast-interactive"
           class="w-full p-4 text-gray-500 bg-white rounded-lg shadow"
           role="alert">
        <div class="flex">
          <div class="ms-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900">Install App</span>
            <div class="mb-2 text-sm font-normal">Install Pokemon Companion App to your Home Screen.</div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <a href="#" (click)="addToHomeScreen()"
                   class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">Install</a>
              </div>
              <div>
                <a href="#" (click)="closePwa()"
                   class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Not
                  now</a>
              </div>
            </div>
          </div>
          <button type="button" (click)="closePwa()"
                  class="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-interactive" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    }`,
  styles: ``,
  host: {
    class: "w-full"
  }
})
export class InstallPromptComponent implements OnInit {

  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;
  platform = inject(Platform);
  installed = false;

  ngOnInit(): void {
    this.loadModalPwa();
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  async addToHomeScreen() {
    this.modalPwaEvent.prompt();
    let result = await this.modalPwaEvent.userChoice;
    if (result && result.outcome === 'accepted') {
      this.installed = true;
    }
    this.modalPwaPlatform = undefined;
  }

  closePwa(): void {
    this.modalPwaPlatform = undefined;
  }
}
