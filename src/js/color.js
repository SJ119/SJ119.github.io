$('document').ready(function() {

    jQuery(window).resize(function() {
        var width = jQuery(document).width();
        d3.select('canvas')
            .style('margin-left', function() {
                return -(parseInt(d3.select('canvas').attr('width')) / 2 | 0) + 'px';
            });
    });

    var canvas = d3.select('canvas')
        .attr({
            width: screen.width,
            height: screen.height
        })
        .style('margin-left', function() {
            return -(parseInt(d3.select('canvas').attr('width')) / 2 | 0) + 'px';
        }),
        context = canvas.node().getContext('2d'),
        width = canvas.property('width'),
        height = canvas.property('height');

		var worker = new Worker('js/rando-traversal.js');
		worker.postMessage({
			width: width,
			height: height
		});
		worker.addEventListener('message', function(event) {

			worker.terminate();

			var N = 1 << 0,
				S = 1 << 1,
				W = 1 << 2,
				E = 1 << 3;

			var maze = event.data,
				distance = 0,
				visited = new Array(width * height),
				frontier = [width / 2 | 0, width * (height - 1), width * height - 1],
				image = context.createImageData(width, height);

			function color() {
				var nextFrontier = [],
					index,
					length = frontier.length,
					nextIndex,
					//color = d3.hsl((distance += 0.5) % 40 + 90, 1, 0.3).rgb();
					color = d3.hsl((distance += 0.5) % 360, 1, 0.3).rgb();
				
				for (var i = 0; i < length; ++i) {
					index = frontier[i] << 2;
					image.data[index + 0] = color.r;
					image.data[index + 1] = color.g;
					image.data[index + 2] = color.b;
					image.data[index + 3] = 255;
				}

				for (var i = 0; i < length; ++i) {
					index = frontier[i];
					if (maze[index] & E && !visited[nextIndex = index + 1]) {
						visited[nextIndex] = true;
						nextFrontier.push(nextIndex);
					}
					if (maze[index] & W && !visited[nextIndex = index - 1]) {
						visited[nextIndex] = true;
						nextFrontier.push(nextIndex);
					}
					if (maze[index] & S && !visited[nextIndex = index + width]) {
						visited[nextIndex] = true;
						nextFrontier.push(nextIndex);
					}
					if (maze[index] & N && !visited[nextIndex = index - width]) {
						visited[nextIndex] = true;
						nextFrontier.push(nextIndex);
					}
				}

				frontier = nextFrontier;
				return !nextFrontier.length;
			}

			d3.timer(function() {
				for (var i = 0, done; i < 1 && !(done = color()); ++i) {
					context.putImageData(image, 0, 0);
				}
				return done;
			});

		});
});