document.addEventListener('DOMContentLoaded', () =>{
  let drawing = false;
  let points = [];
  let lines = [];
  let svg = null;

  function render() {
    svg = d3.select('#canvas')
                .attr('height', window.innerHeight)
                .attr('width', window.innerWidth);

    svg.on('mouseup', () =>{
      drawing = false;
    });

    svg.on('mousedown', function (){
      drawing = true;
      const coord = d3.mouse(this);
      draw(coord[0], coord[1], false)
    });

    svg.on('mousemove', function (){
      if (!drawing){
        return;
      }
      const coord = d3.mouse(this);
      draw(coord[0], coord[1], true);
    });
  };

  document.querySelector('#erase').onclick = () =>{
    for (var i = 0; i < points.length; i++) {
     points[i].remove();
    }
    for (var i = 0; i < lines.length; i++) {
     lines[i].remove();
    }
    points = [];
    lines = [];
  };

  function draw(x, y, connect){
    const color = document.querySelector('#color').value;
    const thickness = parseInt(document.querySelector('#thickness').value);

    if(connect){
      const last = points[points.length - 1];

      const line = svg.append('line')
                      .attr('x1', last.attr('cx'))
                      .attr('y1', last.attr('cy'))
                      .attr('x2', x)
                      .attr('y2', y)
                      .attr('stroke-width', thickness*2)
                      .attr('stroke', color);

      lines.push(line);
    }
    const point = svg.append('circle')
                      .attr('cx', x)
                      .attr('cy', y)
                      .attr('r', thickness)
                      .style('fill', color);
    points.push(point);
  };
  render();
});
