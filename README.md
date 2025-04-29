# vite-plugin-html-include

A very simple plugin to import HTML partials in your HTML.

example: 

```html
<body>
    <section id="screen-1" class="hidden">
        <include src="./src/screens/screen1.html" />
    </section>
    <section id="screen-2" class="hidden">
        <include src="./src/screens/screen2.html" />
    </section>
</body>
```

It just finds and replaces the "include" tags with whichever content was inside the references src file.

Its pretty good if you want to do simple projects with static HTML pages.


## Usage

Just add this plugin to vite's config:

```ts
import { htmlInclude } from "vite-plugin-html-include";

export default defineConfig( {
    plugins: [
        htmlInclude(),
    ],
} );
```