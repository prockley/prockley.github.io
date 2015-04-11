---
layout: post
title:  "Labour Force Participation"
date:   2015-03-07 13:12:00
summary:    Ireland's 2011 Census rates mapped by gender.
categories: D3
---

###Gender comparison using 2011 Census data (ages 25-54)

The purpose of this post was to get an idea of the geographic distribution of participation rates over the whole country. The data was restricted to the 25-54 age group to highlight the times when people are most likely to be working and rearing a family.  

__Labour force participation rate:__ _The labour force (those at work, looking for first regular job, and unemployed) as a percentage of the total population._

Here is the map - hover over for more information (_'hover-over' not currently perfected for some mobile browsers_)...

<iframe src="{{ site.baseurl }}{{ post.url }}/LFPR2011_d3choro.html" width="600" height="580" marginwidth="0" marginheight="0" scrolling="no" frameBorder="0"></iframe>

#####Overall Male v Female

The range of values were found to be:-

- Female: 70.7% (Limerick City) to 79.0% (Dublin City).
- Male: 84.4% (Limerick City) to 94.2% (Meath).

It is to be expected that women should have lower rates given their traditional role in rearing the family.

---

#####Each gender separately

_Female:_ It can be seen that participation rates for females are above average in many western counties. The cities of Dublin, Waterford and Galway also have high rates.

_Male:_ There is a much more distinct urban/rural divide here. All 5 main cities have rates at or below average, while all other areas are above.

---

#####Technical details...

...I'll come clean. One of the main reasons for this post was to get started with mapping in D3 (an open-source javascript library used to display information online). There was quite a bit to it; if you're interested click [here](https://github.com/prockley/LabourForceParticipation_D3Mapping).

Data Source: [Central Statistics Office](http://www.cso.ie)

Mapping: Contains Ordnance Survey Ireland data © [OSi](http://www.osi.ie) 2012

