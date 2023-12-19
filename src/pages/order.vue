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

                <q-separator color="light-blue-7" inset />
                <q-card-section class="q-mx-md">
                  <p class="q-my-md  text-bold text-left text-light-blue-10" style="font-size: x-large;">Input Media Order
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
                        <div class="col-md-4 ">
                          <div>
                            <q-checkbox class="text-light-blue-10" style="font-size: large;" v-model="prmn"
                              val="pikiran-rakyat.com" label="PikiranRakyat.com" keep-color color="light-blue-10" />
                          </div>


                        </div>
                        <div class="col-md-4">
                          <div>
                            <q-select outlined use-chips v-model="networklist" multiple :options="networkOption"
                              label="Network" style="width: 300px;" />

                          </div>

                        </div>
                        <div class="col-md-4">
                          <q-select outlined use-chips v-model="mitralist" multiple :options="mitraOption" label="Mitra"
                            style="width: 300px;" />
                        </div>
                      </div>
                    </div>
                    <q-list>
                      <q-expansion-item class="text-left text-bold text-light-blue-10" popup icon="newspaper"
                        label="Articles" style="font-size: larger;">
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            <div class="row">
                              <q-checkbox class="text-light-blue-10" v-model="A1" checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye" val="A1.1" label="Article & Content"
                                style="font-size: large;" />
                              <q-input class="q-mx-xl text-center" v-model.number="artikel_1" type="number" dense
                                style="max-width:100px" :disable="!A1" placeholder="0" />

                              <q-checkbox class="ttext-light-blue-10" v-model="A2" checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye" val="A1.2" label="Article & Content Network"
                                style="font-size: large;" />
                              <q-input class="q-mx-xl text-center" v-model.number="artikel_2" type="number" dense
                                style="max-width:100px" :disable="!A2" placeholder="0" />
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item class="text-left text-bold text-light-blue-10" popup icon="subscriptions"
                        label="Social Media" style="font-size: larger;">
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            <div class="flex ">
                              <div v-for="(item, index) in sosmed" :key="index" style="width: 30%;">
                                <q-checkbox class="text-light-blue-10" v-model="item.selected"
                                  @update:model-value="value => updateSelection(value, item.value)" :label="item.label"
                                  style="font-size: large;" />
                              </div>
                            </div>

                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item class="text-left text-bold text-light-blue-10" popup icon="ads_click"
                        label="Display Ads" style="font-size: larger;">
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            <span class="item-label">Number: </span>
                            <q-numeric>123213123</q-numeric>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
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
                            <p class="text-left text-bold" style="font-size: large;"> Total :</p>
                            <q-input prefix="Rp" v-model="cashPay" type="number" outlined dense style="width: 90%;" />
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
                            <q-input prefix="Rp" v-model="minDeposit" type="number" outlined dense style="width: 90%;" />
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
                    <p class="text-left text-bold q-mt-md" style="font-size: larger;"> Diskon : {{ value }} %</p>
                    <q-slider class="q-mt-md" v-model="value" :min="0" :max="100" :step="1" label label-always
                      color="light-green" />

                  </div>
                  <p>{{ date }} ini date</p>
                  <div>
                  </div>
                  <div class="q-mt-md text-right">
                    <q-btn class="q-mx-md" color="secondary" label="Create" @click="createOrder" />
                    <q-btn color="secondary" label="Cancel" />
                  </div>
                </q-card-section>

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
import { ref } from 'vue'

let optionsList = []

export default {
  setup() {
    const options = ref(optionsList)

    return {

      sales: ref(),

      type1: ref(true),
      type2: ref(false),
      type3: ref(false),
      type4: ref(false),
      type5: ref(false),
      type6: ref(false),
      type7: ref(false),
      type8: ref(false),
      type9: ref(false),
      type10: ref(false),
      type11: ref(false),


      network: ref(false),
      mitra: ref(false),
      model: ref(null),

      value: ref(0),

      pay: ref(),
      options1: [
        'Cash', 'Barter'
      ],
      options2: [
        '30%', '40%', '50%', '100%'
      ],
      dmitra: ref([]),
      dnetwork: ref([]),

      options,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          options.value = optionsList.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },


      custname: ref(null),
      picName: ref(''),
      picNumber: ref(''),
      custAddress: ref(''),
      custLogo: 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
      token: sessionStorage.getItem('token'),
      networklist: ref(null),
      networkOption: ref([]),
      mitraOption: ref([]),
      mitralist: ref(null),
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
      cashPay: ref(null)


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

  },

  mounted() {
    this.getCustomer()
    this.getMediaTayang()
    this.getDate()
  },

  methods: {
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
    
    updateSelection(value, id) {
      console.log(value, id);
      if (value && id !== null) {
        this.sosmedList.push(id);
      } else {
        const index = this.sosmedList.indexOf(id);
        if (index !== -1) {
          this.sosmedList.splice(index, 1);
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

    async getMediaTayang() {
      try {
        const response = await this.$api.get(`/order`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        if (response.data.network) {
          this.networkOption = response.data.network.map(item => ({ label: item.name, value: item.id }));
        }
        if (response.data.mitra) {
          this.mitraOption = response.data.mitra.map(item => ({ label: item.name, value: item.id }));
        }
        if (response.data.sosmed) {
          this.sosmed = response.data.sosmed.map(item => ({ label: item.name, value: item.id, selected: false }));
        }
      } catch (error) {
        console.error(error);
      }
    },

    async createOrder() {
      const token = sessionStorage.getItem('token')

      const data = {
        idCust: this.custname.value,
        SalesType: this.sales,
        camp_name: this.camp_name,
        order_no: '123123',
        order_date: new Date(this.date).toISOString(),
        mtPikiranRakyat: this.prmn,
        period_start: new Date(this.date2).toISOString(),
        period_end: new Date(this.date3).toISOString(),
        pay_type: this.pay,
        OrderNetwork: this.networkOption.map(option => option.value),
        OrderMitra: this.mitraOption.map(option => option.value),
        OrderSosmed: this.sosmedList,
        OrderArtikel: {
          artikel_1: this.artikel_1,
          artikel_2: this.artikel_2
        },
      }

      if (this.pay === 'cash') {
        data.payment = {
          total: 12341411,
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
      try {
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
          this.$router.push("/quotation")
        }

      } catch (error) {
        console.log(error);
      }

    }
  },
}
</script>
