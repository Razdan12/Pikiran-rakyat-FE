<template>
  <q-page>
    <div class="q-pa-md">
     
      <div>
        <q-card class="full-width q-my-lg">
          <q-card-section>
            <q-scroll-area style="height: 750px; ">
              <p class="text-center text-bold" style="font-size: x-large;">QUOTATION</p>
              <q-separator color="light-blue-7" inset />
              <div class="q-my-xl">
                <div class="row q-ml-md">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-4">
                        <div>
                          CAMPAIGN
                        </div>

                        <div class="q-mt-md">
                          CAMPAIGN PERIOD
                        </div>
                        <div class="q-mt-md">
                          {{ cust_type }}
                        </div>

                      </div>
                      <div class="col-8">
                        <div>
                          : {{ camp_name }}
                        </div>

                        <div class="q-mt-md">
                          : {{ camp_period }}
                        </div>
                        <div class="q-mt-md">
                          : {{ cust_name }}
                        </div>

                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-4">
                        <div>
                          PACKAGE NUMBER
                        </div>
                        <div class="q-mt-md">
                          PERIOD PACKAGE
                        </div>

                        <div class="q-mt-md">
                          PIC CLIENT
                        </div>
                        <div class="q-mt-md">
                          PIC CONTACT NUMBER
                        </div>
                      </div>

                      <div class="col-8">
                        <div>
                          : 1234314
                        </div>
                        <div class="q-mt-md">
                          : {{ camp_period }}
                        </div>

                        <div class="q-mt-md">
                          : {{ pic_name }}
                        </div>
                        <div class="q-mt-md">
                          : {{ pic_contact }}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div class=" q-mt-xl text-center">
                  <span style="font-size: xx-large;">
                    Pikiran Rakyat Media Network (PRMN)
                  </span><br>
                  <span class="q-my-xl" style="font-size: x-large;">
                    ONLINE
                  </span>

                  <q-table class="q-mt-xl" :rows="rows" :columns="columns" row-key="name" hide-bottom dense />

                </div>
                <div class="row q-m-t-xl">
                  <div class="col-md-8">
                    <q-markup-table class="q-mt-lg" separator="cell" flat bordered style="width: 90%;">
                      <thead class="bg-blue-grey-2">
                        <tr>
                          <th colspan="3" class="text-center">PRMN</th>
                          <th rowspan="2" class="text-center">Client Approval</th>
                        </tr>
                        <tr>
                          <th class="text-center">Request By</th>
                          <th class="text-center">Confirmaed By</th>
                          <th class="text-center">acknowledge By</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="height: 20vh;">
                          <td class=" justify-center items-center"><img :hidden="sales_approve == false"
                              src="https://png.pngtree.com/png-vector/20221009/ourmid/pngtree-original-approved-stamp-and-badget-design-red-grunge-png-image_6293837.png"
                              alt="approve" style="width: 100px;"></td>
                          <td class=" justify-center items-center"><img :hidden="manager_approve == false"
                              src="https://png.pngtree.com/png-vector/20221009/ourmid/pngtree-original-approved-stamp-and-badget-design-red-grunge-png-image_6293837.png"
                              alt="approve" style="width: 100px;"></td>
                          <td class=" justify-center items-center"><img :hidden="pic_approve == false"
                              src="https://png.pngtree.com/png-vector/20221009/ourmid/pngtree-original-approved-stamp-and-badget-design-red-grunge-png-image_6293837.png"
                              alt="approve" style="width: 100px;"></td>
                         
                         
                          <td class="text-right"></td>

                        </tr>
                        <tr>
                          <td class="text-center"></td>
                          <td class="text-center"></td>
                          <td class="text-center"> <q-btn :disable="pic_approve" color="secondary" label="Approv"
                              @click="handleApprove" /></td>
                          
                          <td class="text-center"></td>
                        </tr>

                      </tbody>
                    </q-markup-table>
                  </div>
                  <div class="col-md-4">
                    <br>
                    <q-markup-table dark class="bg-blue-grey-2 text-black q-m-t-xl">

                      <tbody>
                        <tr>
                          <td class="text-left">Total Package (Rp)</td>
                          <td class="text-right">5.000.000</td>

                        </tr>
                        <tr>
                          <td class="text-left">Best Price Package (Rp)</td>
                          <td class="text-right">5.000.000</td>

                        </tr>
                        <tr>
                          <td class="text-left">VAT 11% (Rp)</td>
                          <td class="text-right">550.000</td>

                        </tr>
                        <tr class="text-bold">
                          <td class="text-left">PAID Incl VAT 11% (Rp)</td>
                          <td class="text-right">5.550.000</td>
                        </tr>
                      </tbody>
                    </q-markup-table>

                  </div>
                </div>

                <div class="text-right q-mt-md">
                  <q-btn class="q-mr-sm bg-blue" color="gray-2" icon="mail" />
                  <q-btn class="q-mr-sm bg-blue" color="primary" icon="print" />
                  <q-btn class=" bg-blue" color="primary" icon="list" label="Next" to="/sales/molist" />
                </div>
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>

      </div>
      
    </div>
    
  </q-page>
</template>

<script>
import Swal from 'sweetalert2'
import { ref } from 'vue'
const columns = [
  {
    name: 'no',
    required: true,
    label: 'No',
    align: 'left',
    field: row => row.no,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Spot Promo', field: 'calories', sortable: true },
  { name: 'fat', label: 'Promo Type', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Details', field: 'carbs' },
  { name: 'protein', label: 'Qty', field: 'protein' },
  { name: 'sodium', label: 'Day', field: 'sodium' },
  { name: 'calcium', label: 'Remakrs', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Rate/Item (Rp)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'total', label: 'Totals (Rp)', field: 'total', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    no: '1',
    calories: 'Pikiran Rakyat',
    fat: 'Media Sosial',
    carbs: 'Agustusan di PR',
    protein: 1,
    sodium: '-',
    calcium: 'by PRMN',
    iron: '5.000.000',
    total: '5.000.000'
  },
  {
    no: '',
    calories: '',
    fat: '',
    carbs: '',
    protein: '',
    sodium: '',
    calcium: '',
    iron: '',
    total: ''
  },
  {
    no: '',
    calories: '',
    fat: '',
    carbs: '',
    protein: '',
    sodium: '',
    calcium: '',
    iron: '',
    total: ''
  },
  {
    no: '',
    calories: '',
    fat: '',
    carbs: '',
    protein: '',
    sodium: '',
    calcium: 'Total',
    iron: '',
    total: '5.000.000'
  },


]

export default {
  setup() {
    return {
      columns,
      rows,
      camp_name: ref('name'),
      camp_period: ref('period'),
      cust_type: ref('cust_name'),
      cust_name: ref('name'),
      pic_name: ref('pic'),
      pic_contact: ref('contact'),
      sales_approve: ref(false),
      manager_approve: ref(false),
      pic_approve: ref(false)
    }
  },
  mounted() {
    this.getQuoData()
  },
  methods: {
    async getQuoData() {
      const id = sessionStorage.getItem("idOrder")
      const token = sessionStorage.getItem("token")
      try {
        const response = await this.$api.get(`/quotation/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

       
        this.camp_name = response.data.camp_name
        this.camp_period = `${response.data.period_start} - ${response.data.period_end}`
        this.cust_type = response.data.cust_type
        this.cust_name = response.data.cust_name
        this.pic_name = response.data.pic_name
        this.pic_contact = response.data.pic_contact
        this.sales_approve = response.data.approve1
        this.manager_approve = response.data.approve2 == null ? false : true
        this.pic_approve = response.data.approve3 == null ? false : true

      } catch (error) {
        console.log(error);
      }

    },
    async editOrder() {
      const id = sessionStorage.getItem("idOrder")
      const token = sessionStorage.getItem("token")
      try {
        const data = {
          pic_approve: true
        }

        const response = await this.$api.patch(`/order/edit-order/${id}`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
       
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success Approved!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getQuoData()

      } catch (error) {
        console.log(error);
      }
    },

    handleApprove() {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to approve?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve Now"
      }).then((result) => {
        if (result.isConfirmed) {
          this.editOrder()

        }
      });

    }
  }
}
</script>
