<template>
  <q-page>

    <div class="row">
      <div class="col-md-1">
      </div>
      <div class="col-md-10">
        <q-card class="full-width q-my-xl">
          <q-card-section>
            <p class="text-center text-bold" style="font-size: x-large;">ORDER FORM</p>
            <q-separator class="q-my-lg" color="orange" inset />
            <q-form>
              <q-scroll-area style="height: 600px; ">
                <q-card-section class="q-mx-md">

                  <p class="q-my-md  text-bold text-left text-light-blue-10" style="font-size: x-large;">Consumer
                    Information</p>
                  <div class="row">
                    <div class="col-md-8">
                      <div>
                        <p class="text-left text-bold" style="font-size: larger;"> Consumer Name :</p>
                        <q-select outlined use-chips v-model="custname" :options="options" label="Consumer Name"
                          @update:model-value="getDataCustomer" @filter="filterFn" use-input />
                      </div>
                      <!-- <p>{{ options }}</p> -->
                      <div class="q-mt-md">
                        <div class="row">
                          <div class="col-md-6">
                            <p class="text-left text-bold" style="font-size: larger;"> PIC Name :</p>
                            <q-input v-model="picName" outlined :options="options" label="Pic Name" disable readonly />
                          </div>
                          <div class="col-md-6">
                            <p class="text-left text-bold q-ml-md" style="font-size: larger;"> Phone :</p>
                            <q-input v-model="picNumber" class="q-ml-md" outlined :options="options" label="Phone" disable
                              readonly />
                          </div>
                        </div>
                      </div>
                      <div class="q-mt-md">
                        <p class="text-left text-bold" style="font-size: larger;"> Consumer Address :</p>
                        <q-input v-model="custAddress" outlined :options="options" label="Consumer Address" disable
                          readonly />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <p class="text-left text-bold q-ml-xl" style="font-size: larger;"> LOGO :</p>
                      <q-card class="q-my-sm q-mx-xl" style="width: 90%; height: 30vh;">
                        <q-card-section>
                          <q-img :src="custLogo" spinner-color="red" style="height: 250px; max-width: 500px" />

                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
                <div v-if="custname !== null">

                  <q-separator color="light-blue-7" inset />
                  <q-card-section class="q-mx-md">
                    <p class="q-my-md  text-bold text-left text-light-blue-10" style="font-size: x-large;">Input Media
                      Order
                    </p>
                    <div>
                      <div class="q-mt-md">
                        <p class="text-bold text-blue" style="font-size: medium;">
                          <q-icon name="portrait" />
                          <span class="text-bold" style="font-size: medium;"> Sales Type</span>
                        </p>
                        <q-radio v-model="sales" val="Sales" label="Sales" />
                        <q-radio v-model="sales" val="Walkin" label="Walkin" />

                      </div>
                      <div class="row q-mx-md">
                        <div class="col-md-6">
                          <div class="q-mt-md">
                            <p class="text-bold text-blue" style="font-size: medium;">
                              <q-icon name="portrait" />
                              <span class="text-bold" style="font-size: medium;"> Campaign Name</span>
                            </p>
                            <q-input class="q-my-md" v-model="camp_name" dense outlined placeholder="Campaign Name"
                              style="width: 90%;" />

                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="q-mt-md">
                            <p class="text-bold text-blue" style="font-size: medium;">
                              <q-icon name="event" />
                              <span class="text-bold" style="font-size: medium;"> Order Date</span>
                            </p>

                            <q-input filled v-model="date" mask="date" :rules="['date']" style="width: 90%;" dense>
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
                        <p class="q-my-md  text-bold text-left text-light-blue-10" style="font-size: x-large;">Opsi Media
                          Tayang
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
                        <q-expansion-item group="somegroup" class="text-left text-light-blue-10" icon="newspaper"
                          label="Articles Content" style="font-size: larger;">
                          <q-separator />
                          <q-card>
                            <q-card-section>
                              <div>
                                <q-markup-table>
                                  <thead>
                                    <tr>
                                      <th class="text-center"></th>

                                      <th class="text-center">Name</th>
                                      <th class="text-center" v-if="modelTayang != 'Mitra'">Rate PRMN</th>
                                      <th class="text-center" v-if="modelTayang == 'Mitra'">Rate Mitra</th>
                                      <th class="text-center">Note</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in article" :key="item.id">
                                      <td class="text-center"><q-checkbox v-model="articleList" :val='item' /></td>

                                      <td class="text-center">{{ item.name }}</td>
                                      <td class="text-center" v-if="modelTayang != 'Mitra'">{{ item.is_custom_price_prmn ?
                                        'Custom Price' : item.prmn === 0 || null ? "-" : 'Rp.' + item.prmn }}</td>
                                      <td class="text-center" v-if="modelTayang == 'Mitra'">{{ item.is_custom_price_mitra
                                        ?
                                        'Custom Price' : item.mitra === 0 || null ? "-" : 'Rp.' + item.mitra }}</td>
                                      <td class="text-center">{{ item.note }}</td>

                                    </tr>

                                  </tbody>
                                </q-markup-table>

                              </div>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />
                        <q-expansion-item group="somegroup" class="text-left text-light-blue-10" icon="subscriptions"
                          label="Social Media Content" style="font-size: larger;">
                          <q-separator />
                          <q-card>
                            <q-card-section>
                              <q-select outlined v-model="sosmedOption" :options="optionsSosmed" label="Sosmed"
                                style="width: 10%; margin-bottom: 20px;" />
                              <div v-if="sosmedOption !== null">
                                <q-markup-table v-if="sosmedOption !== 'Lainnya'">
                                  <thead>
                                    <tr>
                                      <th class="text-center"></th>
                                     
                                      <th class="text-center">Name</th>
                                      <th class="text-center" v-if="sosmedOption == 'Instagram'">Instagram</th>
                                      <th class="text-center" v-if="sosmedOption == 'Facebook'">Facebook</th>
                                      <th class="text-center">Note</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in rateMeta" :key="item.id">
                                      <td class="text-center"><q-checkbox v-model="articleList" :val='item.id' /></td>
                                     
                                      <td class="text-center">{{ item.name }}</td>
                                      <td class="text-center" v-if="sosmedOption == 'Instagram'">{{ item.instagram ? 'Rp. ' + item.instagram : '-' }}</td>
                                      <td class="text-center" v-if="sosmedOption == 'Facebook'">{{ item.facebook ? 'Rp. ' + item.facebook : '-' }}</td>
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
                                            <td class="text-center"><q-checkbox v-model="articleList" :val='item.id' /></td>
                                              <td class="text-center">{{ item.name }}</td>
                                              <td class="text-center">{{ item.type }}</td>
                                              <td class="text-center">{{ item.is_custom_price ? 'Custom Price' : 'Rp. ' + item.rate }}</td>
  
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
                        <q-expansion-item group="somegroup" class="text-left text-bold text-light-blue-10" icon="ads_click"
                          label="Display Ads CPD" style="font-size: larger;">
                          <q-separator />
                          <q-card>
                            <q-card-section>
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
                                          <tr v-for="(item, index) in cpdOtherList" :key="item.id">
                                            <td class="text-center"><q-checkbox v-model="articleList" :val='item.id' /></td>
                                              <td class="text-center">{{ item.name }}</td>
                                              <td class="text-center">{{ item.type }}</td>
  
                                              <td class="text-center">{{ item.size }}</td>
                                              <td class="text-center">Rp. {{ item.rate }}</td>
                                              
                                          </tr>
                                      </tbody>
                                  </q-markup-table>
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />
                        <q-expansion-item group="somegroup" class="text-left text-bold text-light-blue-10" icon="ads_click"
                          label="Display Ads CPM" style="font-size: larger;">
                          <q-separator />
                          <q-card>
                            <q-card-section>
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
                                          <tr v-for="(item, index) in cpdOtherList" :key="item.id">
                                            <td class="text-center"><q-checkbox v-model="articleList" :val='item.id' /></td>
                                              <td class="text-center">{{ item.name }}</td>
                                              <td class="text-center">{{ item.type }}</td>
  
                                              <td class="text-center">{{ item.size }}</td>
                                              <td class="text-center">Rp. {{ item.rate }}</td>
                                              
                                          </tr>
                                      </tbody>
                                  </q-markup-table>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                        <q-separator />
                      </q-list>
                    </div>

                  </q-card-section>
                  <q-separator color="light-blue-7" inset />


                  <q-card-section class="q-mx-md">

                    <p class=" text-bold text-left text-light-blue-10" style="font-size: x-large;">Periode Tayang
                    </p>

                    <div>
                      <div class="row">
                        <div class="col-md-2 q-my-auto">
                          <p class="text-bold text-light-blue-10" style="font-size: large;">From :</p>
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
                          <p class="text-bold text-light-blue-10 q-ml-xl" style="font-size: large;">To :</p>
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
                    <p class=" text-bold text-left text-light-blue-10" style="font-size: x-large;">Metode Pembayaran
                    </p>
                    <div>
                      <p class="text-left text-bold" style="font-size: larger;"> Metode Pembayaran :</p>
                      <div class="q-gutter-sm">
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                          val="cash" label="Cash" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                          val="barter" label="Barter" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                          val="semi" label="Semi Barter" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                          val="kredit" label="Kredit" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                          val="termin" label="Termin" />
                        <q-radio size="lg" dense v-model="pay" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                          val="deposit" label="Deposit" />
                      </div>

                      <div class="q-mt-md">
                        <!-- Your selection is: <strong>{{ pay }}</strong> -->
                        <div v-if="pay == 'cash'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> Total : {{ finalRate }}</p>
                              <q-input prefix="Rp" v-model="finalRate" type="number" :disable="customPrice" outlined dense
                                style="width: 90%;" />

                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="tempo" mask="date" :rules="['date']" dense style="width: 90%;">
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
                              <p class="text-left text-bold" style="font-size: large;"> Nilai Barter :</p>
                              <q-input prefix="Rp" type="number" outlined dense style="width: 90%;" />
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%;">
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
                              <p class="text-left text-bold" style="font-size: large;"> Item Barang :</p>
                              <q-input outlined dense style="width: 90%;" type="textarea"></q-input>
                            </div>
                          </div>

                        </div>
                        <div v-else-if="pay == 'semi'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> Nilai Barter :</p>
                              <q-input prefix="Rp" type="number" outlined dense style="width: 90%;" />
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%;">
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
                              <p class="text-left text-bold" style="font-size: large;"> Nilai Cash :</p>
                              <q-input prefix="Rp" type="number" outlined dense style="width: 90%;" />
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%;">
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
                              <p class="text-left text-bold" style="font-size: large;"> Item Barang :</p>
                              <q-input outlined dense style="width: 90%;" type="textarea"></q-input>
                            </div>
                          </div>

                        </div>
                        <div v-else-if="pay == 'kredit'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> NIlai Kredit :</p>
                              <q-input prefix="Rp" type="number" outlined dense style="width: 90%;" />
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%;">
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
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> Termin 1 :</p>
                              <q-input prefix="Rp" type="number" outlined dense style="width: 90%;" />
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%;">
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
                              <p class="text-left text-bold" style="font-size: large;"> Termin 2 :</p>
                              <q-input prefix="Rp" type="number" outlined dense style="width: 90%;" />
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%;">
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
                              <p class="text-left text-bold" style="font-size: large;"> Termin 3 :</p>
                              <q-input prefix="Rp" type="number" outlined dense style="width: 90%;" />
                              <p class="text-left text-bold" style="font-size: large;"> Jatuh Tempo :</p>
                              <q-input filled v-model="date" mask="date" :rules="['date']" dense style="width: 90%;">
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
                        <div v-else-if="pay == 'deposit'">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> Minimal Bayar / Deposit :</p>
                              <q-input prefix="Rp" v-model="minDeposit" type="number" outlined dense
                                style="width: 90%;" />
                            </div>
                            <div class="col-md-4">
                              <p class="text-left text-bold" style="font-size: large;"> Nilai Deposit :</p>
                              <q-input prefix="Rp" v-model="deposit" type="number" outlined dense style="width: 90%;" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div>
                      <div class="cursor-pointer">

                        <p class="text-left text-bold q-mt-md" style="font-size: larger;"> Diskon : {{ value }} %</p>

                        <q-popup-edit v-model="value" auto-save v-slot="scope">
                          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                        </q-popup-edit>
                      </div>
                      <q-slider class="q-mt-md" v-model="value" :min="0" :max="100" :step="0.01" label label-always
                        color="light-green" />

                    </div>

                    <div>
                    </div>
                    <div class="q-mt-md text-right">
                      <q-btn class="q-mx-md" color="secondary" :disable="submit" label="Create" @click="createOrder" />
                      <q-btn color="secondary" label="Cancel" />
                    </div>
                  </q-card-section>
                </div>


              </q-scroll-area>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-1"></div>
    </div>
  </q-page>
</template>

<script>
import Swal from 'sweetalert2'

import { ref, watch } from 'vue'

let optionsList = []
let mitraListt = []
let networklistt = []

export default {
  setup() {

    const options = ref(optionsList)
    const mitras = ref(mitraListt)
    const network = ref(networklistt)
    const cashPay = ref(null)
    const cashPayFormatted = ref('')


    return {

      value: ref(0),
      options,
      mitras,
      network,

      cashPay,
      cashPayFormatted,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          options.value = optionsList.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterMitra(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          mitras.value = mitraListt.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },

      networkData: ref(null),
      mitraData: ref(null),
      custname: ref(null),
      picName: ref(''),
      picNumber: ref(''),
      custAddress: ref(''),
      custLogo: 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
      token: sessionStorage.getItem('token'),
      sales: ref(null),
      sosmed: ref([]),
      sosmedList: ref([]),
      A1: ref(false),
      A2: ref(false),
      artikel_1: ref(null),
      artikel_2: ref(null),
      camp_name: ref(null),
      prmn: ref(false),
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
      optionsTayang: [
        'PRMN', 'Mitra'
      ],
      article: ref([]),
      articleList: ref([]),
      sosmedOption: ref(null),
      optionsSosmed: [
        'Facebook', 'Instagram', 'Lainnya'
      ],
      rateMeta: ref([]),
      rateSosmedOther: ref([]),
      totalRate: ref(null),
      finalRate: ref(0),
      customPrice: ref(true),
      idArticle: ref([])
    }
  },
  watch: {
    A1(newVal) {
      if (!newVal) {
        this.artikel_1 = null;
      }
    },
    A2(newVal) {
      if (!newVal) {
        this.artikel_2 = null;
      }
    },
    articleList: {
      handler(newVal) {
        const total = newVal.map((item) => this.modelTayang === 'PRMN' ? item.prmn : item.mitra);
        this.totalRate = total.reduce((a, b) => a + b, 0)

        const id = newVal.map((item) => item.id)
        this.idArticle = id

      },
      deep: true,
    },
    modelTayang(newVal) {
      this.articleList = [];
      newVal === 'Mitra' ? this.getMitra() : ''
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
    pay() {
      this.calculateFinalRate();

    },
  },

  mounted() {
    this.getCustomer()
    this.getSosmed()
    this.getDate()
    this.getArticleContent()
  },

  methods: {
    calculateFinalRate() {
      const discountAmount = (this.value / 100) * this.totalRate;
      const finalPrice = this.totalRate - discountAmount;
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
      this.finalRate = formatter.format(finalPrice);
      this.totalRate === 0 ? this.customPrice = false : this.customPrice = true
    },


    getDate() {
      const dateNow = new Date();
      const year = dateNow.getFullYear();
      const month = String(dateNow.getMonth() + 1).padStart(2, '0');
      const day = String(dateNow.getDate()).padStart(2, '0');
      const formattedDate = `${year}/${month}/${day}`;

      this.date = formattedDate;
      this.date2 = formattedDate;
      this.date3 = formattedDate;
      this.tempo = formattedDate;

    },

    updateSelectionArticle(value, item) {

      if (value && item.value !== null) {
        this.articleList.push(item);
      } else {
        const index = this.articleList.indexOf(item);
        if (index !== -1) {
          this.articleList.splice(index, 1);
        }
      }
    },

    async getCustomer() {
      try {
        const response = await this.$api.get("/customer/all", {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        const custName = response.data
        optionsList = custName.map(item => ({ label: item.name, value: item.id }))
        this.options = optionsList

      } catch (error) {
        console.log(error);
      }
    },

    async getDataCustomer() {
      try {
        const response = await this.$api.get(`/customer/${this.custname.value}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.picName = response.data.picName
        this.picNumber = response.data.phone
        this.custAddress = response.data.address

      } catch (error) {
        console.log(error);
      }

    },

    async getArticleContent() {
      const response = await this.$api.get(`/rate-card/article/all`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      this.article = response.data

    },
    async getSosmed() {
      const response = await this.$api.get(`/rate-card/sosmed/all`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.rateMeta = response.data.meta
      this.rateSosmedOther = response.data.other

    },

    async createOrder() {
      const token = sessionStorage.getItem('token')
      const id = sessionStorage.getItem('id')

      const data = {
        idCust: this.custname.value,
        idUser: id,
        SalesType: this.sales,
        camp_name: this.camp_name,
        order_no: '123123',
        order_date: new Date(this.date).toISOString(),
        period_start: new Date(this.date2).toISOString(),
        period_end: new Date(this.date3).toISOString(),
        pay_type: this.pay,
        mediaTayang: this.modelTayang,
        OrderMitra: this.mitraData.map(option => option.value),
        typeRate: 'article',
        rateCard: {
          article: this.idArticle
        }

      }

      if (this.pay === 'cash') {
        data.payment = {

          tempo: new Date(this.tempo).toISOString(),
          diskon: this.value
        }
      }
      if (this.pay === 'deposit') {
        data.payment = {
          deposit: this.deposit,
          minDeposit: this.minDeposit
        }
      }
      console.log(data);
      try {
        this.submit = true
        const response = await this.$api.post(`/order/new`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status == 200) {
          const id = response.data.data.id
          localStorage.setItem('idOrder', id)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/sales/quotation")
        }

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,

        });
        console.log(error);
      } finally {
        this.submit = false
      }

    },
    async getMitra() {
      console.log('mitra jalan');
      try {
        const response = await this.$api.get(`/media/mitra/all/drop`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
      
        mitraListt = response.data.map(item => ({ label: item.name, value: item.id }));
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>
