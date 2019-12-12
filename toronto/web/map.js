

function choro_prop_style_switch(current_measure_in,current_year_in) {
  // styling the choropleths
  if (current_measure_in == "all_pop") {
    var_name_d = 'prop_pop_' + current_year_in.toString()
    map.setPaintProperty('CT-fill-P', 'fill-color', 'white')
  }
  else if (current_measure_in == "lico_cats") {
      var_name_d = 'prop_inc_' + current_year_in.toString()
      style_info = [
        "case",
        [
          "<",
          ["get", var_name_d],
          0.1
        ],
        "#fef0d9",
        [
          "<",
          ["get", var_name_d],
          0.2
        ],
        "hsl(34, 97%, 77%)",
        [
          "<",
          ["get", var_name_d],
          0.3
        ],
        "hsl(19, 96%, 67%)",
        [
          "<",
          ["get", var_name_d],
          0.4
        ],
        "#e34a33",
        "#b30000"
      ]
      map.setPaintProperty('CT-fill-P', 'fill-color', style_info)
    }
    else if (current_measure_in == "house30_cats") {
        var_name_d = 'prop_hou30_' + current_year_in.toString()
        style_info = [
          "case",
          [
            "<",
            ["get", var_name_d],
            0.2
          ],
          "#fef0d9",
          [
            "<",
            ["get", var_name_d],
            0.3
          ],
          "hsl(34, 97%, 77%)",
          [
            "<",
            ["get", var_name_d],
            0.4
          ],
          "hsl(19, 96%, 67%)",
          [
            "<",
            ["get", var_name_d],
            0.5
          ],
          "#e34a33",
          "#b30000"
        ]
        map.setPaintProperty('CT-fill-P', 'fill-color', style_info)
      }
    else {
      var_name_d = 'prop_nocar_' + current_year_in.toString()
      style_info = [
        "case",
        [
          "<",
          ["get", var_name_d],
          0.1
        ],
        "#fef0d9",
        [
          "<",
          ["get", var_name_d],
          0.2
        ],
        "hsl(34, 97%, 77%)",
        [
          "<",
          ["get", var_name_d],
          0.3
        ],
        "hsl(19, 96%, 67%)",
        [
          "<",
          ["get", var_name_d],
          0.4
        ],
        "#e34a33",
        "#b30000"
      ]
      map.setPaintProperty('CT-fill-P', 'fill-color', style_info)
    }
}

function choro_density_style_switch(current_measure_in,current_year_in) {
  // styling the choropleths
  if (current_measure_in == "all_pop") {
    var_name_d = 'dens_pop_' + current_year_in.toString()
    style_info = [
      "case",
      [
        "<",
        ["get", var_name_d],
        200
      ],
      "#fef0d9",
      [
        "<",
        ["get", var_name_d],
        2000
      ],
      "hsl(34, 97%, 77%)",
      [
        "<",
        ["get", var_name_d],
        4000
      ],
      "hsl(19, 96%, 67%)",
      [
        "<",
        ["get", var_name_d],
        6000
      ],
      "#e34a33",
      "#b30000"
    ]
    map.setPaintProperty('CT-fill-D', 'fill-color', style_info)
  }
  else if (current_measure_in == "lico_cats") {
      var_name_d = 'dens_inc_' + current_year_in.toString()
      style_info = [
        "case",
        [
          "<",
          ["get", var_name_d],
          100
        ],
        "#fef0d9",
        [
          "<",
          ["get", var_name_d],
          500
        ],
        "hsl(34, 97%, 77%)",
        [
          "<",
          ["get", var_name_d],
          1000
        ],
        "hsl(19, 96%, 67%)",
        [
          "<",
          ["get", var_name_d],
          2000
        ],
        "#e34a33",
        "#b30000"
      ]
      map.setPaintProperty('CT-fill-D', 'fill-color', style_info)
    }
    else if (current_measure_in == "house30_cats") {
        var_name_d = 'dens_hou30_' + current_year_in.toString()
        style_info = [
          "case",
          [
            "<",
            ["get", var_name_d],
            200
          ],
          "#fef0d9",
          [
            "<",
            ["get", var_name_d],
            1000
          ],
          "hsl(34, 97%, 77%)",
          [
            "<",
            ["get", var_name_d],
            2000
          ],
          "hsl(19, 96%, 67%)",
          [
            "<",
            ["get", var_name_d],
            4000
          ],
          "#e34a33",
          "#b30000"
        ]
        map.setPaintProperty('CT-fill-D', 'fill-color', style_info)
      }
    else {
      var_name_d = 'dens_nocar_' + current_year_in.toString()
      style_info = [
        "case",
        [
          "<",
          ["get", var_name_d],
          100
        ],
        "#fef0d9",
        [
          "<",
          ["get", var_name_d],
          500
        ],
        "hsl(34, 97%, 77%)",
        [
          "<",
          ["get", var_name_d],
          1000
        ],
        "hsl(19, 96%, 67%)",
        [
          "<",
          ["get", var_name_d],
          2000
        ],
        "#e34a33",
        "#b30000"
      ]
      map.setPaintProperty('CT-fill-D', 'fill-color', style_info)
    }
}

function choro_legend_placer(current_measure_in,current_map_in) {
  var choro_leg = ""
  if (current_map_in == "M_dot") {
    choro_leg = ""
  }
  else if (current_map_in == "M_choro_d")  {

      if (current_measure_in == "lico_cats") {
        choro_leg = "<div id='legend_choro_side'><p>Density of population in low income households (ppl / km2)</p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: #b30000;'></div>            <div id='legend_value_5'><p>2,000 +</p></div>            <div id='legend_box'style='background-color: #e34a33;'></div>            <div id='legend_value_4'><p>1,000 - 2,000</p></div>            <div id='legend_box'style='background-color: #FC8D5A;'></div>            <div id='legend_value_3'><p>500 - 1,000</p></div>            <div id='legend_box'style='background-color: #FDCC8B;'></div>            <div id='legend_value_2'><p>100 - 500</p></div>            <div id='legend_box'style='background-color: #fef0d9;'></div>            <div id='legend_value_1'><p>0 - 100</p></div>        </div>"
      } else if (current_measure_in == "house30_cats") {
        choro_leg = "<div id='legend_choro_side'><p>Density of population in households spending 30% or more on housing (ppl / km2)</p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: #b30000;'></div>            <div id='legend_value_5'><p>4,000 +</p></div>            <div id='legend_box'style='background-color: #e34a33;'></div>            <div id='legend_value_4'><p>2,000 - 4,000</p></div>            <div id='legend_box'style='background-color: #FC8D5A;'></div>            <div id='legend_value_3'><p>1,000 - 2,000</p></div>            <div id='legend_box'style='background-color: #FDCC8B;'></div>            <div id='legend_value_2'><p>200 - 1,00</p></div>            <div id='legend_box'style='background-color: #fef0d9;'></div>            <div id='legend_value_1'><p>0 - 200</p></div>        </div>"
      } else if (current_measure_in == "car_cats") {
        choro_leg = "<div id='legend_choro_side'><p>Density of population in households without a car (ppl / km2)</p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: #b30000;'></div>            <div id='legend_value_5'><p>2,000 +</p></div>            <div id='legend_box'style='background-color: #e34a33;'></div>            <div id='legend_value_4'><p>1,000 - 2,000</p></div>            <div id='legend_box'style='background-color: #FC8D5A;'></div>            <div id='legend_value_3'><p>500 - 1,000</p></div>            <div id='legend_box'style='background-color: #FDCC8B;'></div>            <div id='legend_value_2'><p>100 - 500</p></div>            <div id='legend_box'style='background-color: #fef0d9;'></div>            <div id='legend_value_1'><p>0 - 100</p></div>        </div>"
      } else  {
        choro_leg = "<div id='legend_choro_side'><p>Overall population density (ppl / km2)</p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: #b30000;'></div>            <div id='legend_value_5'><p>6,000 +</p></div>            <div id='legend_box'style='background-color: #e34a33;'></div>            <div id='legend_value_4'><p>4,000 - 6,000</p></div>            <div id='legend_box'style='background-color: #FC8D5A;'></div>            <div id='legend_value_3'><p>2,000 - 4,000</p></div>            <div id='legend_box'style='background-color: #FDCC8B;'></div>            <div id='legend_value_2'><p>200 - 2,000</p></div>            <div id='legend_box'style='background-color: #fef0d9;'></div>            <div id='legend_value_1'><p>0 - 200</p></div>        </div>"
      }

  }
  else {
    if (current_measure_in == "lico_cats") {
      choro_leg = "<div id='legend_choro_side'><p>Percent of population in low income households </p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: #b30000;'></div>            <div id='legend_value_5'><p>40% +</p></div>            <div id='legend_box'style='background-color: #e34a33;'></div>            <div id='legend_value_4'><p>30% - 40%</p></div>            <div id='legend_box'style='background-color: #FC8D5A;'></div>            <div id='legend_value_3'><p>20% - 30%</p></div>            <div id='legend_box'style='background-color: #FDCC8B;'></div>            <div id='legend_value_2'><p>10% - 20%</p></div>            <div id='legend_box'style='background-color: #fef0d9;'></div>            <div id='legend_value_1'><p>0% - 10%</p></div>        </div>"
    } else if (current_measure_in == "house30_cats") {
      choro_leg = "<div id='legend_choro_side'><p>Percent of population in households spending 30% or more on housing </p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: #b30000;'></div>            <div id='legend_value_5'><p>50% +</p></div>            <div id='legend_box'style='background-color: #e34a33;'></div>            <div id='legend_value_4'><p>40% - 50%</p></div>            <div id='legend_box'style='background-color: #FC8D5A;'></div>            <div id='legend_value_3'><p>30% - 40%</p></div>            <div id='legend_box'style='background-color: #FDCC8B;'></div>            <div id='legend_value_2'><p>20% - 30%</p></div>            <div id='legend_box'style='background-color: #fef0d9;'></div>            <div id='legend_value_1'><p>0% - 20%</p></div>        </div>"
    } else if (current_measure_in == "car_cats") {
      choro_leg = "<div id='legend_choro_side'><p>Percent of population in households without a car </p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: #b30000;'></div>            <div id='legend_value_5'><p>40% +</p></div>            <div id='legend_box'style='background-color: #e34a33;'></div>            <div id='legend_value_4'><p>30% - 40%</p></div>            <div id='legend_box'style='background-color: #FC8D5A;'></div>            <div id='legend_value_3'><p>20% - 30%</p></div>            <div id='legend_box'style='background-color: #FDCC8B;'></div>            <div id='legend_value_2'><p>10% - 20%</p></div>            <div id='legend_box'style='background-color: #fef0d9;'></div>            <div id='legend_value_1'><p>0% - 10%</p></div>        </div>"
    } else  {
      choro_leg = "<div id='legend_choro_side'><p> </p>      </div>        <div id='legend_choro_main'>            <div id='legend_box'style='background-color: white'></div>            <div id='legend_value_5'><p>____</p></div>            <div id='legend_box'style='background-color: white;'></div>            <div id='legend_value_4'><p>____</p></div>            <div id='legend_box'style='background-color: white;'></div>            <div id='legend_value_3'><p>____</p></div>            <div id='legend_box'style='background-color: white;'></div>            <div id='legend_value_2'><p>____</p></div>            <div id='legend_box'style='background-color: white;'></div>            <div id='legend_value_1'><p>____</p></div>        </div>"
    }
  }
  return choro_leg;
}

function plot_chart_pop(current_measure_in,current_year_in, data_in) {

document.getElementById('my_dataviz').innerHTML = ""


// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 20, left: 50},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


//Read the data
  var data = data_in

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain([1991,2016])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickValues([1991,1996,2001,2006,2011,2016]).ticks(6,"")).selectAll("text")
        .style("text-anchor", "center")
        .attr("transform", "rotate(0)" );


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max([2000,d3.max(data, function(d) { return d.pop; })])])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5));


  svg.append("line")
   .attr("y1", 0)
   .attr("y2", 4000)
   .attr("x1", 2000)
   .attr("x2", 2000)
   .attr( "stroke", "black" ).attr( "stroke-width", "1" );


  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.year  ) })
      .y(function(d) { return y(d.pop) })
      )


  if (current_measure_in == "lico_cats") {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#fa4700")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year  ) })
        .y(function(d) { return y(d.inc) })
        )

    document.getElementById('plot_legend').innerText = "People in low-income households"

  }

  else if (current_measure_in == "car_cats") {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#fa4700")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year  ) })
        .y(function(d) { return y(d.car) })
        )

    document.getElementById('plot_legend').innerText = "People in households without a car"

  }

  else if (current_measure_in == "house30_cats") {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#fa4700")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year  ) })
        .y(function(d) { return y(d.hou30) })
        )

    document.getElementById('plot_legend').innerText = "People in households spending 30% or more of their income on housing"

  } else {
    document.getElementById('plot_legend').innerText = ""
  }

}

function plot_chart_pop_csd(current_measure_in,current_year_in,csd_name_in) {

document.getElementById('my_dataviz').innerHTML = ""


// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 20, left: 70},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


//Read the data


  d3.csv("https://raw.githubusercontent.com/jamaps/D4M/gh-pages/toronto/web/csd_tor_with_data.csv", function(data){
    //code dealing with data here


    // filter data by the CSD NAME that we have selected
  data = data.filter(function(d) { return d.CSDNAME == csd_name_in })

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain([1991,2016])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickValues([1991,1996,2001,2006,2011,2016]).ticks(6,"")).selectAll("text")
        .style("text-anchor", "center")
        .attr("transform", "rotate(0)" );


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max([200000,d3.max(data, function(d) { return d.pop; })])])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5));


  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.year  ) })
      .y(function(d) { return y(d.pop) })
    )


  if (current_measure_in == "lico_cats") {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#fa4700")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year  ) })
        .y(function(d) { return y(d.inc) })
        )

    document.getElementById('plot_legend').innerText = "People in low-income households"

  }

  else if (current_measure_in == "car_cats") {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#fa4700")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year  ) })
        .y(function(d) { return y(d.car) })
        )

    document.getElementById('plot_legend').innerText = "People in households without a car"

  }

  else if (current_measure_in == "house30_cats") {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#fa4700")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year  ) })
        .y(function(d) { return y(d.hou30) })
        )

    document.getElementById('plot_legend').innerText = "People in households spending 30% or more of their income on housing"

  } else {
    document.getElementById('plot_legend').innerText = ""
  }

  });

}





// initial map view
var current_measure = 'lico_cats'
var current_map = 'M_dot'
var current_year = 2006

var selected_zone_name = "Toronto"
selection_type = "selection_CSD"

var all_measure_ids = ['lico_cats','house30_cats','car_cats','all_pop']
var all_measure_ids_yes = ['LICO_yes','house30_yes','car_no','NULL']
var all_measure_dot_texts = ['in a low-income household','in a household which spends 30% or more of their income on housing','in a household without a car','']

var choro_colours_red = ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000']

var all_maptypes = ['M_dot','M_choro_d','M_choro_p']

var all_years = [1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016]


// initial plot

plot_chart_pop_csd("lico_cats",2006,"Toronto")





// setting up the map :)
mapboxgl.accessToken = 'pk.eyJ1IjoiamVmZmFsbGVuIiwiYSI6ImNrM2dlbGpzODAxMjUzbW1zODJjNG5jZDgifQ.G57Vfj8TPGgQkOXsPz2deA';
var map = new mapboxgl.Map({
    container: 'map', // div id
    style: 'mapbox://styles/jeffallen/ck2ey404j2si51coj2cnpv1z5',
    zoom: 10.1, // starting zoom
    bearing: -17,
    maxZoom: 13.1, // max zoom
    minZoom: 10.1,
    pitchWithRotate: false,
    attributionControl: true,
    maxBounds: [
        [-80.4159,42.7833], // Southwest
        [-78.3699,44.5121]  // Northeast
    ],
    center: [-79.43955,43.74359], // starting location
});
// making zoom in / out less responsive
map.scrollZoom.setWheelZoomRate(0.5);



// Add controls ( zoom and rotation ) to the map.
map.addControl(new mapboxgl.NavigationControl());
bar = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
  });
map.addControl(bar);


// // add draw controls
// var draw = new MapboxDraw({
// displayControlsDefault: false,
// controls: {
// polygon: true,
// trash: true
// }
// });
// map.addControl(draw);




















// filtering the data by year - via the time slider
document.getElementById('slider').addEventListener('input', function(e) {
  current_year = parseInt(e.target.value);
  console.log(current_year)

  map.setFilter('dots-50-v1',
  [
"all",
[
  "<",
  ["get", "time_begin"],
  current_year
],
[
  ">",
  ["get", "time_end"],
  current_year
]
]);
  // update text in the UI
  document.getElementById('active-date').innerText = current_year;

  choro_density_style_switch(current_measure,current_year);
  choro_prop_style_switch(current_measure,current_year);
});








// displaying persons per dot for each zoom level
map.on('zoom', function (e) {
    zoom = map.getZoom()
    if (Math.round(zoom) == 10) {
        document.getElementById('ppl_per_dot').innerText = 200
    }
    if (Math.round(zoom) == 11) {
        document.getElementById('ppl_per_dot').innerText = 150
    }
    if (Math.round(zoom) == 12) {
        document.getElementById('ppl_per_dot').innerText = 100
    }
    if (Math.round(zoom) == 13) {
        document.getElementById('ppl_per_dot').innerText = 50
    }
    // map.setZoom(Math.round(zoom) + 0.1);
});






// switching between types of maps
function map_switch(map_type_name) {
  console.log(map_type_name)
  current_map = map_type_name


  // set color of button
  for (var qq = 0; qq < all_maptypes.length; qq++) {
    if (map_type_name == all_maptypes[qq]) {
      // changing opacity of buttons
      document.getElementById(all_maptypes[qq]).style.opacity = '1.0';
      document.getElementById(all_maptypes[qq]).style.color = '#fa4700';
      document.getElementById(all_maptypes[qq]).style.fontWeight = 'bold';
      qq_id = qq

      }

    else {
      document.getElementById(all_maptypes[qq]).style.opacity = '1.0';
      document.getElementById(all_maptypes[qq]).style.color = 'black';
      document.getElementById(all_maptypes[qq]).style.fontWeight = 'normal';
      }

    }

  if (current_map == "M_dot") {
    map.setPaintProperty('dots-50-v1', 'circle-opacity', 1);
    map.setPaintProperty('CT-fill-D', 'fill-opacity', 0);
    map.setPaintProperty('CT-fill-P', 'fill-opacity', 0);


    document.getElementById('legend_dots').style.display = 'inline';
    document.getElementById('legend_dots').style.opacity = 1;
    document.getElementById('legend_dots').innerHTML = '<div id="legend_dots_text"><p>One <b><label id="dot_colour" style="color: #fa4700">dot</label></b> pertains to approximately <b><label id="ppl_per_dot">200</label></b> people <label id="dot_var">in a low-income household</label></p> </div>'
    document.getElementById('legend_dots').style.height = "110px";

    document.getElementById('legend_choro').style.display = 'none';

    // document.getElementById('legend_choro').style.opacity = 0;
    // document.getElementById('legend_choro').innerHTML = "";
    // document.getElementById('legend_choro').style.height = 0;

  }
  else if (current_map == "M_choro_d") {
    map.setPaintProperty('dots-50-v1', 'circle-opacity', 0);
    map.setPaintProperty('CT-fill-D', 'fill-opacity', 0.73);
    map.setPaintProperty('CT-fill-P', 'fill-opacity', 0);

    // document.getElementById('legend_dots').style.opacity = 0;
    // document.getElementById('legend_dots').innerHTML = ""
    // document.getElementById('legend_dots').style.height = 0;

    document.getElementById('legend_dots').style.display = 'none';

    document.getElementById('legend_choro').style.display = 'inline';
    document.getElementById('legend_choro').style.opacity = 1;
    document.getElementById('legend_choro').innerHTML = choro_legend_placer(current_measure,current_map);
    document.getElementById('legend_choro').style.height = "110px";

  }
  else {
    map.setPaintProperty('dots-50-v1', 'circle-opacity', 0);
    map.setPaintProperty('CT-fill-D', 'fill-opacity', 0);
    map.setPaintProperty('CT-fill-P', 'fill-opacity', 0.73);

    // document.getElementById('legend_dots').style.opacity = 0;
    // document.getElementById('legend_dots').innerHTML = ""
    // document.getElementById('legend_dots').style.height = 0;

    document.getElementById('legend_dots').style.display = 'none';

    document.getElementById('legend_choro').style.display = 'inline';
    document.getElementById('legend_choro').style.opacity = 1;
    document.getElementById('legend_choro').innerHTML = choro_legend_placer(current_measure,current_map);
    document.getElementById('legend_choro').style.height = "110px";

  }

  measure_switch(current_measure);

  // choro_legend_placer(current_measure,current_map);



}








// selecting different measures
function measure_switch(metric_name) {
  console.log(metric_name)
  current_measure = metric_name

  // set color of button
  for (var qq = 0; qq < all_measure_ids.length; qq++) {
    if (metric_name == all_measure_ids[qq]) {
      // changing opacity of buttons
      document.getElementById(all_measure_ids[qq]).style.opacity = '1.0';
      document.getElementById(all_measure_ids[qq]).style.color = '#fa4700';
      document.getElementById(all_measure_ids[qq]).style.fontWeight = 'bold';
      qq_id = qq

      document.getElementById('dot_var').innerText = all_measure_dot_texts[qq]

      }

    else {
      document.getElementById(all_measure_ids[qq]).style.opacity = '1.0';
      document.getElementById(all_measure_ids[qq]).style.color = 'black';
      document.getElementById(all_measure_ids[qq]).style.fontWeight = 'normal';
      }
  }


  // styling the dots
  if (current_measure == "all_pop") {

    map.setPaintProperty('dots-50-v1', 'circle-color', "black")
    map.setPaintProperty('dots-50-v1', 'circle-radius', 2)

    document.getElementById('dot_colour').style.color = 'black';

  }
  else {

      document.getElementById('dot_colour').style.color = '#fa4700';

      var_name = current_measure
      console.log(var_name)

      style_info = [
      "match",
      ["get", var_name],
      [all_measure_ids_yes[qq_id]],
      "#fa4700",
      "hsl(213, 100%, 71%)"
    ]

      map.setPaintProperty('dots-50-v1', 'circle-color', style_info)
      map.setPaintProperty('dots-50-v1', 'circle-radius', 2.25)

  }

  choro_density_style_switch(current_measure,current_year);
  choro_prop_style_switch(current_measure,current_year);

  document.getElementById('legend_choro').innerHTML = choro_legend_placer(current_measure,current_map);


  if (selection_type == "selection_CT") {
    plot_chart_pop(current_measure,current_year,d3_data);
  } else {
    plot_chart_pop_csd(current_measure,current_year,selected_zone_name)
  }

  // choro_legend_placer(current_measure,current_map);

  // change variable on the map
  // lists all the layers map.getStyle().layers
}


// // gets all data in the view window -might be useful for viz
// map.querySourceFeatures('composite', {
//   'sourceLayer': 'd4m-csd-9hyox0'
// });




// change selection type (CT CSD)


function selection_switch(selection) {
  console.log(selection)
  selection_type = selection

  document.getElementById(selection_type).style.color = '#fa4700';
  document.getElementById(selection_type).style.fontWeight = 'bold';

  if (selection_type == "selection_CSD") {
    document.getElementById("selection_CT").style.color = 'black';
    document.getElementById("selection_CT").style.fontWeight = 'normal';

    map.setPaintProperty('CT-border-selected', 'line-opacity', 0);
  }
  else {
    document.getElementById("selection_CSD").style.color = 'black';
    document.getElementById("selection_CSD").style.fontWeight = 'normal';

    map.setPaintProperty('d4m-csd-border-selected', 'line-opacity', 0);
  }


}












// hover orange over the selected metric
function textcolouron(id_name) {
  document.getElementById(id_name).style.color = '#fa4700';
}
function textcolouroff(id_name) {
  var mes_index = all_measure_ids.indexOf(id_name);
  if (all_measure_ids[mes_index] == current_measure) {
    document.getElementById(id_name).style.color = '#fa4700';
    document.getElementById(id_name).style.opacity = '1.0';
    // document.getElementById(all_measure_ids[qq]).style.fontWeight = 'bold';
  }
  else {
    document.getElementById(id_name).style.color = 'black';
    document.getElementById(id_name).style.opacity = '1.0';
    // document.getElementById(all_measure_ids[qq]).style.fontWeight = 'normal';
  }
}
function textcolouroff_m(id_name) {
  var mes_index = all_maptypes.indexOf(id_name);
  if (all_maptypes[mes_index] == current_map) {
    document.getElementById(id_name).style.color = '#fa4700';
    document.getElementById(id_name).style.opacity = '1.0';
  }
  else {
    document.getElementById(id_name).style.color = 'black';
    document.getElementById(id_name).style.opacity = '1.0';
  }
}

function textcolouroff_s(id_name) {
  if (selection_type != id_name) {
    document.getElementById(id_name).style.color = 'black';
  }
  // else {
  //   document.getElementById(selection_type).style.color = 'black';
  // }
}








//
//
//
//
// var temp
//
//
// // select dauid boundary when clicked in red
var prev_selected_ctuid = ""
var prev_selected_csduid = ""
var d3_data = []

map.on('click', function(e) {

    if (selection_type == "selection_CT") {


      map.setPaintProperty('d4m-csd-border-selected', 'line-opacity', 0);



      var features = map.queryRenderedFeatures(e.point, { layers: ['CT-fill-P'] });

      var feature = features[0];

      console.log(feature.properties.ctuid)

      selected_zone_name = feature.properties.ctuid



      if (feature.properties.ctuid != prev_selected_ctuid) {

        style_info = [
          "match",
          ["get", "ctuid"],
          [feature.properties.ctuid],
          1,
          0
        ]

        map.setPaintProperty('CT-border-selected', 'line-opacity', style_info)

        prev_selected_ctuid = feature.properties.ctuid

      }

      else {


        map.setPaintProperty('CT-border-selected', 'line-opacity', 0);

        prev_selected_ctuid = "";

      }



      document.getElementById('selection_bottom_text').style.opacity = 1;

      selected_zone = feature


      d3_data = []
      for (year in all_years) {
        year_in = (all_years[year]);
        year_string = year_in.toString();
        pop_name = "pop_" + year_string;
        inc_name = "pop_inc_" + year_string;
        hou30_name = "pop_hou30_" + year_string;
        car_name = "pop_nocar_" + year_string
        d3_data.push({
          year: year_in,
          pop: selected_zone.properties[pop_name],
          inc: selected_zone.properties[inc_name],
          hou30: selected_zone.properties[hou30_name],
          car: selected_zone.properties[car_name]
        })
      }


      plot_chart_pop(current_measure,current_year,d3_data);

    }

    else {

      map.setPaintProperty('CT-border-selected', 'line-opacity', 0);

      var features = map.queryRenderedFeatures(e.point, { layers: ['d4m-csd-9hyox0'] });

      var feature = features[0];

      console.log(feature.properties.CSDNAME)

      selected_zone_name = feature.properties.CSDNAME

      if (feature.properties.CSDNAME != prev_selected_csduid) {

        style_info = [
          "match",
          ["get", "CSDNAME"],
          [feature.properties.CSDNAME],
          1,
          0
        ]

        map.setPaintProperty('d4m-csd-border-selected', 'line-opacity', style_info)

        prev_selected_csduid = feature.properties.CSDNAME

        plot_chart_pop_csd(current_measure,current_year,feature.properties.CSDNAME)

      }

      else {


        map.setPaintProperty('d4m-csd-border-selected', 'line-opacity', 0);

        prev_selected_csduid = "";

      }


    }

  document.getElementById('selected_id').innerHTML = selected_zone_name

});
