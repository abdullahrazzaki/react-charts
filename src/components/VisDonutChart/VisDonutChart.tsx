import React, { Component } from "react";
import { RadialChart, Hint } from "react-vis";
import { reduce } from "ramda";
import { VisDonutChartData } from "./types";
import "./style.css";
type Props = {
  data: VisDonutChartData;
  title?: string;
};
type State = {
  hoveredValue: boolean | any;
};
function buildValue(hoveredCell: any): any {
  const { radius, angle, angle0 } = hoveredCell;
  const truedAngle = (angle + angle0) / 2;
  return (
    hoveredCell && {
      x: radius * Math.cos(truedAngle),
      y: radius * Math.sin(truedAngle)
    }
  );
}
class VisDonutChart extends Component<Props, State> {
  static defaultProps = {
    title: "Mail by categories"
  };
  constructor(props: Props) {
    super(props);
    this.state = { hoveredValue: false };
  }
  sumCount(sum: number, obj: any) {
    return sum + obj.count;
  }
  getPercentage(total: number, count: number) {
    return (count / total) * 100;
  }
  render() {
    const { data, title } = this.props;
    const { hoveredValue } = this.state;

    const total = reduce(this.sumCount, 0, data);
    const getPercent = (x: number) => this.getPercentage(total, x);
    const values = data.map(value => {
      const percentage = Number(getPercent(value.count)).toFixed(2);
      return {
        label: value.label + " - " + percentage + "%",
        angle: value.count,
        className: "donut-slice"
      };
    });
    return (
      <div style={{ position: "relative" }}>
        <RadialChart
          className={"donut-chart"}
          onValueMouseOver={(v: any, event: any) => {
            console.log("in", v, event);
            this.setState({ hoveredValue: v });
          }}
          onSeriesMouseOut={(v: any) => {
            console.log("out", v);
            this.setState({ hoveredValue: false });
          }}
          colorRange={["#061826", "#0D5752", "#D8991C", "#C14A2D", "#8C5F51"]}
          padAngle={0.02}
          labelsRadiusMultiplier={1.15}
          showLabels={true}
          data={values}
          innerRadius={140}
          radius={200}
          width={450}
          height={450}
        >
          <div className={"inner"}>
            <h3>{title}</h3>
          </div>

          {hoveredValue && (
            <Hint value={buildValue(hoveredValue)}>
              <div className={"donut-tooltip"}>{hoveredValue.label}</div>
            </Hint>
          )}
        </RadialChart>
      </div>
    );
  }
}

export default VisDonutChart;
