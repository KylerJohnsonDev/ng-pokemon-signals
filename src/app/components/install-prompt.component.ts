import {Component, inject, OnInit, signal} from '@angular/core';
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-install-prompt',
  standalone: true,
  imports: [],
  template: `

    @if (isIos() && !isRunningStandalone()) {
      <div id="ios-toast-default" class="flex items-center w-full p-4 text-gray-500 bg-white shadow" role="alert">
        <div class="ms-3 text-sm font-normal">Tap the menu button and then select "Add to Home Screen" to install
          Pokemon PWA.
        </div>
        <button type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                data-dismiss-target="#ios-toast-default" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    }
    @if (isAndroid() && shouldInstall()) {
      <div id="android-toast-message-cta"
           class="w-full p-4 text-gray-500 bg-white shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
        <div class="flex gap-4">
          <div class="ms-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Add Pokemon PWA to homescreen.</span>
          </div>
          <button type="button" (click)="addToHomeScreen()"
                  class="px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Install PWA
          </button>

          <button type="button"
                  class="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                  data-dismiss-target="#android-toast-message-cta" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
  isInstalled =signal(false);

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
        this.isIos.set(true);
      }
    }
  }

  addToHomeScreen() {
    this.modalPwaEvent.prompt();
    this.modalPwaEvent.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.isInstalled.set(true);
      } else {
        this.isInstalled.set(false);
      }
    });
  }

  public shouldInstall(): boolean {
    return !this.isRunningStandalone() && !this.isInstalled();
  }

  public isRunningStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }
}
