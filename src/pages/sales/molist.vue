<template>
  <q-page>
    <div class="q-pa-md">
    
      <div class="">
        <q-card class="full-width">
          <q-card-section>
            <p class="text-center text-bold" style="font-size: large;">MEDIA ORDER </p>
            <q-separator class="q-my-md" color="light-blue-7" inset />
            <div>
              <q-markup-table>
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">Client</th>
                    <th class="text-center">Tanggal Order</th>
                    <th class="text-center">No Quotation</th>
                    <th class="text-center">Periode</th>
                    <th class="text-center">Media Order</th>
                    <th class="text-center">action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderList" :key="item.idOrder">
                    <td class="text-left">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.client_name }}</td>
                    <td class="text-center">{{ item.tgl_order }}</td>
                    <td class="text-center">{{ item.no_quo }}</td>
                    <td class="text-center">{{ item.period_start }} - {{ item.period_end }}</td>
                    <td class="text-center">{{ item.media_order }}</td>
                    <td class="text-center">
                      <q-btn color="secondary" label="MO" to="/sales/mo" @click="clickBtn(item.idOrder)" />
                    </td>
                  </tr>

                </tbody>
              </q-markup-table>
              <div class="q-pa-lg flex flex-center">
                <q-pagination  v-model="current" :max="totalPage" input />
              </div>
            </div>

          </q-card-section>
        </q-card>

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
      totalPage: ref(1)
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
        const id = sessionStorage.getItem("id")
        const response = await this.$api.get(`quotation/mo/by-user/${id}?pageNumber=${this.current}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.orderList = response.data.data
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