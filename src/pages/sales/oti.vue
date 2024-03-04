<template>
  <q-page>
    <div class="q-pa-md">
      <div class="">

        <div class="">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: x-large;">ORDER TAYANG IKLAN</p>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div>
                <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-4">
                    <div class="col-md-2 q-my-auto">
                      <p class="text-bold text-light-blue-10" style="font-size: large;">From :</p>
                    </div>
                    <div class="col-md-4">
                      <q-input filled v-model="date" mask="date" :rules="['date2']" dense style="width: 90%;">
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
                  <div class="col-md-4">
                    <div class="col-md-2 q-my-auto">
                      <p class="text-bold text-light-blue-10" style="font-size: large;">To :</p>
                    </div>
                    <div class="col-md-4">
                      <q-input filled v-model="date2" mask="date" :rules="['date2']" dense style="width: 90%;">
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
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-6 text-left">
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
              </div> -->
            </div>
                <q-markup-table separator="cell" flat bordered>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-center">Client</th>
                      <th class="text-center">Tanggal Order</th>
                      <th class="text-center">Periode</th>
                      <th class="text-center">No Mo</th>
                      <th class="text-center">Product</th>
                      <th class="text-center">Sub</th>
                      <th class="text-center">OTI</th>
                      <th class="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in otiList" :key="item.idOrder">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.client }}</td>
                      <td>{{ item.tgl_order }}</td>
                      <td>{{ item.period_start }} - {{ item.period_end }}</td>
                      <td>{{ item.noMo }}</td>
                      <td>{{ item.product }}</td>
                      <td>{{ item.sub }}</td>
                      <td>{{ item.oti }}</td>
                      <td>
                        <q-btn :hidden="item.tayang == false" :key="`btn_size_dense_round_md`" round dense color="green"
                          :size="size" icon="perm_media" @click="clickBtnImage(item.file_bukti_tayang)" />
                        {{ item.tayang ? "Tayang" : "On Progress" }}
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
                <!-- <div class="q-pa-lg flex flex-center">
                  <q-pagination v-model="current" :max="totalPage" input />
                </div> -->
              </div>
            </q-card-section>
          </q-card>

        </div>

      </div>

    </div>
  </q-page>

  <q-dialog v-model="carousel">
    <q-card style="width: 90%; max-width: 80vw;">
      <q-card-section>
        <q-img :src="`${url}/image/${file}`" />

      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  
</template>

<script>
import { ref } from 'vue';


export default {

  setup() {
    return {
      otiList: ref([]),
      current: 1,
      totalPage: 1,
      lastIdOrder: null,
      rowIndex: 1,
      carousel: ref(false),
      url: ref(''),
      file: ref(''),
      date: ref(),
      date2: ref(),
    }
  },

  mounted() {
    this.getDate()
    this.getMoData()
    this.url = import.meta.env.VITE_BASE_URL
  },
  watch: {
    date(newVal) {
      this.getMoData()
    },
    date2(newVal) {
      this.getMoData()
    },
    current(newVal) {
      this.getMoData()
    },

  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}/${month}/${day}`;
    },

    getDate() {
      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() - 30); // set to 30 days ago

      this.date = this.formatDate(dateNow);

      // for date2, we use today's date
      const dateNow2 = new Date();

      this.date2 = this.formatDate(dateNow2); // this will be today's date in the same format
    },

    countIdOrder(idOrder) {
      return this.otiList.filter(item => item.idOrder === idOrder).length;
    },

    getRowIndex(index) {
      if (this.shouldShowIndex(index)) {
        return this.rowIndex++;
      }
    },
    shouldShowIndex(index) {
      return index === 0 || this.otiList[index - 1].idOrder !== this.otiList[index].idOrder;
    },
    async getMoData() {
      try {
        const id = sessionStorage.getItem("id")
        const response = await this.$api.get(`/oti/report-user/${id}?pageNumber=${this.current}&from=${this.date}&to=${this.date2}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        console.log(response.data);
        this.otiList = response.data
        this.current = response.data.pageNumber
        this.totalPage = response.data.totalPage
        this.rowIndex = 1;

      } catch (error) {
        console.log(error);
      }

    },

    clickBtn(idOrder) {
      sessionStorage.setItem('idMo', idOrder)
    },
    
    clickBtnImage(file) {
     this.file = file
     this.carousel = true
    }
  }

}

</script>