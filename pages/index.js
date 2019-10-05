import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { data } from './data';
import G6 from '@antv/g6';
import dagre from 'dagre';
import { NodeTooltips, EdgeToolTips, NodeContextMenu } from './component'
import './registerShape';

export default function() {
  const ref = React.useRef(null)
  let graph = null

  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = useState(false)
  const [edgeTooltipX, setEdgeTooltipX] = useState(0)
  const [edgeTooltipY, setEdgeTooltipY] = useState(0)

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0)
  const bindEvents = () => {
    // 监听edge上面mouse事件
    graph.on('edge:mouseenter', evt => {
      const { item, target } = evt
      const type = target.get('type')
      if(type !== 'text') {
        return
      }
      const model = item.getModel()
      const { endPoint } = model
      // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10
      const y = endPoint.y - 35
      const x = endPoint.x - 150 - 10
      const point = graph.getCanvasByPoint(x, y)
      setEdgeTooltipX(point.x)
      setEdgeTooltipY(point.y)
      setShowEdgeTooltip(true)
    })

    graph.on('edge:mouseleave', () => {
      setShowEdgeTooltip(false)
    })

    // 监听node上面mouse事件
    graph.on('node:mouseenter', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)

      setNodeToolTipX(point.x - 75)
      setNodeToolTipY(point.y + 15)
      setShowNodeTooltip(true)
    })
  
    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave', () => {
      setShowNodeTooltip(false)
      setShowNodeContextMenu(false)
    })

    // 监听节点上面右键菜单事件
    graph.on('node:contextmenu', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      setNodeContextMenuX(point.x)
      setNodeContextMenuY(point.y)
      setShowNodeContextMenu(true)
    })
  }

  useEffect(() => {
    if(!graph) {
      // TODO 3.1.0版本发布后 layout 部分使用G6内置替代
      const g = new dagre.graphlib.Graph();
      g.setDefaultEdgeLabel(function() {
        return {};
      });
      g.setGraph({
        rankdir: 'LR'
      });

      data.nodes.forEach(function(node) {
        g.setNode(node.id + '', {
          width: 280,
          height: 100
        });
      });

      data.edges.forEach(function(edge) {
        edge.source = edge.source + '';
        edge.target = edge.target + '';
        g.setEdge(edge.source, edge.target);
      });
      dagre.layout(g);

      let coord = void 0;
      g.nodes().forEach(function(node, i) {
        coord = g.node(node);
        data.nodes[i].x = coord.x;
        data.nodes[i].y = coord.y;
      });
      g.edges().forEach(function(edge, i) {
        coord = g.edge(edge);
        const startPoint = coord.points[0];
        const endPoint = coord.points[coord.points.length - 1];
        data.edges[i].startPoint = startPoint;
        data.edges[i].endPoint = endPoint;
        data.edges[i].controlPoints = coord.points.slice(
          1,
          coord.points.length - 1
        );
      });

      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas']
        },
        defaultNode: {
          shape: 'node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          style: {
            stroke: '#72CC4A',
            width: 150
          }
        },
        defaultEdge: {
          shape: 'polyline'
        }
      })
    }
    graph.data(data)
    graph.render()

    const edges = graph.getEdges()
    edges.forEach(edge => {
      const line = edge.getKeyShape()
      const stroke = line.attr('stroke')
      const targetNode = edge.getTarget()
      targetNode.update({
        style: { stroke }
      })
    })
    graph.paint()

    bindEvents()
  }, [])

  return (
    <div ref={ref}>
      { showEdgeTooltip && <EdgeToolTips x={edgeTooltipX} y={edgeTooltipY} /> }
      { showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} /> }
      { showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY} /> }
    </div>
  );
}
