import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Migrate {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    tables = ["", "Budget & POrder", "Budget1 & POrder1"];

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {

        this.service.migrate(this.data)
            .then(result => {
                alert("migration berhasil");
                this.router.navigateToRoute('migrate', {}, { replace: true, trigger: true });

            })
            .catch(e => {
                this.error = e;
            })

    }
}

