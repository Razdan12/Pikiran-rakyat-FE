<template>
  <q-page>
    <div class="q-my-md">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: x-large;">ORDER TAYANG IKLAN</p>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div>
                <q-markup-table separator="cell" flat bordered>
                  <thead>
                    <tr>
                      <th class="text-left">No</th>
                      <th class="text-right">Client</th>
                      <th class="text-right">Tanggal Order</th>
                      <th class="text-right">Periode</th>
                      <th class="text-right">No Mo</th>
                      <th class="text-right">Product</th>
                      <th class="text-right">sub</th>
                      <th class="text-right">OTI</th>
                      <th class="text-right">Tayang</th>
                      <th class="text-right" style="width: 20vw;">link</th>
                      <th class="text-right">Status</th>
                      <th class="text-right">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">1</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">291/MO-CRW/PRMN/VIII/2023 </td>
                      <td class="text-right">Artikel</td>
                      <td class="text-right">Article & Content</td>
                      <td class="text-right">001/A01/291/OTI-CRW/VIII/2023</td>
                      <th class="text-right">16 November 2023</th>
                      <th class="text-right">
                        https://www.pikiran-rakyat.com/ekonomi/pr-017364019/bisnis-makin-sukses-produk-lokal-dan-umkm-paling-diburu-di-shopee-1111-big-sale
                      </th>
                      <th class="text-right">close</th>
                      <th class="text-right">
                        <q-btn square color="secondary" icon="edit" />
                      </th>
                    </tr>
                    <tr>
                      <td class="text-left">2</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">291/MO-CRW/PRMN/VIII/2023 </td>
                      <td class="text-right">Artikel</td>
                      <td class="text-right">Article & Content</td>
                      <td class="text-right">002/A01/291/OTI-CRW/VIII/2023</td>
                      <th class="text-right"></th>
                      <th class="text-right"></th>
                      <th class="text-right">open</th>
                      <th class="text-right">
                        <q-btn square color="secondary" icon="edit" @click="card = true" />
                      </th>
                    </tr>

                    <q-dialog v-model="card">
                      <q-card class="my-card">
                        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                        <q-card-section>
                          <q-btn fab color="primary" icon="place" class="absolute"
                            style="top: 0; right: 12px; transform: translateY(-50%);" />

                          <div class="row no-wrap items-center">
                            <div class="col text-h6 ellipsis">
                              Cafe Basilico
                            </div>
                            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                              <q-icon name="place" />
                              250 ft
                            </div>
                          </div>

                          <q-rating v-model="stars" :max="5" size="32px" />
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                          <div class="text-subtitle1">
                            $・Italian, Cafe
                          </div>
                          <div class="text-caption text-grey">
                            Small plates, salads & sandwiches in an intimate setting.
                          </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions align="right">
                          <q-btn v-close-popup flat color="primary" label="Reserve" />
                          <q-btn v-close-popup flat color="primary" round icon="event" />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>



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

      card: ref(false),
    }
  }
}
</script>
