if (fileName.toLowerCase().includes("member")) {
  //   google.charts.load("current", { packages: ["corechart"] });
  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.setOnLoadCallback(drawChartFollow);
  google.charts.setOnLoadCallback(drawChartCommodity);
  google.charts.setOnLoadCallback(drawStacked);
  function drawChartFollow() {
    var data = google.visualization.arrayToDataTable([
      ["年齡族群", "數量"],
      ["0~15歲", 20],
      ["16~23歲", 120],
      ["24~35歲", 90],
      ["36~45歲", 25],
      ["46~55歲", 10],
      ["55~65歲", 5],
      ["65以上", 3],
    ]);

    var options = {
      title: "追蹤族群",
      pieHole: 0.4,
      width: 400,
      height: 400,
      backgroundColor: "transparent",
      titleTextStyle: {
        color: "white",
        fontSize: 36,
        bold: true,
      },
      chartArea: {
        left: 20,
        // top: -10,
        width: "100%",
        height: "75%",
      },
      legend: {
        textStyle: {
          color: "white",
          fontSize: 16,
        },
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("follow-groups")
    );
    chart.draw(data, options);
  }
  function drawChartCommodity() {
    var data = google.visualization.arrayToDataTable([
      ["商品種類", "數量"],
      ["數位商品", 150],
      ["實體商品", 20],
      ["其他", 10],
    ]);

    var options = {
      title: "上架收益佔比",
      pieHole: 0.4,
      width: 400,
      height: 400,
      backgroundColor: "transparent",
      titleTextStyle: {
        color: "white",
        fontSize: 36,
        bold: true,
      },
      chartArea: {
        left: 20,
        // top: -10,
        width: "100%",
        height: "75%",
      },
      legend: {
        textStyle: {
          color: "white",
          fontSize: 16,
        },
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("commodity")
    );
    chart.draw(data, options);
  }
  function drawStacked() {
    var data = google.visualization.arrayToDataTable([
      ["月份", "NTD"],
      ["1月", 2000],
      ["2月", 3000],
      ["3月", 10000],
      ["4月", 3000],
      ["5月", 10000],
      ["6月", 12000],
      ["7月", 20000],
      ["8月", 5000],
      ["9月", 8000],
      ["10月", 9000],
      ["11月", 12000],
      ["12月", 21000],
    ]);

    var options = {
      title: "收益",
      chartArea: { width: "50%" },
      isStacked: true,
      width: 400,
      height: 400,
      backgroundColor: "transparent",
      legend: {
        textStyle: {
          color: "white",
          fontSize: 16,
        },
      },
      titleTextStyle: {
        color: "white",
        fontSize: 36,
        bold: true,
      },
      hAxis: {
        title: "總收益",
        minValue: 0,
        titleTextStyle: {
          color: "white",
          fontSize: 16,
          bold: true,
        },
      },
      vAxis: {
        title: "月份",
        titleTextStyle: {
          color: "white",
          fontSize: 16,
          bold: true,
        },
      },
    };
    var chart = new google.visualization.BarChart(
      document.getElementById("chart_price")
    );
    chart.draw(data, options);
  }
}
