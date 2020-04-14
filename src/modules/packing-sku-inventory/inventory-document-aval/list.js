import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  context = ["Update"];
  columns = [{
      field: "Date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment.utc(value).local().format('DD MMMM YYYY');
      }
    },
    {
      field: "BonNo",
      title: "No. Bon"
    },
    {
      field: "Shift",
      title: "Shift"
    },
    {
      field: "CartNo",
      title: "No. Kereta"
    },
    {
      field: "UnitCode",
      title: "Unit"
    },
    {
      field: "Area",
      title: "Area"
    },
    {
      field: "ProductionOrderType",
      title: "Jenis"
    },
    {
      field: "UOMUnit",
      title: "Satuan"
    },
    {
      field: "ProductionOrderQuantity",
      title: "Qty Satuan"
    },
    {
      field: "ProductionOrderKg",
      title: "Qty KG"
    }
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    // return this.service.search(arg).then(result => {
      //   if (result.data.length > 0) {
      //     return {
      //       total: result.data.length,
      //       data: result.data
      //     }
      //   } else {
      //     return {
      //       total: 0,
      //       data: {}
      //     }
      //   }

      return {
        data: [{
          Id: 1,
          Date: "2020-04-05 17:00:00.0000000 +00:00",
          BonNo: "IM.20.0009",
          Shift: "PAGI",
          CartNo: "12",
          UnitCode: "F1",
          Area: "IM",
          ProductionOrderType: "SOLID",
          UOMUnit: "YDS",
          ProductionOrderQuantity: "3,13",
          ProductionOrderKg: "1"
        }]
      }
    // });
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Update":
        this.router.navigateToRoute("view", {
          Id: data.Id
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
