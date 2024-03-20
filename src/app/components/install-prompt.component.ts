import {Component, inject, OnInit, signal} from '@angular/core';
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-install-prompt',
  standalone: true,
  imports: [],
  template: `

    @if (isIos()) {
      <div id="ios-toast-interactive" class="w-full p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
        <div class="flex">
          <div class="ms-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900">Install Pokemon Companion on Home Screen</span>
            <div class="mb-2 text-sm font-normal">Tap the menu button and then select "Add to Home Screen".</div>
          </div>
          <button type="button"
                  class="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                  data-dismiss-target="#ios-toast-interactive" aria-label="Close">
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
    @if (isAndroid()) {
      <div id="android-toast-interactive"
           class="w-full p-4 text-gray-500 bg-white rounded-lg shadow"
           role="alert">
        <div class="flex">
          <div class="ms-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900">Install App</span>
            <div class="mb-2 text-sm font-normal">Install Pokemon Companion App to your Home Screen.</div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <button type="button" (click)="addToHomeScreen()"
                   class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">Install</button>
              </div>
              <div>
                <button type="button" data-dismiss-target="#android-toast-interactive"
                   class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Not
                  now</button>
              </div>
            </div>
          </div>
          <button type="button"
                  class="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                  data-dismiss-target="#android-toast-interactive" aria-label="Close">
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
  platform = inject(Platform);
  isAndroid = signal(this.platform.ANDROID);
  isIos = signal(this.platform.IOS);

  ngOnInit(): void {
    this.loadModalPwa();
  }

  private loadModalPwa(): void {
    /*Android device prompt*/
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
      });
    }

    /* iOS device */
    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
      }
    }
  }
  addToHomeScreen() {
    this.modalPwaEvent.prompt();
  }
  public shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.modalPwaEvent !== undefined;
  }

  private isRunningStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }
}
