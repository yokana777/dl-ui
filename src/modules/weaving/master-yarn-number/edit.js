import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service.getById(Id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    // this.error = {};
    // var index = 0;
    // var emptyFieldName = "Semua Field Harus Diisi";

    // if (
    //   this.data.code == null ||
    //   this.data.code == undefined ||
    //   this.data.code == ""
    // ) {
    //   this.error.code = "Kode Ring Tidak Boleh Kosong";
    //   index++;
    // }
    // if (
    //   this.data.number == null ||
    //   this.data.number == undefined ||
    //   this.data.number == ""
    // ) {
    //   this.error.number = "Ukuran Ring Tidak Boleh Kosong";
    //   index++;
    // }
    // if (index > 0) {
    //   window.alert(emptyFieldName);
    // } else {
      this.service
        .update(this.data)
        .then(result => {
          this.router.navigateToRoute("view", { Id: this.data.Id });
        })
        .catch(e => {
          this.error = e;
        });
    // }
  }
}
