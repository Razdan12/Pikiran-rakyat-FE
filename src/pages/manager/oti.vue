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
                      <td v-if="shouldShowIndex(index)" :rowspan="countIdOrder(item.idOrder)">
                        {{ getRowIndex(index) }}
                      </td>
                      <td v-if="!index || otiList[index - 1].idOrder !== item.idOrder"
                        :rowspan="countIdOrder(item.idOrder)">
                        {{ item.client }}
                      </td>
                      <td v-if="!index || otiList[index - 1].idOrder !== item.idOrder"
                        :rowspan="countIdOrder(item.idOrder)">
                        {{ item.tgl_order }}
                      </td>
                      <td v-if="!index || otiList[index - 1].idOrder !== item.idOrder"
                        :rowspan="countIdOrder(item.idOrder)">
                        {{ item.period_start }} - {{ item.period_end }}
                      </td>
                      <td v-if="!index || otiList[index - 1].idOrder !== item.idOrder"
                        :rowspan="countIdOrder(item.idOrder)">
                        {{ item.noMo }}
                      </td>

                      <td>{{ item.product }}</td>
                      <td>{{ item.sub }}</td>
                      <td>{{ item.oti }}</td>
                      <td>
                        <q-btn :hidden="item.tayang == false" :key="`btn_size_dense_round_md`" round dense color="green"
                          :size="size" icon="perm_media" @click="clickBtnImage(item.file_bukti_tayang)" />
                        {{ item.tayang ? 'Tayang' : "On Progress" }}
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
                <div class="q-pa-lg flex flex-center">
                  <q-pagination v-model="current" :max="totalPage" input />
                </div>
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
      file: ref('')
    }
  },

  mounted() {
    this.getMoData()
    this.url = import.meta.env.VITE_BASE_URL
  },
  watch: {
    current(newVal) {
      this.getMoData()
    },

  },
  methods: {
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
       
        const response = await this.$api.get(`/oti?pageNumber=${this.current}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
       
        this.otiList = response.data.data
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