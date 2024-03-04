<template>
  <q-page>
    <div class="q-pa-md">
      <div class="col-md-10">
        <q-card class="full-width">
          <q-card-section>
            <p class="text-center text-bold" style="font-size: large">REPORT</p>
            <!-- <div class="absolute-right q-gutter-sm q-mt-sm q-mr-xl">
              <q-btn square color="blue" icon="print" />
              <q-btn color="blue" icon="table_view" />
            </div> -->
            <q-separator class="q-my-md" color="light-blue-7" inset />
            <div class="row justify-between items-center">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-4">
                    <div class="col-md-2 q-my-auto">
                      <p
                        class="text-bold text-light-blue-10"
                        style="font-size: large"
                      >
                        From :
                      </p>
                    </div>
                    <div class="col-md-4">
                      <q-input
                        filled
                        v-model="date"
                        mask="date"
                        :rules="['date2']"
                        dense
                        style="width: 90%"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="date" color="cyan">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
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
                      <p
                        class="text-bold text-light-blue-10"
                        style="font-size: large"
                      >
                        To :
                      </p>
                    </div>
                    <div class="col-md-4">
                      <q-input
                        filled
                        v-model="date2"
                        mask="date"
                        :rules="['date2']"
                        dense
                        style="width: 90%"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="date2" color="cyan">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
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
              <div class="q-gutter-xs items-center">
                <q-btn color="red" icon="picture_as_pdf" @click="exportToPDF">
                  <q-tooltip class="bg-red text-body2" :offset="[10, 10]">
                    Export ke PDF
                  </q-tooltip>
                </q-btn>
                <q-btn color="green" icon="table_view" @click="exportToExcel">
                  <q-tooltip class="bg-green text-body2" :offset="[10, 10]">
                    Export ke Excel
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div>
              <q-markup-table ref="myTable">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">Client</th>
                    <th class="text-center">Campaign</th>
                    <th class="text-center">Tanggal Order</th>
                    <th class="text-center">No Quotation</th>
                    <th class="text-center">Mitra</th>
                    <th class="text-center">Media Tayang</th>
                    <th class="text-center">No MO</th>
                    <th class="text-center">Periode</th>
                    <th class="text-center">OTI</th>
                    <th class="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataList" :key="item.idOrder">
                    <td class="text-left">{{ index + 1 }}</td>
                    <td class="text-center">{{ item.client }}</td>
                    <td class="text-center">{{ item.campaign }}</td>
                    <td class="text-center">{{ item.tgl_order }}</td>
                    <td class="text-center">{{ item.noQuo }}</td>
                    <td class="text-center">
                      <p v-for="(mitra, index) in item.mitra">{{ mitra }}</p>
                    </td>
                    <td class="text-center">{{ item.media_tayang }}</td>
                    <td class="text-center">{{ item.noMo }}</td>
                    <td class="text-center">
                      {{ item.period_start }} - {{ item.period_end }}
                    </td>
                    <td class="text-center">{{ item.oti }}</td>
                    <td
                      class="text-center"
                      :class="{
                        'text-red': !item.status,
                        'text-green': item.status,
                      }"
                    >
                      {{ item.status ? "Open" : "Close" }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default {
  setup() {
    return {
      date: ref(),
      date2: ref(),
      filter: ref(null),
      optionsfilter: [
        "Client",
        "Mitra",
        "Quotation",
        "OTI",
        "Media Tayang",
        "Status",
      ],
      dataList: ref([]),
      current: 1,
      totalPage: 1,
      token: sessionStorage.getItem("token"),
    };
  },
  mounted() {
    this.getDate();
    this.getMoData();
  },
  watch: {
    date(newVal) {
      this.getMoData();
    },
    date2(newVal) {
      this.getMoData();
    },
  },
  methods: {
    exportToPDF() {
      // Akses elemen tabel HTML menggunakan $refs
      const table = this.$refs.myTable.$el.querySelector("table");

      // Sekarang Anda bisa menggunakan tabel HTML ini untuk membangun autoTable
      const doc = new jsPDF({
        orientation: "l",
      });
      doc.autoTable({
        html: table,
      });
      doc.save("report.pdf");
    },
    exportToExcel() {
      const table = this.$refs.myTable.$el.querySelector("table");
      const wsData = [[]]; // Data untuk lembar kerja Excel

      // Mendapatkan baris judul dari tabel
      const headerRows = table.querySelectorAll("thead tr");
      headerRows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("th").forEach((cell) => {
          rowData.push(cell.textContent.trim());
        });
        wsData.push(rowData);
      });

      // Mendapatkan data dari seluruh baris dalam tabel
      const dataRows = table.querySelectorAll("tbody tr");
      dataRows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell) => {
          rowData.push(cell.textContent.trim());
        });
        wsData.push(rowData);
      });

      // Membuat lembar kerja Excel dari data yang diperoleh
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const wscols = [
        { wch: 3 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 30 },
        { wch: 30 },
        { wch: 5 },
      ];
      ws["!cols"] = wscols;

      // Menyimpan file Excel
      XLSX.writeFile(wb, "report.xlsx");
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

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
    async getMoData() {
      try {
        const id = sessionStorage.getItem("id");
        const response = await this.$api.get(
          `/oti/report?from=${this.date}&to=${this.date2}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.dataList = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
