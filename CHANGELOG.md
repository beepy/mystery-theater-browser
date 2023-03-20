# Changelog | MysteryTheater.org

## [unreleased]

### Changed

* In generated site only, switching pages on index jump-scrolls top top on index page change. Unable to trivially diagnose (i.e. in test overriding `scrollBehavior` with async scroll, jump still happened before scroll behavior result was resolved). Therefore turning off scroll-to-table-top behavior for now

## [2.2.4] - 2023-03-17 04:08PM

### Changed

* Possible improvement to scroll-to-table-top after page change (behavior not evident in dev; had hacky timed scroll-to-top, now relying on enter transition end event)

## [2.2.3] - 2023-03-02 08:42PM

### Fixed

* About page could fail to show (race condition with calculating percent complete)
* Navigating to index via back button while searching could fail to reflect the correct number of pages
* Jump-to-page input could get overwritten while being used after pending page change initiated

## [2.2.2] - 2023-03-02 12:48PM

### Added

* Keyboard shortcut for search

### Fixed

* Initial request with search would still restore non-search page, giving you blank results
* Cleanup

## [2.2.1] - 2023-02-25 01:09PM

### Added

* Through Episode 337

## [2.2.0] - 2023-02-11 12:48PM

### Added

* Paginated episodes changes:
  * Jump to page control in pagination bar
  * Changing pages scrolls back to the top of the page
  * Transition forward or backward in pages uses appropriate animation

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
