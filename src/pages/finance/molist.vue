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
                    <th class="text-center">Cashback</th>
                    <th class="text-center">Intensive</th>
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
                    <td class="text-center">{{ item.cashBack ? formatRupiah(item.cashBack) : `Rp. 0` }}</td>
                    <td class="text-center">{{ item.intensive ? formatRupiah(item.intensive) : `Rp. 0` }}</td>
                    <td class="text-center">
                      <q-btn-group>

                        <q-btn color="secondary" icon="remove_red_eye" to="/finance/mo" @click="clickBtn(item.idOrder)">
                          <q-tooltip class="bg-secondary text-body2" :offset="[10, 10]">
                            View MO
                          </q-tooltip>
                        </q-btn>
                        <q-btn color="orange" icon="currency_exchange" @click="clickCashBack(item.idOrder)">
                          <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                            Cashback
                          </q-tooltip>
                        </q-btn>
                        <q-btn color="blue" icon="credit_score" @click="clickIntensive(item.idOrder)">
                          <q-tooltip class="bg-blue text-body2" :offset="[10, 10]">
                            Intensif
                          </q-tooltip>
                        </q-btn>
                      </q-btn-group>
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

    <q-dialog v-model="prompt1" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Cashback : {{ Cashback ? formatRupiah(Cashback) : 'Rp.0'}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="Cashback" prefix="Rp" type="number" autofocus @keyup.enter="prompt1 = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add CashBack" v-close-popup @click="addCashBack('cashBack')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="prompt2" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Intensive : {{ Intensif ? formatRupiah(Intensif) : 'Rp.0'}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="Intensif" prefix="Rp" type="number" autofocus @keyup.enter="prompt2 = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Intensive" v-close-popup @click="addCashBack('intensive')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>


<script>
import Swal from 'sweetalert2';
import { ref } from 'vue';


export default {

  setup() {
    return {
      orderList: ref([]),
      current: ref(1),
      totalPage: ref(1),
      prompt1: ref(false),
      Cashback: ref(),
      prompt2: ref(false),
      Intensif: ref(),
      id: ref('')
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
    formatRupiah(value) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(value);
    },

    async getMoData() {
      try {
        const token = sessionStorage.getItem('token')
        const response = await this.$api.get(`quotation/mo/all?pageNumber=${this.current}`, {
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

    async addCashBack(type) {
      try {
        const token = sessionStorage.getItem('token');
        let data = {};

        if (type === 'cashBack') {
          data = {
            cashBack: this.Cashback,
          };
        } else if (type === 'intensive') {
          data = {
            intensive: this.Intensif
          };
        } else {
          throw new Error('Invalid type');
        }

        const response = await this.$api.patch(`quotation/mo/update-cash-intensive/${this.id}`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.Cashback = undefined
        this.Intensif = undefined

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        this.getMoData();
      } catch (error) {
        console.error(error);
      }
    },


    clickBtn(idOrder) {
      sessionStorage.setItem('idMo', idOrder)
    },
    clickCashBack(idOrder) {
      this.prompt1 = true
      this.id = idOrder
    },
    clickIntensive(idOrder) {
      this.prompt2 = true
      this.id = idOrder
    }
  }

}

</script>