import { Component } from '@angular/core'
import { PrimeModules } from '../../../prime-modules'

@Component({
    selector: 'app-hero-section',
    imports: [PrimeModules],
    template: `
      <section class="bg-white pt-12">
    <div
        class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        <a
            href="#"
            class="text-primary-700 bg-primary-50 mb-7 inline-flex items-center justify-between rounded-full px-1 py-1 pr-4 text-sm"
            role="alert">
            <span
                class="bg-primary-600 mr-3 rounded-full px-4 py-1.5 text-xs text-white"
                >New</span
            >
            <span class="text-sm font-medium">DOSI is out! See what's new</span>
            <i class="pi pi-arrow-right ml-1"></i>
        </a>
        <h1
            class="mb-4 text-4xl leading-none font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            We invest in the world’s potential
        </h1>
        <p
            class="mb-8 text-lg font-normal text-gray-500 sm:px-16 lg:text-xl xl:px-48 dark:text-gray-400">
            Here at DOSI we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
        </p>
        <div class="flex items-center justify-center gap-4 lg:justify-center">
            <button pButton type="button">
                <span pButtonLabel>Learn More</span>
            </button>
            <button pButton type="button" outlined>
                <span pButtonLabel>Live Demo</span>
            </button>
        </div>
    </div>
</section>
    `,
})
export class HeroSectionComponent {}
