<template>
  <q-page>
    <div class="q-my-md">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: large;">REPORT </p>
              <div class="absolute-right q-gutter-sm q-mt-sm q-mr-xl">
                <q-btn square color="blue" icon="print" />
                <q-btn  color="blue" icon="table_view" />
              </div>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div class="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="col-md-2 q-my-auto">
                        <p class="text-bold text-light-blue-10" style="font-size: large;">From :</p>
                      </div>
                      <div class="col-md-4">
                        <q-input filled v-model="date2" mask="date" :rules="['date2']" dense style="width: 90%;">
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date2">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="col-md-2 q-my-auto">
                        <p class="text-bold text-light-blue-10" style="font-size: large;">To :</p>
                      </div>
                      <div class="col-md-4">
                        <q-input filled v-model="date2" mask="date" :rules="['date2']" dense style="width: 90%;">
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date2">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 text-left">
                  <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                      <div class="col-md-2 q-my-auto">
                        <p class="text-bold text-light-blue-10" style="font-size: medium;">Filter by :</p>
                      </div>
                      <div class="col-md-4">
                        <q-select filled v-model="filter" :options="optionsfilter" label="Filter by" dense
                          style="width: 90%;" />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="col-md-2 q-my-auto">
                        <p class="text-bold text-light-blue-10" style="font-size: medium;">sub Filter :</p>
                      </div>
                      <div class="col-md-4">
                        <q-select filled v-model="sub" :options="optionssub" label="sub Filter" dense
                          style="width: 90%;" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <q-markup-table>
                  <thead>
                    <tr>
                      <th class="text-left">No</th>
                      <th class="text-right">Client</th>
                      <th class="text-right">Campaign</th>
                      <th class="text-right">Tanggal Order</th>
                      <th class="text-right">No Quotation</th>
                      <th class="text-right">Mitra</th>
                      <th class="text-right">Media Tayang</th>
                      <th class="text-right">No MO</th>
                      <th class="text-right">Periode</th>
                      <th class="text-right">OTI</th>
                      <th class="text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">1</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">291/Q-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">291/MO-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">001/A01/291/OTI-CRW/VIII/2023 </td>
                      <td class="text-right text-red">
                        Close
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">2</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">291/Q-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">291/MO-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">002/A01/291/OTI-CRW/VIII/2023 </td>
                      <td class="text-right text-red">
                        Close
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">3</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">291/Q-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">291/MO-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">003/MS03/291/OTI-CRW/VIII/2023 </td>
                      <td class="text-right text-green">
                        Open
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">4</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">291/Q-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">291/MO-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">004/MS06/291/OTI-CRW/VIII/2023 </td>
                      <td class="text-right text-green">
                        Open
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">5</td>
                      <td class="text-right">Locus</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">292/Q-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">292/MO-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">001/A01/291/OTI-LCS/VIII/2023 </td>
                      <td class="text-right text-red">
                        Close
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">6</td>
                      <td class="text-right">Locus</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">292/Q-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">292/MO-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">002/A01/291/OTI-LCS/VIII/2023 </td>
                      <td class="text-right text-red">
                        Close
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">7</td>
                      <td class="text-right">Locus</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">292/Q-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">292/MO-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">003/A01/291/OTI-LCS/VIII/2023 </td>
                      <td class="text-right text-red">
                        Close
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">8</td>
                      <td class="text-right">Locus</td>
                      <td class="text-right">-</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">292/Q-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">-</td>
                      <td class="text-right">-</td>
                      <td class="text-right">292/MO-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">004/A01/291/OTI-LCS/VIII/2023 </td>
                      <td class="text-right text-red">
                        Close
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </div>



            </q-card-section>
          </q-card>

        </div>
        <div class="col-md-1"></div>
      </div>

    </div>
  </q-page>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    return {

      date: ref('2023/11/01'),
      date2: ref('2023/11/01'),
      filter: ref(null),
      optionsfilter: [
        'Client', 'Mitra', 'Quotation', 'OTI', 'Media Tayang', 'Status'
      ]

    }
  }
}
</script>
