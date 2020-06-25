---
title: FAQ
---

### Is it a replacement for Lodash and Underscore?

Kind of. Undercut provides Pull Lines, which are a good replacement for `Lodash.chain` (without loading entire library), and various utilities for objects/functions/etc. Right now Lodash has more functionality, but Undercut should gain parity with time. The difference is that Undercut is ESM focused and provides only what is missing in the modern language like `Array.isArray` vs. `isArray` utility. Undercut also has more advanced features like Push Lines and supports tree shaking natively.

### Why it isn't 1.0 yet?

We have many ideas like asynchronous pipelines, advanced cli, Coruntime, etc. So, the 1.0 will have much more features. We also need some time for wider production testing.

### Is it production ready?

We use Undercut on our personal projects, but don't know any sufficiently large enterprice project that uses it. If you know one, plese send us a message. Undercut has a decent test coverage though.

### What about performance?

Not measured yet, but we're planning to do automatic benchmarking later.

### Why ESNext instead of precompiled version?

Because your target environment may be better than a generic ES5. In this case you will loose some efficiency and run a double-compiled code. Most web apps these days use Babel anyway, so why not to give you best possible code? Moreover, new syntax is sometimes shorter than older one. Also our ESM is compatible with the spec and Node loader out ouf the box (`.js` extensions in imports, etc.) and gives you a nice tree shaking.

BTW, we have precompiled versions: `@undercut/node-10` and `@undercut/web-2019`.

### Is it hard to use Undercut in my project because of ESNext and ESM?

Most likely not. Checkout our [CodeSandbox demo](https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console) on how easy it is to use.

### Do I really need "core-js"?

It depends... Node.js and Chrome were quite good lately in catching up with ES releases, so it may run for you without issues. If your environment has something missing, you'll get an error during runtime. Test your code and if everything is fine, I may omit the `core-js`.

### Can I contibute?

Yes, you can! Start with a GitHub Issue describing what you're going to do. In case of already existing issue just mention there that you want to work on it.

### Do you need a cool logo?

Definitely!
