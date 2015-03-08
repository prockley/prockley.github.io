/*********************************************************
Based on tutorial found on the following page
http://www.cartographicperspectives.org/index.php/journal/article/view/1278/1359
**********************************************************/

//global variables
var keyArray = ["varA_F","varB_M"];
//variable names for display
var keyLongArray = [
	"Female",
	"Male"
	];
var expressed = keyArray[0];

//map colour palette
var colorPalette = [
			"#db9151",
			"#e8a363",
			"#f3b67a",
			"#facb96",
			"#fde1b8",
			"#f9f9df",
			"#e4d8e3",
			"#cdbae0",
			"#b7a1d8",
			"#a08bcb",
			"#8b79b9"			
		]

//begin script when window loads
window.onload = initialize();

//the first function called once the html is loaded
function initialize(){
	setMap();
};
//set choropleth map parameters
function setMap(){
	//map frame dimensions
	var width = 400;
	var height = 530;

/*	//title for page
	var title = d3.select("body")
		.append("h1")
		.text("2011 Rates for Labour Force Participation");
*/
	//create a new SVG element with the above dimensions
	var map = d3.select("body")
		.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "map");

	//draw the colour palette legend
	var colorPanelWidth = 20 // the width of each block of colour
	var xPosIni = 90 // leftmost edge of legend

	map.selectAll("rect")
    .data(colorPalette).enter()
    .append("rect")
    .attr("fill", function (color){ return color; })
    .attr("x", function (color, index){
    	return xPosIni + (index * colorPanelWidth) + "px";
    })
    .attr("y", height-35)
    .attr("width", colorPanelWidth + "px")
    .attr("height", 10 + "px");

	map.selectAll("text")
		.data(["below average", "above average"]).enter()
		.append("text")
		.text(function (label){ return label})
		.attr("x", function (label, index){
			return xPosIni + (index * 147) + "px" //adjust rightmost label location
		})
		.attr("y", height-10)
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px")
		.attr("fill", "grey");

	//Define map projection
	var projection = d3.geo.mercator()
		.scale([25000])
	  .center([-8.2, 53.25])
	  .translate([width / 2, height / 2]); //NEW
	
	//create svg path generator using the projection
	var path = d3.geo.path()
		.projection(projection);

	//use queue.js to parallelize asynchronous data loading
	queue()
		.defer(d3.csv, "assets/LFPR2011_Data.csv") //load csv data
		.defer(d3.json, "assets/ireland_mapping.topojson") //load geometry
		.await(callback); //trigger callback function once data loaded

	//retrieve and process data
	function callback(error, csvData, irelandData){
		var recolorMap = colorScale(csvData);

		//variables for csv to json data transfer
		//keyArray set as global variables		
		var jsonRegions = irelandData.objects.ie_counties_redAtt.geometries;		

		//loop through csv to assign each csv value to json region
		for (var i=0; i<csvData.length; i++) {		
			var csvRegion = csvData[i]; //the current region
			var csvAdm1 = csvRegion.adm1_code; //adm1 code
				
			//loop through json regions to find right region
			for (var a=0; a<jsonRegions.length; a++){
				//where adm1 codes match, attach csv to json object		
				if (jsonRegions[a].properties.GEOGID	== csvAdm1){
											
					// assign all five key/value pairs
					for (var key in keyArray){
						var attr = keyArray[key];			
						var val = parseFloat(csvRegion[attr]);	
						jsonRegions[a].properties[attr] = val;
					};
					
					jsonRegions[a].properties.name = csvRegion.name; //set prop
					break; //stop looking through the json regions
				};
			};
		};		

		//add regions to map as enumeration units colored by data
		var regions = map.selectAll(".regions")
			.data(topojson.feature(irelandData,
				irelandData.objects.ie_counties_redAtt).features)
			.enter() //create elements
			.append("g") //give each province its own g element
			.attr("class", "regions") //assign class for additional styling
			.append("path")
			.attr("class", function(d) { return d.properties.GEOGID })
			.attr("d", path) //project data as geometry in svg
			.style("fill", function(d) { //color enumeration units
				return choropleth(d, recolorMap);
			})
			.on("mouseover", highlight)
			.on("mouseout", dehighlight)		
			.on("mousemove", moveLabel)
			.append("desc") //append the current color
				.text(function(d) {
					return choropleth(d, recolorMap)
				});			 	

		//create dropdown menu
		createDropdown(csvData);
	};
};

// from SO; ref. 3751520
function makeArray(count, content) {
   var result = [];
   if(typeof(content) == "function") {
      for(var i=0; i<count; i++) {
         result.push(content(i));
      }
   } else {
      for(var i=0; i<count; i++) {
         result.push(content);
      }
   }
   return result;
};

function createDropdown(csvData){
	//add a select element for the dropdown menu
	var dropdown = d3.select("body")
		.append("div")
		.attr("class","dropdown") //for positioning menu with css
		.html("<h3>Gender:</h3>")
		.append("select")
		.on("change", function(){
			changeAttribute(this.value, csvData);
		});

	//create each option element within the dropdown
	var keyNum = makeArray(keyArray.length, function(i) { 
		return i++; });
	dropdown.selectAll("options")
		.data(keyNum)
		.enter()
		.append("option")
		.attr("value", function(d){ return keyArray[d] })
		.text(function(d) {
			d = keyLongArray[d];
			return d
		});
};

function colorScale(csvData){
	//create quantile classes with color scale
	var color = d3.scale.quantile() //designate quantile scale generator
		.range(colorPalette);



	//set min and max data values as domain
	color.domain([
		d3.min(csvData, function(d) { return Number(d[expressed]); }),
		d3.max(csvData, function(d) { return Number(d[expressed]); })
	]);

	return color;	 //return the color scale generator
};
	
function choropleth(d, recolorMap){
	//get data value
	var value = d.properties[expressed];
	//if value exists, assign it a color; otherwise assign gray
	if (value) {
		return recolorMap(value);
	} else {
		return "#ccc"; //default grey if no match
	};
};

function changeAttribute(attribute, csvData){
	//change the expressed attribute
	expressed = attribute;
	
	//recolor the map
	d3.selectAll(".regions") //select every region
		.select("path")
		.transition().duration(500).ease("linear")
		.style("fill", function(d) { //color enumeration units
			return choropleth(d, colorScale(csvData)); //->
		})
		.select("desc") //replace the color text in each desc element
			.text(function(d) {
				return choropleth(d, colorScale(csvData)); //->
			});
};

function highlight(data){
	
	var props = data.properties; //json properties
	
	d3.select("."+props.GEOGID) //select the current region in the DOM
		.transition().duration(150).ease("linear")
		.style("fill", "#000"); //set the enumeration unit fill to black

	var labelName = props.name; //html string for name (county)

	var labelAttribute = "<h3>"+
		parseFloat(props[expressed]).toFixed(1)+ //display to 1 decimal
		"%" + "</h3><br><b>"+
		labelName+"</b>"; //label content; value & variable
	
	//create info label div
	var infolabel = d3.select("body")
		.append("div")
		.attr("class", "infolabel") //for styling label
		.attr("id", props.GEOGID+"label") //for label div
		.html(labelAttribute); //add text
};

function dehighlight(data){

	//json or csv properties
	var props = data.properties; //json properties
	var region = d3.select("."+props.GEOGID); //select the current region
	var fillcolor = region.select("desc").text(); //access original color from desc
	region
	.transition().duration(300).ease("linear")
	.style("fill", fillcolor); //reset enumeration unit to orginal color
	
	d3.select("#"+props.GEOGID+"label").remove(); //remove info label
};

function moveLabel() {
	
	var x = d3.event.clientX+10; //horizontal label coordinate based mouse position stored in d3.event
	var y = d3.event.clientY-150; //vertical label coordinate
	d3.select(".infolabel") //select the label div for moving
		.style("margin-left", x+"px") //reposition label horizontal
		.style("margin-top", y+"px"); //reposition label vertical
};