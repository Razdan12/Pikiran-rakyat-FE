<template>
  <q-page>
    <div class="q-my-md">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
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
                            CAMPAIGN TYPE
                          </div>
                          <div class="q-mt-md">
                            CAMPAIGN PERIOD
                          </div>
                          <div class="q-mt-md">
                            AGENCY
                          </div>
                          <div class="q-mt-md">
                            BRAND
                          </div>
                        </div>
                        <div class="col-8">
                          <div>
                            PRMN
                          </div>
                          <div class="q-mt-md">
                            Regular
                          </div>
                          <div class="q-mt-md">
                            Agustus-September 2023
                          </div>
                          <div class="q-mt-md">
                            -
                          </div>
                          <div class="q-mt-md">
                            PKB
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        PACKAGE NUMBER :
                      </div>
                      <div class="q-mt-md">
                        PERIOD PACKAGE :
                      </div>
                      <div class="q-mt-md">
                        PIC CLIENT :
                      </div>
                      <div class="q-mt-md">
                        PIC PIC CONTACT NUMBER :
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
                            <td class="text-left"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>

                          </tr>
                          <tr>
                            <td class="text-left"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>
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
                  <div class="row q-mt-xl">
                    <div class="col-md-3"></div>
                    <div class="col-md-8">
                      <!-- <q-markup-table separator="cell" flat bordered>
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
                            <td class="text-left"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>

                          </tr>
                          <tr>
                            <td class="text-left"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>
                            <td class="text-right"></td>
                          </tr>

                        </tbody>
                      </q-markup-table> -->
                    </div>
                    <div class="col-md-1"></div>
                  </div>
                  <div class="text-right q-mt-md" >
                    <q-btn class="q-mr-sm bg-blue" color="gray-2" icon="mail"  />
                    <q-btn class="q-mr-sm bg-blue" color="primary" icon="print" />
                    <q-btn class=" bg-blue" color="primary" icon="list" label="Next" to="/molist" />
                  </div>
                </div>
              </q-scroll-area>
            </q-card-section>
          </q-card>

        </div>
        <div class="col-md-1"></div>
      </div>

    </div>
  </q-page>
</template>

<script>
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
    }
  }
}
</script>
