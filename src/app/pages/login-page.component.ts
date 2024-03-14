import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authStore } from '../auth.store';

@Component({
  selector: 'app-login-page',
  host: {
    class: 'w-full',
  },
  template: `
    <section class="py-10 bg-gray-900 sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Welcome PokeFans!
          </h2>
          <p
            class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-100"
          >
            Login to your account
          </p>
        </div>

        <form
          class="max-w-xl mx-auto"
          [formGroup]="signInForm"
          (ngSubmit)="onSubmit()"
        >
          <div
            class="mt-2.5 relative text-gray-400 focus-within:text-gray-600 mb-2"
          >
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>

            <input
              formControlName="email"
              type="email"
              name=""
              id="email"
              placeholder="Enter email to get started"
              class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
            />
          </div>
          <button
            type="submit"
            class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
          >
            Send Magic Link
          </button>

          <hr class="h-px my-8 border-0 bg-gray-700" />

          <button
            (click)="authStore.signInWithGoogle()"
            type="button"
            class="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-gray-800 border-2 border-gray-700 rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
          >
            <div class="absolute inset-y-0 left-0 p-4">
              <svg
                class="w-6 h-6 text-rose-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                ></path>
              </svg>
            </div>
            Sign in with Google
          </button>
        </form>
      </div>
    </section>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginPageComponent {
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
  });

  readonly authStore = inject(authStore);

  constructor(private readonly formBuilder: FormBuilder) {}

  async onSubmit(): Promise<void> {
    this.loading = true;
    const email = this.signInForm.value.email as string;
    await this.authStore.signIn(email);
    this.signInForm.reset();
    this.loading = false;
  }

  signInWithGoogle(): void {}
}
