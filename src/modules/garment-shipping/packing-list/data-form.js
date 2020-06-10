import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var SectionLoader = require('../../../loader/garment-sections-loader');
var BuyerLoader= require('../../../loader/garment-buyers-loader');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedSection;
    @bindable selectedBuyer;

    constructor(service) {
        this.service = service;
    }

    activeTab = 0;
    changeRole(tab) {
        this.activeTab = tab;
        if (tab != 2) {
            this.context.saveCallback=null;
            this.context.cancelCallback=null;
            this.context.deleteCallback=null;
            this.context.editCallback=null;
        }
        else{
            this.context.saveCallback=this.save;
            this.context.cancelCallback=this.cancel;
            this.context.deleteCallback=this.delete;
            this.context.editCallback=this.edit;
        }
    }

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
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
        { header: "RO No" },
        { header: "SC No" },
        { header: "Buyer Brand" },
        { header: "Komoditi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Price" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
        { header: "" },
    ]

    measureColumns = [
        { header: "No" },
        { header: "Length" },
        { header: "Width" },
        { header: "Height" },
        { header: "Qty Cartons" },
        { header: "CBM" },
    ]

    PackingTypeOptions=["EXPORT","RE EXPORT"];
    InvoiceTypeOptions=["DL", "SM"];
    
    countries =
    ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    get say(){
        var number= this.data.totalCartons;

        const first = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        const tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
        let word = '';

        for (let i = 0; i < mad.length; i++) {
            let tempNumber = number%(100*Math.pow(1000,i));
            if (Math.floor(tempNumber/Math.pow(1000,i)) !== 0) {
                if (Math.floor(tempNumber/Math.pow(1000,i)) < 20) {
                    word = first[Math.floor(tempNumber/Math.pow(1000,i))] + mad[i] + ' ' + word;
                } else {
                    word = tens[Math.floor(tempNumber/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(tempNumber/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
                }
            }

            tempNumber = number%(Math.pow(1000,i+1));
            if (Math.floor(tempNumber/(100*Math.pow(1000,i))) !== 0) 
                word = first[Math.floor(tempNumber/(100*Math.pow(1000,i)))] + 'hundred ' + word;
        }
            return word;

    }
    get sectionLoader() {
        return SectionLoader;
    }
    sectionView = (section) => {
        var sectionCode= section.Code || section.code;
        return `${sectionCode}`
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    buyerView = (buyer) => {
        var buyerName=buyer.Name || buyer.name;
        var buyerCode=buyer.Code || buyer.code;
        return `${buyerCode} - ${buyerName}`
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save= this.context.saveCallback;
        this.cancel=this.context.cancelCallback;
        this.delete=this.context.deleteCallback;
        this.edit=this.context.editCallback;
        this.Items=this.data.items;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true 
        }
        if(this.data){
            this.selectedBuyer=this.data.buyerAgent;
            this.selectedSection=this.data.section;
        }
        if(this.activeTab!=2){
            this.context.saveCallback=null;
            this.context.cancelCallback=null;
            this.context.deleteCallback=null;
            this.context.editCallback=null;
        }
        else{
            this.context.saveCallback=this.save;
            this.context.cancelCallback=this.cancel;
            this.context.deleteCallback=this.delete;
            this.context.editCallback=this.edit;
        }
        this.data.items=this.Items;
        if(this.data.items && this.data.id){
            for(var item of this.data.items){
                item.BuyerCode=this.data.buyerAgent.code;
                item.Section=this.data.section.code;
            }
        }
    }

    get addMeasurements() {
        return (event) => {
            this.data.measurements.push({});
            this.data.measurements.forEach((m, i) => m.MeasurementIndex = i);
        };
    }

    get removeMeasurements() {
        return (event) => {
            this.error = null;
            this.data.measurements.forEach((m, i) => m.MeasurementIndex = i);
            //this.Options.error = null;
     };
    }

    get addItems() {
        return (event) => {
            this.data.items.push({
                Section: this.data.section.Section || this.data.section.code,
                BuyerCode: this.data.buyerAgent.Code || this.data.buyerAgent.code
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
     };
    }

    selectedSectionChanged(newValue){
        if(newValue!=this.data.section && this.items)
            this.data.items.splice(0);
        this.data.section=null;
        if(newValue){
            this.data.section=newValue;
        }
    }

    selectedBuyerChanged(newValue){
        if(newValue!=this.data.buyerAgent && this.items)
            this.data.items.splice(0);
        this.data.buyerAgent=null;
        if(newValue){
            this.data.buyerAgent=newValue;
        }
    }

    get totalCBM(){
        var total=0;
        if(this.data.Measurements){
            for(var m of this.data.Measurements){
                if(m.length && m.width && m.height && m.cartonsQuantity){
                    total+= m.length*m.width*m.height*m.cartonsQuantity;
                }  
            }
        }
        return total;
    }
}
