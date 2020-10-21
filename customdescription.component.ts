import { Component, OnInit, Input } from '@angular/core';
import { customdescriptionService } from './customdescription.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-customdescription',
  templateUrl: './customdescription.component.html',
  styleUrls: ['./customdescription.component.scss']
})
export class CustomdescriptionComponent implements OnInit {
  cols: any[];
  data: any[];
  loginFormpackagelist: FormGroup;
  loginFormpriceplanlist: FormGroup;
  loginFormservicelist: FormGroup;
  _selectedColumns: any[];
  dataedit = {}
  selectedCars3 = []
  selectedtable
  table = []
  displayDialogpackagelist
  displayDialogpriceplanlist
  displayDialogservicelist
  action: String
  idedit
  cus_typepeoptions = []
  filter
  loading: boolean;
  disable=true
  constructor(private custom: customdescriptionService,private formBuilder: FormBuilder) {
    this.table = [
      { label: 'Select Table', value: null },
      { label: 'TB_M_Package', value: { table: 'packagelist', edit: 'packagedit', filter: 'code' } },
      { label: 'TB_M_Price_Plan', value: { table: 'priceplanlist', edit: 'priceplanedit', filter: 'code' } },
      { label: 'TB_M_Service_Type_Mapping', value: { table: 'servicelist', edit: 'serviceedit', filter: 'service_type' } },
    ];
  }

  ngOnInit() {
    this.cus_typepeoptions = [{
      "label": "Postpaid",
      "value": "Postpaid"
    }, {
      "label": "Prepaid",
      "value": "Prepaid"
    }, {
      "label": "All",
      "value": "All"
    }]
    this.loginFormpackagelist = this.formBuilder.group({
      code: new FormControl({value: '', disabled: true}),
      tss_description_th: new FormControl({value: '', disabled: true}),
      tss_description_en: new FormControl({value: '', disabled: true}),
      module_name_th: new FormControl({value: ''}),
      module_name_en: new FormControl({value: ''}),
      custom_description_th: new FormControl({value: ''}),
      custom_description_en: new FormControl({value: ''}),
      validity: new FormControl({value: '', disabled: true}),
      package_type: new FormControl({value: '', disabled: true}),
      charge_type: new FormControl({value: '', disabled: true}),
      tss_display_type: new FormControl({value: '', disabled: true}),
      sort_id: new FormControl({value: '', disabled: true}),
      price: new FormControl({value: '', disabled: true}),
      company: new FormControl({value: '', disabled: true}),
      cus_type: new FormControl({value: '', disabled: true}),
    });
  this.loginFormpriceplanlist= this.formBuilder.group({
    code: new FormControl({value: '', disabled: true}),
    description_th: new FormControl({value: '', disabled: true}),
    description_en: new FormControl({value: '', disabled: true}),
    module_name_th: new FormControl({value: ''}),
    module_name_en: new FormControl({value: ''}),
    desc_th: new FormControl({value: ''}),
    desc_en: new FormControl({value: ''}),
    custom_description_th: new FormControl({value: '', disabled: true}),
    custom_description_en: new FormControl({value: '', disabled: true}),
    start_dt: new FormControl({value: '', disabled: true}),
    end_dt: new FormControl({value: '', disabled: true}),
    offer_type: new FormControl({value: '', disabled: true}),
    cost_type: new FormControl({value: '', disabled: true}),
    price: new FormControl({value: '', disabled: true}),
    company: new FormControl({value: '', disabled: true}),
    cus_type: new FormControl({value: '', disabled: true}),
  })
  this.loginFormservicelist= this.formBuilder.group({
    code: new FormControl({value: '', disabled: true}),
    service_type: new FormControl({value: '', disabled: true}),
    traffic_category: new FormControl({value: '', disabled: true}),
    desc_th: new FormControl({value: ''}),
    desc_en: new FormControl({value: ''}),
    custom_traffic_category_th: new FormControl({value: ''}),
    custom_traffic_category_en: new FormControl({value: ''}),
    cus_type: new FormControl({value: '', disabled: true}),
  })
  }
  @Input() get selectedColumns(): any[] {

    return this._selectedColumns;
  }

  changedata(data, table) {
    table.filters = []
    this.selectedCars3 =[]
    this.loading = true;
    if (table.filteredValue) {
      delete table.filteredValue
    }

    if (data.selectedtable == null) {
      this.cols = []
      this.data = []
      this._selectedColumns = this.cols
      return false
    }
    (<HTMLInputElement>document.getElementById("filter")).value = ''
    this.filter = data.selectedtable.filter
    this.custom.customdescriptionlist(data.selectedtable).then(res => {
      this.loading = false;
      this.cols = res.columnname
      this.data = res.data
      this._selectedColumns = this.cols
    })
  }

  onRowSelect(event,data) {
    this.dataedit = {}
    if(data.table == "packagelist"){
      this.idedit = event[0].code
      this.dataedit = this.clonedata(event[0]);
    this.loginFormpackagelist.setValue(this.dataedit)
    this.displayDialogpackagelist= true;
    }else if(data.table =="priceplanlist"){
    this.idedit = event[0].code
    const start_dt=new Date(event[0].start_dt);
    const end_dt=new Date(event[0].end_dt);
    event[0].start_dt=start_dt
    event[0].end_dt=end_dt
    this.dataedit = this.clonedata(event[0]);
    this.loginFormpriceplanlist.setValue(this.dataedit)
    this.displayDialogpriceplanlist= true;
    }else if(data.table =="servicelist"){
    this.idedit = event[0].code
    delete event[0].id
    this.dataedit = this.clonedata(event[0]);
    this.loginFormservicelist.setValue(this.dataedit)
    this.displayDialogservicelist= true;
    }
  }

  clonedata(data) {
    let dataclone = {};
    for (let prop in data) {
      dataclone[prop] = data[prop];
    }
    return dataclone;
  }

  onSubmit(data) {
    let datajson
    if(data.table == "packagelist"){
      this.loginFormpackagelist.value['code']=this.idedit
      this.loginFormpackagelist.value['user'] = sessionStorage.getItem('user')
      datajson=this.loginFormpackagelist.value
    }else if(data.table =="priceplanlist"){
      this.loginFormpriceplanlist.value['code']=this.idedit
      this.loginFormpriceplanlist.value['user'] = sessionStorage.getItem('user')
      datajson=this.loginFormpriceplanlist.value
    }else if(data.table =="servicelist"){
      this.loginFormservicelist.value['code']=this.idedit
      this.loginFormservicelist.value['user'] = sessionStorage.getItem('user')
      datajson=this.loginFormservicelist.value
    }
    this.custom.customdescriptionedit(data.edit,datajson).then(res => {
      this.custom.customdescriptionlist(data).then(res => {
        if(data.table == "packagelist"){
          this.displayDialogpackagelist=false
        }else if(data.table =="priceplanlist"){
          this.displayDialogpriceplanlist=false
        }else if(data.table =="servicelist"){
          this.displayDialogservicelist=false
        }
        this.selectedCars3 = []
        this.cols = res.columnname
        this.data = res.data
        this._selectedColumns = this.cols
      })
      Swal.fire({
        icon: 'success',
        text: "Success",
      })
    })
  }
}
