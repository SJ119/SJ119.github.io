function isScrolledIntoView(element) {
    var elementTop = element.getBoundingClientRect().top,
        elementBottom = element.getBoundingClientRect().bottom;

    var ret = elementTop >= 0 && elementBottom <= window.innerHeight;
    return ret;
}

var graphContainer = d3.select('.graph')
    .append('div')
    .attr({
        class: 'col-xs-8 graph-column'
    });

graphContainer
    .append('h3')
    .attr('class', 'graph-title')
    .style('margin', '20px 0px -20px 0px')
    .text('Average Per Term');

graphContainer
    .style({
        width: '100%',
        height: (300 + parseInt(getComputedStyle(d3.select('.graph-title')[0][0]).height)) + 'px'
    });


var marginLeft = 30;
var marginTop = 30;
var graphColumn = d3.select('.graph .graph-column');
var innerWidth = parseInt(graphColumn.style('width')) - parseInt(graphColumn.style('margin-left')) - parseInt(graphColumn.style('margin-right')) - parseInt(graphColumn.style('padding-left')) - parseInt(graphColumn.style('padding-right'));

var graphSVG = graphContainer
    .append('svg')
    .attr({
        class: 'graph-svg',
        width: innerWidth,
        height: parseInt(graphContainer.style('height')) - parseInt(getComputedStyle(d3.select('.graph-title')[0][0]).height)
    })
    .append('g')
    .attr({
        class: 'graph-data',
        transform: 'translate(' + marginLeft + ',' + marginTop + ')'
    });

var yScale = d3.scale.linear()
    .domain([70, 90])
    .range([parseInt(d3.select('.graph-svg').attr('height')) - marginTop * 2, 0]);

var xScale = d3.scale.ordinal()
    .domain([1, 2, 3, 4])
    .rangeRoundPoints([0, parseInt(d3.select('.graph-svg').attr('width')) - marginLeft * 2], 1);

var graphBottom = d3.select('.graph-svg')
    .append('g')
    .attr({
        class: 'graph-axis-x',
        transform: 'translate(' + marginLeft + ',' + (yScale.range()[0] - yScale.range()[1] + marginTop) + ')'
    });

var graphLeft = d3.select('.graph-svg')
    .append('g')
    .attr({
        class: 'graph-axis-y',
        transform: 'translate(' + marginLeft + ',' + marginTop + ')'
    });

var grades = myGrades.map(function(d) {
    return d.courses.map(function(d) {
        return d.grade;
    });
});

grades.pop();


var xAxis = d3.svg.axis().scale(xScale);

var yAxis = d3.svg.axis().scale(yScale).orient('left');

graphBottom
    .call(xAxis);

graphLeft
    .call(yAxis);

var average = grades.map(function(d) {
    return d3.mean(d);
});



var rectWidth = 20;
var dataSet = d3.select('.graph-data')
    .selectAll('.average').data(average)
    .enter()
    .append('rect')
    .attr({
        class: 'bars',
        x: function(d, i) {
            return xScale(i + 1) - rectWidth / 2;
        },
        y: yScale(70),
        width: rectWidth,
        height: 0,
        stroke: 'grey',
        fill: 'teal',
        'stroke-width': 1
    });

var dataEncountered = false;

$(window).scroll(function() {
    if (isScrolledIntoView(d3.select('.graph-svg')[0][0]) && !dataEncountered) {
        dataEncountered = true;
        d3.selectAll('.bars')
            .transition()
            .duration(2000)
            .attr('y', function(d) {
                return yScale(d);
            })
            .attr('height', function(d) {
                return (yScale(70) - yScale(d));
            });
    }
});


$(window).resize(function() {
    innerWidth = parseInt(graphColumn.style('width')) - parseInt(graphColumn.style('margin-left')) - parseInt(graphColumn.style('margin-right')) - parseInt(graphColumn.style('padding-left')) - parseInt(graphColumn.style('padding-right'));

    d3.select('.graph-svg')
        .attr({
            width: innerWidth
        });

    xScale
        .rangeRoundPoints([0, parseInt(d3.select('.graph-svg').attr('width')) - marginLeft * 2], 1);

    xAxis.scale(xScale);

    graphBottom
        .call(xAxis);

    dataSet.attr('x', function(d, i) {
        return xScale(i + 1) - rectWidth / 2;
    });
})