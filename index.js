document.addEventListener('DOMContentLoaded', function onDocumentLoaded() {
	var drawing = false,
		points = [],
		lines = [],
		svg = null

	function render() {
		svg = d3
			.select('#canvas')
			.attr('height', window.innerHeight)
			.attr('width', window.innerWidth)
			.attr('border', 1)

		svg.on('mouseup', function mouseUp() {
			drawing = false
		})

		svg.on('mousedown', function mouseDown() {
			drawing = true
			var [x, y] = d3.mouse(this)
			draw(x, y, false)
		})

		svg.on('mousemove', function mouseMove() {
			if (drawing) {
				var [x, y] = d3.mouse(this)
				draw(x, y, true)
			}
			return
		})
	}

	document.querySelector('#erase').onclick = function onClick() {
		points.forEach(remove)
		lines.forEach(remove)
		points = []
		lines = []

		function remove(val) {
			val.remove()
		}
	}

	function draw(x, y, connect) {
		var color = document.querySelector('#color').value
		var thickness = Number(document.querySelector('#thickness').value)

		if (connect) {
			var last = points[points.length - 1]

			var line = svg
				.append('line')
				.attr('x1', last.attr('cx'))
				.attr('y1', last.attr('cy'))
				.attr('x2', x)
				.attr('y2', y)
				.attr('stroke-width', thickness * 2)
				.attr('stroke', color)

			lines.push(line)
		}
		var point = svg
			.append('circle')
			.attr('cx', x)
			.attr('cy', y)
			.attr('r', thickness)
			.style('fill', color)
		points.push(point)
	}
	render()
})
