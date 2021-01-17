# Portfolio website

My personal portfolio website [here](https://lyfing.fr).

## Built with
- HTML5 / CSS3
- SASS
- Vue.js and Vue CLI 4

## Optmizations
- HTML pages are pre-rendered (thanks to the [`prerender-spa-plugin`](https://github.com/chrisvfritz/prerender-spa-plugin)) during the build process since it's a static websites and imo using a server-side prerender framework (like Nuxt) may have been to overkill. The statics files are deployed and served by Nginx.
- Scores >90 on Lighthouse for Performance, Accessibility, Best Practices and SEO.

## Features
- Five pages
  - **Home**: Type writing animation embedded in a reusable [Vue component](https://github.com/MrLyfing/personal-website/blob/master/src/components/TypeWriterEffect.vue) to show my info.
  - **About**: [Timeline](https://github.com/MrLyfing/personal-website/blob/master/src/components/Timeline.vue) showing my past work experiences 
  - **Skills**: Logo of technologies (Vue.js, JS, CSS, HTML...) animated in circle and rotateX on 360° when hovered
    - [RotatingCircle.vue](https://github.com/MrLyfing/personal-website/blob/master/src/components/RotatingCircle.vue)
    - [RotatingCircleItem.vue](https://github.com/MrLyfing/personal-website/blob/master/src/components/RotatingCircleItem.vue)
  - **Works**: Showcase projects and they can be filtered
  - **Contact**: Simple form which send an email to me when submitted using [emailjs](https://www.emailjs.com/)
- Responsive layout from desktop, tablet and mobile
- Settings button (bottom right corner)
  - Light / Dark theme
  - English / French languages

## Deployment with Githhub Actions
Configuration file `.github/workflows/scp_deploy.yml`


## Design inspiration
- Used the similar colors, layouts and some functionalities from https://jacekjeznach.com/ website
- Reimplemented [My Works](https://lyfing.fr/works) page as similar as https://caferati.me/portfolio to showcase my projects


