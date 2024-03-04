<template>
  <q-page>
    <div class="q-my-md">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <q-card class="full-width">
            <q-card-section>
              <q-scroll-area style="height: 80vh; ">
                <p class="text-center text-bold" style="font-size: large;">MEDIA ORDER</p>
                <p class="text-center text-bold" style="font-size: x-large;">PKB</p>
                <div class="row ">
                  <div class="col-md-8"></div>
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-1">

                        <span class="q-mt-xl" style="font-size: large;">No :</span>
                      </div>
                      <div class="col">
                        <q-input class=" q-ml-md text-bold" dense disable :label="dataMo?.no_mo"
                          style="font-size: large;" />
                      </div>
                    </div>

                  </div>
                </div>
                <q-separator class="q-my-md" color="light-blue-7" inset />
                <div class="row q-my-md">
                  <div class="col-md-6 ">
                    <span class="text-bold q-ml-md" style="font-size: larger;">PEMASANG</span>
                  </div>
                  <div class="col-md-6 ">
                    <span class="text-bold q-ml-md" style="font-size: larger;">PERSON TO CONTACT (PTC)</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-pl-md">
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Nama </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.contact"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Jabatan </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable label="-"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Perusahaan </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.name"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Alamat </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.address"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">NPWP </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.npwp"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Email </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.email"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">contact</span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.contact_phone"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div><br>
                    <span class="text-bold q-mt-xl" style="font-size: large;">Bertindak untuk dan atas nama</span>
                    <div>
                      <div class="row">
                        <div class="col-2">
                          <br>
                          <span style="font-size: large;">Perusahaan </span>
                        </div>
                        <div class="col">
                          <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.name"
                            style="font-size: large; width: 75%;" />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-2">
                          <br>
                          <span style="font-size: large;">Alamat </span>
                        </div>
                        <div class="col">
                          <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.address"
                            style="font-size: large; width: 75%;" />
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="col-6 q-pl-md">
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Nama </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.fincontact"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Jabatan </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable label="-"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Email </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.email"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">NPWP </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable label="-"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Telepon/HP. </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable
                          :label="dataMo?.customer.fincontact_phone" style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Kode Pos </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable label="-"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">No. Fax </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable label="-"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                   
                  </div>
                </div>

                <q-card class="full-width bg-blue-grey-2 q-mt-md">
                  <q-card-section>
                    <p>Saya menyatakan bahwa semua informasi yang di uraikan di atas adalah benar dan dapat
                      dipertanggungjawabkan. Saya telah membaca dan memahami ketentuan dan syarat pemasangan iklan.Saya
                      setuju dan terikat dengan segala persyaratan yang ditentukan oleh PT. ---</p>
                  </q-card-section>
                </q-card>
                <q-separator class="q-my-md" color="light-blue-7" inset />
                <span class="text-bold q-ml-md" style="font-size: x-large">PIKIRAN RAKYAT MEDIA NETWORK</span> <br> <br>

                <div class="row">
                  <div class="col-md-6 q-pl-md">
                    <span class="  q-mt-sm" style="font-size: large;">Dalam hal ini diwakili oleh :</span>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Nama </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.user.name"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Jabatan </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.user.jabatan"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 q-pl-md">
                    <span class="  q-mt-sm" style="font-size: large;">PERSON TO CONTACT (PTC)</span>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Nama </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.user.name"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Jabatan </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.user.jabatan"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Email </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.user.email"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <br>
                        <span style="font-size: large;">Telepon/HP. </span>
                      </div>
                      <div class="col">
                        <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.user.phone"
                          style="font-size: large; width: 75%;" />
                      </div>
                    </div>
                  </div>
                </div>
               
                <q-separator class="q-my-md" color="light-blue-7" inset />
                <span class="text-bold q-ml-md " style="font-size: large">Detail Produk</span>
                <q-markup-table flat bordered style="margin-top: 20px; margin-bottom: 50px;">
                  <thead class="bg-blue-grey-2 text-bold">
                    <tr>

                      <th class="text-center">Spot Promo</th>
                      <th class="text-center">Promo Type</th>
                      <th class="text-center">Detail</th>
                      <th class="text-center">QTY</th>
                      <th class="text-center">Day</th>
                      <th class="text-center">Remaks</th>
                      <th class="text-center">Rate Produk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in dataMo?.data" :key="item.id">
                          <td class="text-center">{{ item?.kategori }}</td>
                          <td class="text-center">{{ item?.produk }}</td>
                          <td class="text-center">{{ dataMo?.camp_name }}</td>
                          <td class="text-center">{{ dataMo?.qty }}</td>
                          <td class="text-center">{{ dataMo?.day }}</td>
                          <td class="text-center">{{ dataMo?.remaks }}</td>
                          <td class="text-center">{{ formatRupiah(parseInt(item?.rate)) }}</td>

                        </tr>


                  </tbody>
                </q-markup-table>

                <q-markup-table class="q-pa-md">
                
                  <tbody>
                    <tr class="text-bold">
                      <td class="text-left">Pola Pembayaran</td>
                      <td class="text-right">{{ dataMo?.type_bayar == 'semi' ? 'Semi Barter' : dataMo?.type_bayar}}</td>

                    </tr>
                    <tr>
                      <td class="text-left">Total Package (Rp)</td>
                      <td class="text-right">{{ formatRupiah(dataMo?.payment.data.finalPrice) }}</td>

                    </tr>
                    <tr>
                      <td class="text-left">Best Price Package (Rp)</td>
                      <td class="text-right">{{ formatRupiah(dataMo?.payment.data.finalPrice) }}</td>

                    </tr>
                    <tr>
                      <td class="text-left">VAT 11% (Rp)</td>
                      <td class="text-right">{{ formatRupiah(((11 * dataMo?.payment.data.finalPrice)) / 100) }}</td>

                    </tr>
                    <tr class="text-bold">
                      <td class="text-left">PAID Incl VAT 11% (Rp)</td>
                      <td class="text-right">{{ formatRupiah(dataMo?.payment.data.finalPrice + ((11 *
                        dataMo?.payment.data.finalPrice) / 100)) }}</td>
                    </tr>
                  </tbody>
                </q-markup-table>

                <div class="q-ml-md q-mt-xl">
                  <div class="row">
                    <div class="col-2">
                      <br>
                      <span style="font-size: medium;">ALAMAT PENAGIHAN </span>
                    </div>
                    <div class="col">
                      <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.address"
                        style="font-size: medium; width: 75%;" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <br>
                      <span style="font-size: medium;">ATAS NAMA </span>
                    </div>
                    <div class="col">
                      <q-input class="q-mt-md q-ml-md text-bold" dense disable :label="dataMo?.customer.name"
                        style="font-size: medium; width: 75%;" />
                    </div>
                  </div>
                </div>
                <q-card class="full-width bg-blue-grey-2 q-mt-md">
                  <q-card-section>
                    <p>*Pembatalan kontrak oleh pemasang sampai dengan 2 (dua) hari sebelum penayangan dikenakan biaya 25%
                      dari harga jual brutto <br>
                      *Jatuh tempo pembayaran secara kredit adalah 30 hari setelah tanggal penayangan <br>
                      *Pembayaran melalui bank di transfer ke Rekening Bank NISP an PT. Kolaborasi Mediapreneur Nusantara,
                      Nomor Rekening : 06680000162-1 <br>
                      *Bukti transfer agar dikirim ke Bagian Finance PT. Kolaborasi Mediapreneur Nusantara
                    </p>
                  </q-card-section>
                </q-card>
                <q-separator class="q-my-md" color="light-blue-7" inset />
                <div class="row q-mt-md">
                  <div class="col-md-4 text-center">
                    <span>PEMASANG</span>
                    <br><br><br><br><br><br>
                    <span>(_______________________________)</span>
                  </div>
                  <div class="col-md-4 text-center">
                    <span>PIKIRAN RAKYAT MEDIA NETWORK</span>
                    <div class="col-md-4 text-center">
                      <span>PEMASANG</span>
                      <br><br><br><br><br>
                      <span>(_______________________________)</span>
                    </div>
                  </div>
                  <div class="col-md-4 text-center">
                    <span>Tanggal</span>
                    <div class="col-md-4 text-center">
                      <span>PEMASANG</span>
                      <br><br><br><br><br>
                      <span>(_______________________________)</span>
                    </div>
                  </div>
                </div>

                <q-card class="full-width bg-blue-grey-2 q-mt-md">
                  <q-card-section>
                    <p>Media Order akan ditindaklanjuti dalam Perjanjian Kerja Sama yang memuat hak & kewajiban antara PT.
                      Kolaborasi Mediapreneur Nusantara dan Pemasang
                    </p>
                  </q-card-section>
                </q-card>

              </q-scroll-area>
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
      shape: ref(['line']),
      bayar: ref('dp'),
      dataMo: ref(),
      data: ref()
    }
  },

  mounted() {
    this.getMoData()
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
        const id = sessionStorage.getItem("idMo")
        const response = await this.$api.get(`/quotation/mo/data/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        this.dataMo = response.data
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
