import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
  ) {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
