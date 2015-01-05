---
layout:     post
title:      New Year Web Searches
date:       2015-01-02 12:31:19
summary:    The top searches in the first hour of 2015.
categories: linux
---

### The top searches in the 1<sup>st</sup> hour of 2015

The data I used for this were the hourly pagecount logs from Wikipedia. These show the number of times a page was loaded in the given hour.


##### The top 10 (page counts shown in brackets)

1. [Adam Lambert](http://en.wikipedia.org/wiki/Adam_Lambert) (21,793) - Queen had their own TV show on BBC1 for New Years. Looks like I wasn't the only person wondering who the new singer was.
2. [Wikipedia:Your first article](http://en.wikipedia.org/wiki/Wikipedia:Your_first_article) (16,369) - New Years' Resolution - must write something on Wikipedia!
3. [Mobile Launcher Platform](http://en.wikipedia.org/wiki/Mobile_Launcher_Platform) (15,432)
4. [Gulf War](http://en.wikipedia.org/wiki/Gulf_War) (13,824)
5. [Edward Herrmann](http://en.wikipedia.org/wiki/Edward_Herrmann) (9,785) - This US actor passed away on December 31.
6. [John Deacon](http://en.wikipedia.org/wiki/John_Deacon) (8,395) - The ex-Queen bassist.
7. [Billboard 200](http://en.wikipedia.org/wiki/Billboard_200) (8,282) - Checking which album was number one in 2014?
8. [Queen (band)](http://en.wikipedia.org/wiki/Queen_(band)) (6,993)
9. [Brian May](http://en.wikipedia.org/wiki/Brian_May) (6,390) - Queen's lead quitarist.
10. [Auld Lang Syne](http://en.wikipedia.org/wiki/Auld_Lang_Syne) (5,925) - Why do we always sing that song?!

It looks like Queen did really well. No mention of the artists on Jools Hootenany.

<p>
	<a href="http://commons.wikimedia.org/wiki/File:AdamLambert-Queen_7-1-14_SJ.jpg#mediaviewer/File:AdamLambert-Queen_7-1-14_SJ.jpg"><img alt="AdamLambert-Queen 7-1-14 SJ.jpg" src="http://upload.wikimedia.org/wikipedia/commons/a/a0/AdamLambert-Queen_7-1-14_SJ.jpg" height="480" width="640"></a><br>
	<a href="http://commons.wikimedia.org/wiki/File:AdamLambert-Queen_7-1-14_SJ.jpg#mediaviewer/File:AdamLambert-Queen_7-1-14_SJ.jpg">Image</a> from <a rel="nofollow" class="external text" href="https://twitter.com/DianaKat1">@DianaKat1</a>. Licensed under <a title="Creative Commons Attribution-Share Alike 3.0" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>.
</p>

---

##### Technical details...

The Wikipedia data file was downloaded [here](https://dumps.wikimedia.org/other/pagecounts-raw/) (_"Page view statistics for Wikimedia projects"_).

It was then loaded into a Linux Ubuntu virtual machine and the 5.9M lines were searched with this code...

	grep '^en ' pagecounts-20150101-000000 |
	sort -rnk3,3 |
	head -15

- This checked each line in the file to see if it started with "en "; these were the entries related to the main english language Wikipedia pages.
- The next line sorted the entries on the 3<sup>rd</sup> column; the number of pagecounts.
- The top 15 items were then returned.

en Main_Page 261436
en Special:HideBanners 80588
en Special:Search 13173