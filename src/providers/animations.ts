import { animate, AUTO_STYLE, state, style, transition, trigger } from "@angular/animations";

export const FadingAnimation = trigger(
  "fading", [
    transition(":enter", [
      style({ opacity: 0 }),
      animate("200ms", style({ opacity: 1 })),
    ]),
    transition(":leave", [
      style({ opacity: 1 }),
      animate("200ms", style({ opacity: 0 })),
    ]),
  ],
);

export const SlowFadingAnimation = trigger(
  "slowFading", [
    transition(":enter", [
      style({ opacity: 0 }),
      animate("500ms", style({ opacity: 1 })),
    ]),
    transition(":leave", [
      style({ opacity: 1 }),
      animate("200ms", style({ opacity: 0 })),
    ]),
  ],
);

export const FadeInRightAnimation = trigger(
  "fadeInRight", [
    transition(":enter", [
      style({ "opacity": 0, "-webkit-transform": "translate3d(100%, 0, 0)", "transform": "translate3d(100%, 0, 0)" }),
      animate("700ms ease-out", style({ "opacity": 1, "-webkit-transform": "none", "transform": "none" })),
    ]),
    transition(":leave", [
      style({ "opacity": 1, "-webkit-transform": "none", "transform": "none" }),
      animate("700ms ease-out", style({ "opacity": 0, "-webkit-transform": "translate3d(100%, 0, 0)", "transform": "translate3d(100%, 0, 0)" })),
    ]),
  ],
);

export const FadeInLeftAnimation = trigger(
  "fadeInLeft", [
    transition(":enter", [
      style({ "opacity": 0, "-webkit-transform": "translate3d(-100%, 0, 0)", "transform": "translate3d(-100%, 0, 0)" }),
      animate("700ms ease-out", style({ "opacity": 1, "-webkit-transform": "none", "transform": "none" })),
    ]),
    transition(":leave", [
      style({ "opacity": 1, "-webkit-transform": "none", "transform": "none" }),
      animate("700ms ease-out", style({ "opacity": 0, "-webkit-transform": "translate3d(-100%, 0, 0)", "transform": "translate3d(-100%, 0, 0)" })),
    ]),
  ],
);

export const SlideDownAnimation = trigger(
  "slideDown", [
    transition(":enter", [
      style({ "opacity": 0, "-webkit-transform": "translate3d(0, -100%, 0)", "transform": "translate3d(0, -100%, 0)" }),
      animate("700ms ease-out", style({ "opacity": 1, "-webkit-transform": "none", "transform": "none" })),
    ]),
    transition(":leave", [
      style({ "opacity": 1, "-webkit-transform": "none", "transform": "none" }),
      animate("700ms ease-out", style({ "opacity": 0, "-webkit-transform": "translate3d(0, -100%, 0)", "transform": "translate3d(0, -100%, 0)" })),
    ]),
  ],
);
