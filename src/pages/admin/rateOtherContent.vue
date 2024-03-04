<template>
  <q-page>
    <div class="">
      <div class="q-pa-md">
        <div class="">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: large">
                Other Content
              </p>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div class="text-right q-pa-md">
                <q-btn-group>
                  <q-btn color="cyan" icon="add" @click="medium = true" />
                </q-btn-group>
              </div>
              <div>
                <q-markup-table>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Rate</th>
                      <th class="text-center">Note</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in otherList" :key="item.id">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ item.name }}</td>
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
                      <td class="text-center">
                        <q-btn-group>
                          <q-btn color="orange" icon="border_color" @click="trigerEdit(item.id)">
                            <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                              Edit
                            </q-tooltip>
                          </q-btn>
                          <q-btn color="red" icon="delete" @click="DeleteOth(item.id)">
                            <q-tooltip class="bg-red text-body2" :offset="[10, 10]">
                              Hapus
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
    </div>

    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
        <q-scroll-area style="height: 65vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            Tambah Other Content
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="addOtherSosmed">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Nama</span>
                </p>
                <q-input v-model="nama" class="q-my-md" dense outlined label="Nama network" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium; margin-top: 10px">
                  <span class="text-bold" style="font-size: medium">Rate</span>
                </p>
                <p>
                  <span>Custom Price ?</span>
                  <q-toggle v-model="customPrice" color="green" keep-color />
                </p>
                <q-input v-model="rate" class="q-my-md" prefix="Rp" type="number" :disable="customPrice" dense outlined
                  label="Rate" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Note</span>
                </p>
                <q-editor v-model="note" min-height="5rem" />
              </div>
            </div>
            <div class="text-right">
              <q-card-actions align="right">
                <q-btn class="q-mx-sm" type="submit" color="secondary" label="Create" :disable="btn" />
                <q-btn color="black" label="Cancel" v-close-popup />
              </q-card-actions>
            </div>
          </q-form>
        </q-scroll-area>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit">
      <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
        <q-scroll-area style="height: 55vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            Edit Data
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="editOtherSosmed">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Nama</span>
                </p>
                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ nama }}
                      <q-popup-edit v-model="nama" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
                <!-- <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" /> -->
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Rate</span>
                </p>

                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <p>
                      <span>Custom Price ?</span>
                      <q-toggle v-model="customPrice" color="green" keep-color />
                    </p>
                    <div class="cursor-pointer">
                      {{ formatRupiah(rate) }}
                      <q-popup-edit v-model="rate" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>

              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Note</span>
                </p>
                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ note ? note : "-" }}
                      <q-popup-edit buttons v-model="note" v-slot="scope">
                        <q-editor v-model="scope.value" min-height="5rem" autofocus @keyup.enter.stop />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="text-right">
              <q-card-actions align="right">
                <q-btn class="q-mx-sm" type="submit" color="secondary" label="Save" :disable="btn" />
                <q-btn color="black" label="Cancel" v-close-popup />
              </q-card-actions>
            </div>
          </q-form>
        </q-scroll-area>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  setup() {
    return {
      otherList: ref([]),
      current: ref(1),
      totalPage: ref(1),
      medium: ref(false),
      upload: ref(false),
      edit: ref(false),
      btn: ref(false),
      nama: ref(null),
      rate: ref(null),
      customPrice: ref(false),
      note: ref(null),
      id: ref(""),
    };
  },

  mounted() {
    this.getOtherData();
  },
  watch: {
    current(newVal) {
      this.getOtherData();
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

    async addOtherSosmed() {
      const token = sessionStorage.getItem("token");
      if (!this.nama) {
        this.medium = false
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill all the form data",
        });
        return;
      }
      try {
        this.btn = true;
        const data = {
          name: this.nama,
          rate: this.customPrice ? null : parseInt(this.rate),
          note: this.note,
          customPrice: this.customPrice,
        };
        const response = await this.$api.post(
          `/rate-card/other-content/create`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.medium = false
        this.nama = null
        this.rate =null
        this.note = null
        this.customPrice = false
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        (this.medium = false), console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "data gagal disimpan",
        });
      } finally {
        this.btn = false;
        this.getOtherData();
      }
    },
    async getOtherData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`rate-card/other-constent/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.otherList = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getOtherDataById(id) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `rate-card/other-content/get-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.nama = response.data.name;
        this.rate = response.data.rate;
        this.customPrice = response.data.is_custom_price;
        this.note = response.data.note;
      } catch (error) {
        console.log(error);
      }
    },
    async editOtherSosmed() {
      const token = sessionStorage.getItem("token");
      try {
        this.btn = true;
        const data = {
          name: this.nama,
          rate: this.customPrice ? null : parseInt(this.rate),
          note: this.note,
          customPrice: this.customPrice,
        };
        const response = await this.$api.patch(
          `/rate-card/other-content/edit/${this.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          (this.edit = false),
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
        }
      } catch (error) {
        (this.medium = false), console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "data gagal disimpan",
        });
      } finally {
        this.btn = false;
        this.getOtherData();
      }
    },

    trigerEdit(id) {
      this.edit = true;
      this.id = id;
      this.getOtherDataById(id);
    },
    async deleteSosmed(id) {
      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.delete(
          `rate-card/other-content/delete-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        this.getOtherData();
      } catch (error) {
        console.log(error);
      }
    },

    DeleteOth(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteSosmed(id);
        }
      });
    },
  },
};
</script>
