---
layout:     post
title:      New Year Web Searches
date:       2015-01-02 12:31:19
summary:    The top searches in the 1<sup>st</sup> hour of 2015.
categories: linux
---

### The top searches in the 1<sup>st</sup> hour of 2015

This post was created to get an idea of what questions were in people's heads at the very start of 2015.

##### Data

It's not possible to know what _every_ search on the internet was during the first hour of 2015. So a proxy was needed.

Given that Wikipedia entries are often very near the top of search results, the publically available page view statistics from this site were used. These show the number of times a Wiki page was viewed in a given hour.


##### Top 10 Results

_(no. of page views shown in brackets)_

1. [Adam Lambert](http://en.wikipedia.org/wiki/Adam_Lambert) (21,793) - Queen (the band) had their own TV show on BBC1 for New Year's. It looks like I wasn't the only person wondering who was singing in Freddie Mercury's place.
2. [Wikipedia:Your first article](http://en.wikipedia.org/wiki/Wikipedia:Your_first_article) (16,369) - Is this a New Year's Resolution thing? - _"No.1 Exercise; No.2 Write something on Wikipedia"_?!
3. [Mobile Launcher Platform](http://en.wikipedia.org/wiki/Mobile_Launcher_Platform) (15,432) - A NASA device for space launches.
4. [Gulf War](http://en.wikipedia.org/wiki/Gulf_War) (13,824) - This relates to the First Gulf War (1990-'91).
5. [Edward Herrmann](http://en.wikipedia.org/wiki/Edward_Herrmann) (9,785) - This US actor passed away on December 31<sup>st</sup>.
6. [John Deacon](http://en.wikipedia.org/wiki/John_Deacon) (8,395) - The ex-Queen bassist.
7. [Billboard 200](http://en.wikipedia.org/wiki/Billboard_200) (8,282) - Checking which album was US number one in 2014?
8. [Queen (band)](http://en.wikipedia.org/wiki/Queen_(band)) (6,993) - another Queen search.
9. [Brian May](http://en.wikipedia.org/wiki/Brian_May) (6,390) - Queen's lead guitarist.
10. [Auld Lang Syne](http://en.wikipedia.org/wiki/Auld_Lang_Syne) (5,925) - People wondering why that song is always sung?

_(*Note that these results include page views stats from all over the world for the hour after midnight (GMT), not just the UK and Ireland.)_

It looks like Queen's BBC1 show did wonders for their good showing in the results - searches related to the band accounted for 4 of the top 10 results. There was no sign of the artists on Jools Holland's Hootenanny which was on BBC2 at the same time.

<p>
	<a href="http://commons.wikimedia.org/wiki/File:AdamLambert-Queen_7-1-14_SJ.jpg#mediaviewer/File:AdamLambert-Queen_7-1-14_SJ.jpg"><img alt="AdamLambert-Queen 7-1-14 SJ.jpg" src="http://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/AdamLambert-Queen_7-1-14_SJ.jpg/512px-AdamLambert-Queen_7-1-14_SJ.jpg" height="480" width="640"></a><br>
	<a href="http://commons.wikimedia.org/wiki/File:AdamLambert-Queen_7-1-14_SJ.jpg#mediaviewer/File:AdamLambert-Queen_7-1-14_SJ.jpg">Image</a> from <a rel="nofollow" class="external text" href="https://twitter.com/DianaKat1">@DianaKat1</a>. Licensed under <a title="Creative Commons Attribution-Share Alike 3.0" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>.
</p>

---

##### Technical details...

The Wikimedia log file for the hour after New Years (GMT) was downloaded [here](https://dumps.wikimedia.org/other/pagecounts-raw/2015/2015-01/) (_"Page view statistics for Wikimedia projects"_).

It was then loaded into a Linux virtual machine where the terminal and 'grep' command were used to search through the log file's 5.9M records.

This grep search looked for all lines that started with 'en_' (entries related to English language Wikipedia pages). It then ranked the resulting lines in descending order of popularity (page views).

Three humdrum results were removed from the top 10 shown above ([Main_Page](http://en.wikipedia.org/wiki/Main_Page), [Special:HideBanners](http://en.wikipedia.org/wiki/Special:HideBanners), [Special:Search](http://en.wikipedia.org/wiki/Special:Search)).