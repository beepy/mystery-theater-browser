---
title: About “Mystery Theater Browser”
description: 'A user-friendly way to discover episodes of CBS Radio Mystery Theater.'
---

# About Mystery Theater Browser

This site was created to provide a user-friendly way to browse and discover episodes of CBS Radio Mystery Theater, and to surface high-fidelity recordings when available.

## What Is Mystery Theater?

Mystery Theater was an hour-long radio program that ran from 1974 through 1982, thirty years after radio drama’s hayday. There were 1,399 original episodes. It was a revival of sorts for its creator, the prolific Himan Brown, who had created the similar “Inner Sactum” radio program in 1941. Many of the same actors and writers from the 40s joined the production.

Thematically, it is similar to the television programs “Alfred Hitchcock Presents” and “The Twilight Zone,” with the occasional addition of other genres such as spy thrillers, westerns, historical drama, or adaptations of classic literature.

Interest in Mystery Theater has resurfaced here and there, with rebroadcasts by CBS radio in the late 1990s and by Public Radio in the early 2000’s. Many collectors have assembled recordings and catalogs of the episodes and many of these collections have been uploaded to the Internet Archive.

## Why This Site?

There are currently two complete collections of Mystery Theater available on the wonderful Internet Archive, but the archive does not provide a wonderful way to discover content. This site seeks to privde an ad-free, mobile-friendly way to browse the episodes, with accurate, spoiler-free descriptions and links directly to the audio.

The two complete collections are:

1. [A complete collection of unknown origin](https://archive.org/details/cbs_radio_mystery_theater); many of the recordings are low fidelity.
2. [David Oxford’s "Best of Available” collection via Ken Long](http://cbsrmt.thelongtrek.com/); with permission I uploaded this collection (and others) to the Internet Archive; generally the fidelity is indeed the best available, but many episodes contain commercial breaks.

### Progress

Each episode is being manually reviewed to ensure the best recording is offered. At the same time, new descriptions are being written and episodes are receiving thematic tags (e.g., whoddunit, sci-fi, paranormal).

When the best available recording contains unrelated radio segments or commercial breaks, I am creating a new audio file with those segments removed. While the audio format, MP3, is lossy, meaning the encoding processes dregrades the quality from the original, the segments are created without decoding and re-encoding, so there should be no additional loss in quality. However, this method means that the accuracy of the edits is limited by the "frame size" of the source MP3s, which varies but can be around a quarter of a second. Therefore, you may hear a "blip" — a fraction of a second of commercial audio — at the beginning or end of these edits.

Currently {{complete}} episodes have been processed ({{percent}}%). Estimated completion date is January 2025.

## Sources

I have no connection with these individuals; they have generously provided these resources for this public domain work on the web which I have used to compile the data for this site:

* Keith Flowers: [his website](http://www.nettally.com/keith.flowers/main.htm) and [his digitized high-fidelity reel-to-reel recordings](https://archive.org/details/CBSRMTKf)
* Ken Long: [his website](http://cbsrmt.thelongtrek.com/) and his many invaluable collections
* https://www.cbsrmt.com/
* https://www.radioechoes.com/?page=series&genre=OTR-Mystery&series=CBS%20Radio%20Mystery%20Theater

## Technology

### About the Download Behavior

This site links directly to MP3s hosted on archive.org. Most visitors will prefer to download the episodes and listen to them later, possibly on a mobile device.

Unfortunately, archive.org doesn't serve MP3s in a way that allows them to be dowloaded without additional interaction:[^1] most browsers require links to these MP3s to be right-clicked, or control-clicked, or long-pressed to download them. Otherwise, most browsers will attempt to play the MP3 directly.

To make downloading the episodes more convenient, so that you don't need to specify that you wish to download and not immediately listen to an MP3 every single time, this site does some fancy stuff[^2] so that one-click downloading works. The download progress will be shown on the download button, and in the site’s menu bar, but not in your browser’s normal download interface. When the MP3 has been fetched, it will then be added to your system and appear in your browser’s download interface.

You shouldn't navigate away from the site when you’re downloading, because the download will stop and you will lose progress. You can, however, navigate away from the episode you are downloading to any other page on the site. You can also queue as many episodes as you like for downloading.

If for any reason you have trouble downloading, you can use the **Direct Link** link underneath the download button. Right-clicking, or control-clicking, or long-pressing will bring up a contextual menu where you will be able to download the MP3 using your browser’s normal interface.

### About the Site

This site uses [nuxt 3](https://nuxt.org/) and is hosted on [netlify](https://www.netlify.com/).

[^1]: Actually, episodes in the [complete collection (of varying quality)](https://archive.org/download/cbs_radio_mystery_theater/) — *are* served correctly, possibly because they are part of large single zip file. Other MP3s are not — they do not have the correct headers returned by the server, specifically `Content-Disposition: attachment`
[^2]: The browser will fetch the file’s contents (in memory) then represent these contents as a ”blob” of data, which then gets ”downloaded” by the browser like a normal file.
