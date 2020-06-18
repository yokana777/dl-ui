import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const PackingListLoader = require('../../../loader/garment-packing-list-loader');
const UnitLoader=require('../../../loader/unit-loader')

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedInvoiceNo;
    @bindable selectedUnit;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
    filter={
        IsUsed:true
    };
    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "Komoditi"},
        { header: "Description" },
        { header: "Quantity " },
        { header: "Satuan"},
        { header: "Jumlah Carton"},
        { header: "Gross Weight"},
        { header: "Nett Weight"},
        { header: "Volume"},
    ];

    get packingListLoader() {
        return PackingListLoader;
    }
    get unitLoader(){
        return UnitLoader;
    }
    
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        if(this.data.Id){
        }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }
    selectedInvoiceNoChanged(newValue){
        if(newValue){
            this.data.invoiceNo=newValue.invoiceNo;
            this.data.packingListId=newValue.id;
            this.data.buyerAgent=newValue.buyerAgent;
        }
    }
}
