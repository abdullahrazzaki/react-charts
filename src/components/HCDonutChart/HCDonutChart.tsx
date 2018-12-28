import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { assocPath } from "ramda";
import { HCDonutChartData } from "./types";
type Props = {
  data: HCDonutChartData;
  title: string;
};

const defaultOptions = {
  colors: ["#061826", "#0D5752", "#D8991C", "#C14A2D", "#8C5F51"],
  title: {
    text: "Mail<br>by categories<br>",
    align: "center",
    verticalAlign: "middle"
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        distance: 50,
        style: {
          fontWeight: "bold",
          color: "black"
        },
        format: "{point.name} - {percentage:.2f} %"
      },
      startAngle: 0,
      endAngle: 360,
      center: ["50%", "50%"],
      size: "110%"
    }
  },
  series: [
    {
      type: "pie",

      name: "Mail share",
      innerSize: "70%",
      data: []
    }
  ]
};

class HCDonutChart extends Component<Props> {
  static defaultProps = {
    title: "Mail by categories"
  };
  render() {
    const { data, title } = this.props;
    const values = data.map(value => {
      return { name: value.label, y: value.count };
    });
    const options = assocPath(
      ["title", "text"],
      title,
      assocPath(["series", 0, "data"], values, defaultOptions)
    );

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}

export default HCDonutChart;
