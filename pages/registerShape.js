import G6 from '@antv/g6'
const colorMap = {
  'name1': '#72CC4A',
  'name2': '#1A91FF',
  'name3': '#FFAA15'
}

G6.registerNode('node', {
    drawShape: function drawShape(cfg, group) {
      const width = cfg.style.width;
      const stroke = cfg.style.stroke;
      const rect = group.addShape('rect', {
        attrs: {
          x: -width / 2,
          y: -15,
          width,
          height: 30,
          radius: 15,
          stroke,
          lineWidth: 0.6,
          fillOpacity: 1,
          fill: '#fff'
        }
      });
      const point1 = group.addShape('circle', {
        attrs: {
          x: -width / 2,
          y: 0,
          r: 3,
          fill: stroke
        }
      });
      const point2 = group.addShape('circle', {
        attrs: {
          x: width / 2,
          y: 0,
          r: 3,
          fill: stroke
        }
      });
      return rect;
    },
    getAnchorPoints: function getAnchorPoints() {
      return [[0, 0.5], [1, 0.5]];
    },
    update: function (cfg, item) {
      const group = item.getContainer()
      const children = group.get('children')
      const node = children[0]
      const circleLeft = children[1]
      const circleRight = children[2]

      const {style: {stroke}, labelStyle} = cfg

      if (stroke) {
        node.attr('stroke', stroke)
        circleLeft.attr('fill', stroke)
        circleRight.attr('fill', stroke)
      }
    }
  },
  'single-shape'
);

G6.registerEdge('polyline', {
  itemType: 'edge',
  draw: function draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const Ydiff = endPoint.y - startPoint.y;

    const slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

    const cpOffset = 16;
    const offset = Ydiff < 0 ? cpOffset : -cpOffset;

    const line1EndPoint = {
      x: startPoint.x + slope,
      y: endPoint.y + offset
    };
    const line2StartPoint = {
      x: line1EndPoint.x + cpOffset,
      y: endPoint.y
    };

    // 控制点坐标
    const controlPoint = {
      x:
      ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
      (line1EndPoint.y - startPoint.y) +
      startPoint.x,
      y: endPoint.y
    };

    let path = [
      ['M', startPoint.x, startPoint.y],
      ['L', line1EndPoint.x, line1EndPoint.y],
      [
        'Q',
        controlPoint.x,
        controlPoint.y,
        line2StartPoint.x,
        line2StartPoint.y
      ],
      ['L', endPoint.x, endPoint.y]
    ];

    if (Ydiff === 0) {
      path = [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x, endPoint.y]
      ];
    }

    const line = group.addShape('path', {
      attrs: {
        path,
        stroke: colorMap[cfg.data.type],
        lineWidth: 1.2,
        endArrow: false
      }
    });

    const labelLeftOffset = 8;
    const labelTopOffset = 8;
    // amount
    const amount = group.addShape('text', {
      attrs: {
        text: cfg.data.amount,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y - labelTopOffset - 2,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    });
    // type
    const type = group.addShape('text', {
      attrs: {
        text: cfg.data.type,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y - labelTopOffset - amount.getBBox().height - 2,
        fontSize: 10,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    });
    // date
    const date = group.addShape('text', {
      attrs: {
        text: cfg.data.date,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y + labelTopOffset + 4,
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    });
    return line;
  }
});