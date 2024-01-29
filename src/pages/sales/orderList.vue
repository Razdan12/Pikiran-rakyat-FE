<template>
  <q-page>
    <div class="q-my-md">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: large;">LIST ORDER</p>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div class="text-right q-pa-md">
                <q-btn color="secondary" label="TAMBAH" to="/sales/order" />
              </div>
              <div>
                <q-markup-table>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-center">Client</th>
                      <th class="text-center">Tanggal Order</th>
                      <th class="text-center">Campaign Name</th>
                      <th class="text-center">No Order</th>
                      <th class="text-center">Produk</th>
                      <!-- <th class="text-center">action</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in orderList" :key="item.idOrder">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ item.customer.name }}</td>
                      <td class="text-center">{{ item.order_date }}</td>
                      <td class="text-center">{{ item.camp_name }}</td>
                      <td class="text-center">{{ item.order_no }}</td>
                      <td class="text-center">
                        <p v-for="(Item, index) in item.produk" :key="index">{{ Item.name }} </p>
                      </td>
                      <!-- <td class="text-center">
                        <q-btn color="secondary" label="MO" to="/sales/mo" @click="clickBtn(item.idOrder)" />
                      </td> -->
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
        <div class="col-md-1"></div>
      </div>

    </div>
  </q-page>

</template>


<script>
import { ref } from 'vue';


export default {

  setup() {
    return {
      orderList: ref([]),
      current: ref(1),
      totalPage: ref(1),
      medium: ref(false),
    }
  },

  mounted() {
    this.getMoData()
  },
  watch: {
    current(newVal) {
      this.getMoData()
    },

  },
  methods: {
    async getMoData() {
      try {
        const token = sessionStorage.getItem('token')
        const response = await this.$api.get(`order/data?pageNumber=${this.current}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.orderList = response.data.dataOrder
        this.current = response.data.pageNumber
        this.totalPage = response.data.totalPage

      } catch (error) {
        console.log(error);
      }

    },

    clickBtn(idOrder) {
      sessionStorage.setItem('idMo', idOrder)
    }
  }

}

</script>