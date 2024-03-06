<template>
  <q-page>
    <div class="q-pa-md">
      <div class="col-md-10">
        <q-card class="full-width q-my-xl">
          <q-card-section>
            <p class="text-center text-bold" style="font-size: x-large">
              ORDER FORM
            </p>
            <q-separator class="q-my-lg" color="orange" inset />
            <q-form>
              <q-scroll-area style="height: 600px">
                <q-card-section class="q-mx-md">
                  <p class="q-my-md text-bold text-left text-light-blue-10" style="font-size: x-large">
                    Consumer Information
                  </p>
                  <div class="row">
                    <div class="col-md-8">
                      <div>
                        <p class="text-left text-bold" style="font-size: larger">
                          Consumer Name :
                        </p>
                        <q-select outlined use-chips v-model="custname" :options="options" label="Consumer Name"
                          @update:model-value="getDataCustomer" @filter="filterFn" use-input />
                      </div>
                      <!-- <p>{{ options }}</p> -->
                      <div class="q-mt-md">
                        <div class="row">
                          <div class="col-md-6">
                            <p class="text-left text-bold" style="font-size: larger">
                              PIC Name :
                            </p>
                            <q-input v-model="picName" outlined :options="options" label="Pic Name" disable readonly />
                          </div>
                          <div class="col-md-6">
                            <p class="text-left text-bold q-ml-md" style="font-size: larger">
                              Phone :
                            </p>
                            <q-input v-model="picNumber" class="q-ml-md" outlined :options="options" label="Phone"
                              disable readonly />
                          </div>
                        </div>
                      </div>
                      <div class="q-mt-md">
                        <p class="text-left text-bold" style="font-size: larger">
                          Consumer Address :
                        </p>
                        <q-input v-model="custAddress" outlined :options="options" label="Consumer Address" disable
                          readonly />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <p class="text-left text-bold q-ml-xl" style="font-size: larger">
                        LOGO :
                      </p>
                      <q-card class="q-my-sm q-mx-xl" style="width: 250px">
                        <q-card-section>
                          <q-img :src="custLogo" spinner-color="red" style="height: 150px" />
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
                <div v-if="custname !== null">
                  <q-separator color="light-blue-7" inset />
                  <q-card-section class="q-mx-md">
                    <p class="q-my-md text-bold text-left text-light-blue-10" style="font-size: x-large">
                      Input Media Order
                    </p>
                    <div>
                      <div class="q-mt-md">
                        <p class="text-bold text-blue" style="font-size: medium">
                          <q-icon name="portrait" />
                          <span class="text-bold" style="font-size: medium">
                            Sales Type</span>
                        </p>
                        <q-radio v-model="sales" val="Sales" label="Sales" />
                        <q-radio v-model="sales" val="Walkin" label="Walkin" />
                      </div>
                      <div class="row q-mx-md">
                        <div class="col-md-6">
                          <div class="q-mt-md">
                            <p class="text-bold text-blue" style="font-size: medium">
                              <q-icon name="portrait" />
                              <span class="text-bold" style="font-size: medium">
                                Campaign Name</span>
                            </p>
                            <q-input class="q-my-md" v-model="camp_name" dense outlined placeholder="Campaign Name"
                              style="width: 90%" />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="q-mt-md">
                            <p class="text-bold text-blue" style="font-size: medium">
                              <q-icon name="event" />
                              <span class="text-bold" style="font-size: medium">
                                Order Date</span>
                            </p>

                            <q-input filled v-model="date" mask="date" :rules="['date']" style="width: 90%" dense>
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="date" color="cyan">
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

                      <div class="q-mx-md q-my-md">
                        <p class="q-my-md text-bold text-left text-light-blue-10" style="font-size: x-large">
                          Opsi Media Tayang
                        </p>
                        <div class="row text-bold">
                          <div class="col-md-4">
                            <div>
                              <q-select outlined v-model="modelTayang" :options="optionsTayang" label="Media Tayang" />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <q-select v-if="modelTayang == 'Mitra'" outlined use-chips v-model="mitraData" multiple
                              :options="mitras" label="Mitra" @filter="filterMitra" use-input />
                          </div>
                        </div>
                      </div>

                      <q-list v-if="modelTayang !== null" bordered>
                        <q-expansion-item class="text-left text-light-blue-10" icon="newspaper" label="Articles Content"
                          style="font-size: larger" @click="typeRate = 'artikel'">
                          <q-separator />
                          <q-card>
                            <q-card-section>
                              <div>
                                <q-input type="number" v-model="postArtikel" outlined label="Jumlah Post"
                                  style="width: 30%; margin-bottom: 20px" />

                                <q-markup-table>
                                  <thead>
                                    <tr>
                                      <th class="text-center"></th>

                                      <th class="text-center">Name</th>
                                      <th class="text-center" v-if="modelTayang != 'Mitra'">
                                        Rate PRMN
                                      </th>
                                      <th class="text-center" v-if="modelTayang == 'Mitra'">
                                        Rate Mitra
                                      </th>
                                      <th class="text-center">Note</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in artikelData" :key="item.id">
                                      <td class="text-center">
                                        <q-checkbox v-model="dataProduk"
                                          :val="modelTayang == 'Mitra' ? (item.name + '#' + item.mitra + '#' + 'artikel') : (item.name + '#' + item.prmn + '#' + 'artikel')" />
                                      </td>

                                      <td class="text-center">
                                        {{ item.name }}
                                      </td>
                                      <td class="text-center" v-if="modelTayang != 'Mitra'">
                                        {{
                          item.is_custom_price_prmn
                            ? "Custom Price"
                            : item.prmn === 0 || null
                              ? "-"
                              : formatRupiah(item.prmn)
                        }}
                                      </td>
                                      <td class="text-center" v-if="modelTayang == 'Mitra'">
                                        {{
                          item.is_custom_price_mitra
                            ? "Custom Price"
                            : item.mitra === 0 || null
                              ? "-"
                              : formatRupiah(item.mitra)
                        }}
                                      </td>
                                      <td class="text-center">
                                        {{ item.note }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </q-markup-table>
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />

                        <q-expansion-item class="text-left text-light-blue-10" icon="subscriptions"
                          label="Social Media Content" style="font-size: larger" @click="typeRate = 'sosmed'">
                          <q-separator />
                          <q-card>
                            <q-card-section>
                              <div class="flex tw-gap-2">

                                <q-select outlined v-model="sosmedOption" :options="optionsSosmed" label="Sosmed"
                                  style="width: 30%; margin-bottom: 20px" />

                                <q-input type="number" v-model="postSosmed" outlined label="Jumlah Post"
                                  style="width: 30%; margin-bottom: 20px" />

                              </div>
                              <div v-if="sosmedOption !== null">
                                <q-markup-table v-if="sosmedOption !== 'Lainnya'">
                                  <thead>
                                    <tr>
                                      <th class="text-center"></th>

                                      <th class="text-center">Name</th>
                                      <th class="text-center" v-if="sosmedOption == 'Instagram'">
                                        Instagram
                                      </th>
                                      <th class="text-center" v-if="sosmedOption == 'Facebook'">
                                        Facebook
                                      </th>
                                      <th class="text-center">Note</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in rateMeta" :key="item.id">
                                      <td class="text-center">
                                        <q-checkbox v-model="dataProduk"
                                          :val="sosmedOption == 'Instagram' ? (item.name + '#' + item.instagram + '#' + 'sosmed') : (item.name + '#' + item.facebook + '#' + 'sosmed')" />
                                      </td>

                                      <td class="text-center">
                                        {{ item.name }}
                                      </td>
                                      <td class="text-center" v-if="sosmedOption == 'Instagram'">
                                        {{
                          item.instagram
                            ? formatRupiah(item.instagram)
                            : " - "
                        }}
                                      </td>
                                      <td class="text-center" v-if="sosmedOption == 'Facebook'">
                                        {{
                          item.facebook
                            ? formatRupiah(item.facebook)
                            : "-"
                        }}
                                      </td>
                                      <td class="text-center">
                                        {{ item.note }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </q-markup-table>
                                <q-markup-table v-if="sosmedOption === 'Lainnya'">
                                  <thead>
                                    <tr>
                                      <th class="text-center"></th>
                                      <th class="text-center">Name</th>
                                      <th class="text-center">Type</th>
                                      <th class="text-center">Rate</th>
                                      <th class="text-center">Note</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in rateSosmedOther" :key="item.id">
                                      <td class="text-center">
                                        <q-checkbox v-model="dataProduk"
                                          :val="(item.name + '#' + item.rate + '#' + 'sosmed')" />
                                      </td>
                                      <td class="text-center">
                                        {{ item.name }}
                                      </td>
                                      <td class="text-center">
                                        {{ item.type }}
                                      </td>
                                      <td class="text-center">
                                        {{
                          item.is_custom_price
                            ? "Custom Price"
                            : formatRupiah(item.rate)
                        }}
                                      </td>

                                      <td class="text-center">
                                        {{ item.note }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </q-markup-table>
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />

                        <q-expansion-item class="text-left text-light-blue-10" icon="space_dashboard"
                          label="Other Content" style="font-size: larger" @click="typeRate = 'other_content'">
                          <q-separator />
                          <q-card>
                            <q-card-section>
                              <q-markup-table>
                                <thead>
                                  <tr>
                                    <th class="text-center"></th>
                                    <th class="text-center">Name</th>
                                    <th class="text-center">Rate</th>
                                    <th class="text-center">Note</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in dataRate" :key="item.id">
                                    <td class="text-center">
                                      <q-checkbox v-model="dataProduk"
                                        :val="(item.name + '#' + item.rate + '#' + 'other content')" />
                                    </td>
                                    <td class="text-center">{{ item.name }}</td>
                                    <td class="text-center">
                                      {{
                          item.is_custom_price
                            ? "custom price"
                            : formatRupiah(item.rate)
                        }}
                                    </td>
                                    <td class="text-center">{{ item.note }}</td>
                                  </tr>
                                </tbody>
                              </q-markup-table>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />

                        <q-expansion-item class="text-left text-light-blue-10" icon="ads_click" label="Display Ads CPD"
                          style="font-size: larger" @click="typeRate = 'cpd'">
                          <q-separator />
                          <q-card>
                            <q-card-section>
                              <q-select outlined v-model="typeCpd" :options="typeOptionCpd" label="Media Penempatan"
                                style="width: 30%; margin-bottom: 20px" />
                              <div>
                                <q-markup-table>
                                  <thead>
                                    <tr>
                                      <th class="text-center"></th>
                                      <th class="text-center">Name</th>
                                      <th class="text-center">Type</th>
                                      <th class="text-center">Size</th>
                                      <th class="text-center" :hidden="typeCpd != 'home'">
                                        Home
                                      </th>
                                      <th class="text-center" :hidden="typeCpd != 'detail'">
                                        Detail
                                      </th>
                                      <th class="text-center" :hidden="typeCpd != 'section'">
                                        Section
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in cpdData" :key="item.id" :hidden="typeCpd == null">
                                      <td class="text-center">
                                        <q-checkbox v-model="dataProduk"
                                          :val="typeCpd === 'home' ? (item.name + '#' + item.rate_home + '#' + 'cpd') : typeCpd === 'detail' ? (item.name + '#' + item.rate_detail + '#' + 'cpd') : (item.name + '#' + item.rate_section + '#' + 'cpd')"
                                          :disable="(typeCpd === 'home' &&
                          item.rate_home === null) ||
                          (typeCpd === 'detail' &&
                            item.rate_detail === null) ||
                          (typeCpd === 'section' &&
                            item.rate_section === null)
                          " />
                                      </td>
                                      <td class="text-center">
                                        {{ item.name }}
                                      </td>
                                      <td class="text-center">
                                        {{ item.type }}
                                      </td>
                                      <td class="text-center">
                                        {{ item.size }}
                                      </td>
                                      <td class="text-center" :hidden="typeCpd != 'home'">
                                        {{
                          item.rate_home
                            ? formatRupiah(item.rate_home)
                            : "tidak tersedia"
                        }}
                                      </td>
                                      <td class="text-center" :hidden="typeCpd != 'detail'">
                                        {{
                          item.rate_detail
                            ? formatRupiah(item.rate_detail)
                            : "tidak tersedia"
                        }}
                                      </td>
                                      <td class="text-center" :hidden="typeCpd != 'section'">
                                        {{
                          item.rate_section
                            ? formatRupiah(item.rate_section)
                            : "tidak tersedia"
                        }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </q-markup-table>
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />
                        <q-expansion-item class="text-left text-light-blue-10" icon="ads_click" label="Display Ads CPM"
                          style="font-size: larger" @click="isCpm = 'cpm'" v-if="modelTayang == 'Mitra'">
                          <q-separator />
                          <q-card>
                            <q-card-section>
                              <q-input type="number" v-model="impresi" outlined dense label="Qty Impresi"
                                style="width: 30%; margin-bottom: 20px" />
                              <div>

                                <q-markup-table>
                                  <thead>
                                    <tr>
                                      <th class="text-center"></th>
                                      <th class="text-center">Name</th>
                                      <th class="text-center">Type</th>
                                      <th class="text-center">Size</th>
                                      <th class="text-center">Rate</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in cpmData" :key="item.id">
                                      <td class="text-center">
                                        <q-checkbox v-model="dataProdukCpm"
                                          :val="(item.name + '#' + item.rate + '#' + 'cpm')" />
                                      </td>
                                      <td class="text-center">
                                        {{ item.name }}
                                      </td>
                                      <td class="text-center">
                                        {{ item.type }}
                                      </td>
                                      <td class="text-center">
                                        {{ item.size }}
                                      </td>
                                      <td class="text-center">
                                        {{ formatRupiah(item.rate) }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </q-markup-table>
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />
                      </q-list>
                    </div>
                  </q-card-section>
                  <q-separator color="light-blue-7" inset />

                  <q-card-section class="q-mx-md">
                    <p class="text-bold text-left text-light-blue-10" style="font-size: x-large">
                      Periode Tayang
                    </p>

                    <div>
                      <div class="row">
                        <div class="col-md-2 q-my-auto">
                          <p class="text-bold text-light-blue-10" style="font-size: large">
                            From :
                          </p>
                        </div>
                        <div class="col-md-4">
                          <q-input filled v-model="date2" mask="date" :rules="['date2']" dense>

                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="date2" color="cyan">
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                        <div class="col-md-2 q-my-auto">
                          <p class="text-bold text-light-blue-10 q-ml-xl" style="font-size: large">
                            To :
                          </p>
                        </div>
                        <div class="col-md-4">
                          <q-input filled v-model="date3" mask="date" :rules="['date3']" dense>

                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="date3" color="cyan">
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
                  </q-card-section>
                  <q-separator color="light-blue-7" inset />
                  <q-card-section class="q-mx-md">
                    <p class="text-bold text-left text-light-blue-10" style="font-size: x-large">
                      Rincian Produk
                    </p>

                    <div style="width: 50%;">
                      <div class="q-pa-md">
                        <q-markup-table>
                          <thead>
                            <tr>
                              <!-- <th class="text-center">No</th> -->
                              <th class="text-center">Name</th>
                              <th class="text-center">Harga</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in dataProduk" :key="item.id">
                              <!-- <td class="text-center">{{ dataProdukCpm ?  }}</td> -->
                              <td class="text-center">{{ item.split('#')[0] }}</td>
                              <td class="text-center">{{ formatRupiah(item.split('#')[1]) }}</td>
                            </tr>
                            <tr v-for="(item, index) in dataProdukCpm" :key="item.id">
                              <!-- <td class="text-center">{{ dataProduk?.length }}</td> -->
                              <td class="text-center">{{ item.split('#')[0] }}</td>
                              <td class="text-center">{{ formatRupiah(item.split('#')[1]) }}</td>
                            </tr>
                          </tbody>
                        </q-markup-table>

                      </div>
                    </div>
                  </q-card-section>

                  <q-separator color="light-blue-7" inset />
                  <q-card-section class="q-mx-md">
                    <p class="text-bold text-left text-light-blue-10" style="font-size: x-large">
                      Metode Pembayaran
                    </p>
                    <div>
                      <p class="text-left text-bold" style="font-size: larger">
                        Metode Pembayaran :
                      </p>
                      <div class="q-gutter-sm">
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye" val="cash" label="Cash" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye" val="barter" label="Barter" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye" val="semi" label="Semi Barter" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye" val="kredit" label="Kredit" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye" val="termin" label="Termin" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye" val="deposit" label="Deposit" />
                      </div>

                      <div class="q-mt-md">
                        <!-- Your selection is: <strong>{{ pay }}</strong> -->
                        <div v-if="pay == 'cash'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Total :
                                {{
                          formattedFinalRate
                            ? formatRupiah(finalRate)
                            : formattedFinalRate
                        }}
                              </p>
                              <q-input prefix="Rp" v-model="finalRate" type="number" outlined dense
                                style="width: 90%" />
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="tempo" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="tempo" color="cyan">
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
                        <div v-else-if="pay == 'barter'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Nilai Barter :
                                {{
                          formattedFinalRate
                            ? formatRupiah(finalRate)
                            : formattedFinalRate
                        }}
                              </p>
                              <q-input prefix="Rp" v-model="finalRate" type="number" outlined dense
                                style="width: 90%" />
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="date" color="cyan">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Item Barang :
                              </p>
                              <q-input outlined v-model="barangBarter" dense style="width: 90%"
                                type="textarea"></q-input>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="pay == 'semi'">
                          <p class="text-left text-bold" style="font-size: large">
                            Total :
                            {{
                          finalRate == 0
                            ? getTotalSemi()
                            : formatRupiah(finalRate)
                        }}
                          </p>
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Nilai Barter : {{ formatRupiah(semiBarter) }}
                              </p>
                              <q-input prefix="Rp" v-model="semiBarter" type="number" outlined dense disable
                                style="width: 90%" />
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="date" color="cyan">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Nilai Cash : {{ formatRupiah(semiCash) }}
                              </p>
                              <q-input prefix="Rp" type="number" v-model="semiCash" outlined dense style="width: 90%" />
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="date2" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="date2" color="cyan">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Item Barang :
                              </p>
                              <q-input outlined v-model="barangBarter" dense style="width: 90%"
                                type="textarea"></q-input>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="pay == 'kredit'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Nilai Kredit :
                                {{
                          formattedFinalRate
                            ? formatRupiah(finalRate)
                            : formattedFinalRate
                        }}
                              </p>
                              <q-input prefix="Rp" v-model="finalRate" type="number" outlined dense
                                style="width: 90%" />
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="date" color="cyan">
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
                        <div v-else-if="pay == 'termin'">
                          <p class="text-left text-bold" style="font-size: large">
                            Total :
                            {{
                          finalRate ? getTotalTermin() : formattedFinalRate
                        }}
                          </p>
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Termin 1 40% : {{ formatRupiah(termin1) }}
                              </p>
                              <q-input prefix="Rp" v-model="termin1" type="number" outlined dense style="width: 90%" />
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="date" color="cyan">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Termin 2 30% : {{ formatRupiah(termin2) }}
                              </p>
                              <q-input prefix="Rp" v-model="termin2" type="number" outlined dense style="width: 90%" />
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="date2" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="date2" color="cyan">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Termin 3 30% : {{ formatRupiah(termin3) }}
                              </p>
                              <q-input prefix="Rp" v-model="termin3" type="number" outlined dense style="width: 90%" />
                              <p class="text-left text-bold" style="font-size: large">
                                Jatuh Tempo :
                              </p>
                              <q-input filled v-model="date3" mask="date" :rules="['date']" dense style="width: 90%">

                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="date3" color="cyan">
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
                        <div v-else-if="pay == 'deposit'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Minimal Bayar / Deposit :
                              </p>
                              <q-input prefix="Rp" v-model="minDeposit" type="number" outlined dense
                                style="width: 90%" />
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large">
                                Nilai Deposit :
                              </p>
                              <q-input prefix="Rp" v-model="deposit" type="number" outlined dense style="width: 90%" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="cursor-pointer">
                        <p class="text-left text-bold q-mt-md" style="font-size: larger">
                          Diskon : {{ value }} %
                        </p>

                        <q-popup-edit v-model="value" auto-save v-slot="scope">
                          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                        </q-popup-edit>
                      </div>
                      <q-slider class="q-mt-md" v-model="value" :min="0" :max="30" :step="0.01" label label-always
                        color="light-green" />
                    </div>

                    <div></div>
                    <div class="q-mt-md text-right">
                      <q-btn class="q-mx-md" color="secondary" :disable="submit" label="Create" @click="createOrder" />
                      <q-btn color="brown-5" label="Cancel" />
                    </div>
                  </q-card-section>
                </div>
              </q-scroll-area>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Swal from "sweetalert2";

import { ref, watch } from "vue";

let optionsList = [];
let mitraListt = [];

export default {
  setup() {
    const options = ref(optionsList);
    const mitras = ref(mitraListt);

    return {
      value: ref(0),
      options,
      mitras,
      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = optionsList.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      filterMitra(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          mitras.value = mitraListt.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      mitraData: ref([]),
      custname: ref(null),
      picName: ref(""),
      picNumber: ref(""),
      custAddress: ref(""),
      custLogo:
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
      token: sessionStorage.getItem("token"),
      sales: ref(null),
      A1: ref(false),
      A2: ref(false),
      camp_name: ref(null),
      pay: ref(null),
      date: ref(null),
      date2: ref(null),
      date3: ref(null),
      tempo: ref(null),
      diskon: ref(null),
      deposit: ref(null),
      minDeposit: ref(null),
      submit: ref(false),

      //new setting
      modelTayang: ref(null),
      optionsTayang: ["PRMN", "Mitra"],
      articleList: ref(),
      sosmedList: ref([]),
      sosmedOption: ref(null),
      optionsSosmed: ["Facebook", "Instagram", "Lainnya"],
      rateMeta: ref([]),
      rateSosmedOther: ref([]),
      totalRate: ref(0),
      finalRate: ref(0),
      customPrice: ref(true),
      typeRate: ref(""),
      formattedFinalRate: ref(),
      barangBarter: ref(""),
      semiCash: ref(""),
      semiBarter: ref(""),
      termin1: ref(0),
      termin2: ref(0),
      termin3: ref(0),
      typeCpd: ref(null),
      typeOptionCpd: ["home", "detail", "section"],
      id: ref([]),
      dataRate: ref([]),
      rateList: ref([]),
      impresi: ref(),

      dataProduk: ref([]),
      dataProdukCpm: ref([]),
      cpdData: ref([]),
      cpmData: ref([]),
      artikelData: ref([]),
      totalHarga: ref(0),
      isCpm: ref(),
      postArtikel: ref(),
      postSosmed: ref(),
    };
  },
  watch: {
    dataProduk: {
      handler(newVal) {
        this.getTotalRate(newVal);
      },
      deep: true,
    },
    dataProdukCpm: {
      handler(newVal) {
        this.getTotalRate(newVal);
      },
      deep: true,
    },
    modelTayang(newVal) {
      // this.articleList = [];
      newVal === "Mitra" ? this.getMitra() : "";
    },
    totalRate: {
      handler() {
        this.calculateFinalRate();
      },
      deep: true,
    },
    value() {
      this.calculateFinalRate();
    },
    pay(newVal) {
      if (newVal === "semi") {
        this.semiBarter = this.finalRate;
      }
      if (newVal === "termin") {
        this.termin1 = (40 / 100) * this.finalRate;
        this.termin2 = (30 / 100) * this.finalRate;
        this.termin3 = (30 / 100) * this.finalRate;
      }
      this.calculateFinalRate();
    },
    semiCash(newVal) {
      this.getTotalSemi();
    },
    semiBarter(newVal) {
      this.getTotalSemi();
    },
    termin1() {
      this.getTotalTermin();
    },
    termin2() {
      this.getTotalTermin();
    },
    termin3() {
      this.getTotalTermin();
    },
    isCpm(newVal) {
      this.getCpmData();
    },
    typeRate(newVal) {
      this.rateList = [];
      switch (newVal) {
        case "artikel":
          this.getArticleContent();
          break;
        case "sosmed":
          this.getSosmed();
          break;
        case "cpd":
          this.getCpdData();
          break;
        case "other_content":
          this.getOtherData();
          break;
      }
    },
  },

  mounted() {
    this.getCustomer();
    this.getDate();
  },

  methods: {
    getTotalSemi() {
      if (parseInt(this.semiCash) > this.finalRate) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Nilai Cash tidak boleh lebih besar dari total order",
        });
        this.semiCash = this.finalRate
      } else {

        const hasil = this.semiCash ? this.finalRate - parseInt(this.semiCash) : this.finalRate
        this.semiBarter = hasil
      }

      return this.formatRupiah();
    },

    getTotalTermin() {
      const termin1 = this.termin1 ? parseInt(this.termin1) : 0;
      const termin2 = this.termin2 ? parseInt(this.termin2) : 0;
      const termin3 = this.termin3 ? parseInt(this.termin3) : 0;
      const hasil = termin1 + termin2 + termin3;
      this.finalRate = hasil;
      return this.formatRupiah(hasil);
    },

    getTotalRate(newVal) {
      let total = [];
      let totalCpm = []

      this.dataProduk.map((item) => total.push(parseInt(item.split('#')[1])))
      this.dataProdukCpm.map((item) => totalCpm.push(parseInt(item.split('#')[1])))

      const TotalHarga = total.reduce((a, b) => a + b, 0);
      const TotalHargaCpm = ((totalCpm.reduce((a, b) => a + b, 0)) * this.mitraData.length * this.impresi) / 1000;

      this.totalRate = TotalHargaCpm ? TotalHarga + TotalHargaCpm : TotalHarga

    },

    calculateFinalRate() {
      const qtyOrder =
        (new Date(this.date3) - new Date(this.date2)) / (24 * 60 * 60 * 1000) +
        1;

      const discountAmount = (this.value / 100) * this.totalRate;

      const jumlah =
        this.modelTayang === "PRMN"
          ? this.totalRate * qtyOrder
          : this.totalRate * qtyOrder;

      const finalPrice = jumlah - discountAmount;

      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });

      this.finalRate = finalPrice;
      this.formattedFinalRate = formatter.format(finalPrice);
    },

    formatRupiah(value) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(value);
    },

    getDate() {
      const dateNow = new Date();
      const year = dateNow.getFullYear();
      const month = String(dateNow.getMonth() + 1).padStart(2, "0");
      const day = String(dateNow.getDate()).padStart(2, "0");
      const formattedDate = `${year}/${month}/${day}`;

      this.date = formattedDate;
      this.date2 = formattedDate;
      this.date3 = formattedDate;
      this.tempo = formattedDate;
    },

    async getCustomer() {
      try {
        const response = await this.$api.get("/customer/all", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const custName = response.data;
        optionsList = custName.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        this.options = optionsList;
      } catch (error) {
        console.log(error);
      }
    },

    async getDataCustomer() {
      try {
        const response = await this.$api.get(
          `/customer/${this.custname.value}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.picName = response.data.picName;
        this.picNumber = response.data.phone;
        this.custAddress = response.data.address;
      } catch (error) {
        console.log(error);
      }
    },

    async getArticleContent() {
      const response = await this.$api.get(`/rate-card/article/all`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.artikelData = response.data;
    },

    async getSosmed() {
      const response = await this.$api.get(`/rate-card/sosmed/all`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.rateMeta = response.data.meta;
      this.rateSosmedOther = response.data.other;
    },

    async createOrder() {
      const token = sessionStorage.getItem("token");
      const id = sessionStorage.getItem("id");
      const role = sessionStorage.getItem("role");
      const rateCardList = this.dataProduk.concat(this.dataProdukCpm)
      const splitCardLists = rateCardList.map(card => {
        const [produk, rate, kategori] = card.split('#');
        return { produk, rate, kategori };
      });

      const data = {
        idCust: this.custname.value,
        idUser: id,
        SalesType: this.sales,
        camp_name: this.camp_name,
        order_date: new Date(this.date).toISOString(),
        period_start: new Date(this.date2).toISOString(),
        period_end: new Date(this.date3).toISOString(),
        pay_type: this.pay,
        request_by: role,
        opsiMediatayang: this.modelTayang,
        OrderMitra: Array.isArray(this.mitraData)
          ? this.mitraData.map((option) => option.value)
          : this.mitraData,
        rateCard: splitCardLists,
        payment: this.getPayment(),
      };

      if (!this.modelTayang || !this.pay) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill all the form data",
        });
        return;
      }

      try {
        this.submit = true;
        const response = await this.$api.post(`/order/new`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200) {
          const id = response.data.data.id;
          sessionStorage.setItem("idOrder", id);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/sales/quotation");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        console.log(error);
      } finally {
        this.submit = false;
      }
    },


    getPayment() {
      switch (this.pay) {
        case "cash":
          return {
            tempo: new Date(this.tempo).toISOString(),
            diskon: this.value,
            total: this.totalRate
          };
        case "deposit":
          return {
            deposit: this.deposit,
            minDeposit: this.minDeposit,
            total: this.totalRate
          };
        case "barter":
          return {
            tempo: new Date(this.date).toISOString(),
            barang: this.barangBarter,
            diskon: this.value,
            total: this.totalRate
          };
        case "semi":
          return {
            cash: parseInt(this.semiCash),
            tempoBarter: new Date(this.date).toISOString(),
            tempoCash: new Date(this.date).toISOString(),
            diskon: this.value,
            barang: this.barangBarter,
            total: this.totalRate
          };
        case "kredit":
          return {
            tempo: new Date(this.date2).toISOString(),
            diskon: this.value,
            total: this.totalRate
          };
        case "termin":
          return {
            termin1: this.termin1,
            termin2: this.termin2,
            termin3: this.termin3,
            tempo1: new Date(this.date).toISOString(),
            tempo2: new Date(this.date2).toISOString(),
            tempo3: new Date(this.date3).toISOString(),
            diskon: this.value,
            total: this.totalRate
          };
      }
    },

    async getMitra() {
      try {
        const response = await this.$api.get(`/media/mitra/all/drop`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        mitraListt = response.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async getCpdData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`/rate-card/cpd/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.cpdData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getOtherData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`/rate-card/other-constent/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.dataRate = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCpmData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`/rate-card/cpm/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.cpmData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
