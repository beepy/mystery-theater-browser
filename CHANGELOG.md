# Changelog | MysteryTheater.org

## [unreleased]

### Added

* Jump to page control in pagination bar

### Changed

* Inline SVGs moved to separate SVG files

## [2.1.0] - 2023-02-06 11:41AM

### Fixed

* Existing build speed problem
  * with nuxt 3/content 2 build was taking 3x - 8x as long as nuxt 2/content 1
    * local build with nuxt 3 version takes 4:10 vs nuxt 2 at 00:25.
    * on netlify, nuxt 3 takes 11 minutes, nuxt 2 took about 4 minutes
  * leading contributing cause was fetching of episodes on artists' pages
  * changed data to output episode id and title into artist content so it does not need to be separately fetched for each artist
  * local generate time reduced to 1:44; build on netfliy reduced to 6:41. Cut time in half, but still not as good as nuxt 2

## [2.0] - 2023-02-05 05:11PM

### Changed

* Updated to nuxt 3, nuxt content 2, pinia
* Home link in upper left now takes you back to the page you were on and preserves search state
* Removed download button; not reliable on mobile where device could go to sleep and leave download incomplete
* Had to re-implement search (not supported by nuxt content 2 for static sites). Seems much faster.

## [1.0] - 2021-07-01 12:00AM

### Added

* Initial release; date approximate

---

https://keepachangelog.com/en/1.0.0/
