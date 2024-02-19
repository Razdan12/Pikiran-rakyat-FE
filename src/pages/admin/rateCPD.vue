<template>
  <q-page>
    <div class="">
      <div class="q-pa-md">
        <div class="">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: large">
                Display Ads / Banner CPD
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
                      <th class="text-center">Type</th>
                      <th class="text-center">Size</th>
                      <th class="text-center">Home</th>
                      <th class="text-center">Detail</th>
                      <th class="text-center">Section</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cpdDisplayList" :key="item.id">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ item.name }}</td>
                      <td class="text-center">{{ item.type }}</td>

                      <td class="text-center">{{ item.size }}</td>
                      <td class="text-center">
                        {{ item.rate_home ? formatRupiah(item.rate_home) : '-' }}
                      </td>
                      <td class="text-center">
                        {{ item.rate_detail ? formatRupiah(item.rate_detail) : '-' }}
                      </td>
                      <td class="text-center">
                        {{ item.rate_section ? formatRupiah(item.rate_section) : '-' }}
                      </td>
                      <td class="text-center">
                        <q-btn-group>
                          <q-btn color="orange" icon="border_color" @click="trigerEdit(item.id, 'display')">
                            <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                              Edit
                            </q-tooltip>
                          </q-btn>
                          <q-btn color="red" icon="delete" @click="DeleteCpd(item.id)">
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
        <q-scroll-area style="height: 70vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            Tambah Display Ads / Banner CPD
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="addDisplayAds">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Nama</span>
                </p>
                <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Type</span>
                </p>
                <q-select dense outlined v-model="type" :options="typeOption" label="Type" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium; margin-top: 10px">
                  <span class="text-bold" style="font-size: medium">Size</span>
                </p>
                <q-input v-model="size" class="q-my-md" dense outlined label="Size" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Rate Home</span>
                </p>
                <q-input v-model="home" class="q-my-md" prefix="Rp" type="number" dense outlined label="Rate Home" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Rate Detail</span>
                </p>
                <q-input v-model="detail" class="q-my-md" prefix="Rp" type="number" dense outlined label="Rate Detal" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Rate Section</span>
                </p>
                <q-input v-model="section" class="q-my-md" prefix="Rp" type="number" dense outlined
                  label="Rate Section" />
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
        <q-scroll-area style="height: 70vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            Edit Ads
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="editCpd">
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
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Size</span>
                </p>
                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ size }}
                      <q-popup-edit v-model="size" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Home</span>
                </p>
                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ formatRupiah(home) }}
                      <q-popup-edit v-model="home" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Detail</span>
                </p>

                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ formatRupiah(detail) }}
                      <q-popup-edit v-model="detail" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">Section</span>
                </p>

                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ formatRupiah(section) }}
                      <q-popup-edit v-model="section" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="text-right">
              <q-card-actions align="right">
                <q-btn class="q-mx-sm" type="submit" color="secondary" label="Submit" :disable="btn" />
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
      cpdDisplayList: ref([]),
      cpdOtherList: ref([]),
      current: ref(1),
      totalPage: ref(1),
      medium: ref(false),
      upload: ref(false),
      edit: ref(false),
      editOther: ref(false),
      btn: ref(false),
      nama: ref(null),
      type: ref(null),
      typeOption: ["Desktop", "Mobile", "Mobile AMP", "Site"],
      typeOption2: ["Mobile AMP", "Site"],
      size: ref(null),
      home: ref(null),
      detail: ref(null),
      section: ref(null),
      other: ref(false),

      id: ref(""),
    };
  },

  mounted() {
    this.getMitraData();
  },
  watch: {
    current(newVal) {
      this.getMitraData();
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

    async addDisplayAds() {
      const token = sessionStorage.getItem("token");
      if(!this.nama ){
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
          type: this.type,
          size: this.size,
          home: parseInt(this.home),
          detail: parseInt(this.detail),
          section: parseInt(this.section),
        };
        const response = await this.$api.post(
          `rate-card/cpd/create/display`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          this.medium = false;
          this.resetForm();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        }
      } catch (error) {
        this.medium = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid",
        });
      } finally {
        this.btn = false;
      }
    },

    async getMitraData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`/rate-card/cpd/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.cpdDisplayList = response.data;

      } catch (error) {
        console.log(error);
      }
    },

    async getCpdById(id) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`/rate-card/cpd/get-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.nama = response.data.name;
        this.size = response.data.size;
        this.home = response.data.rate_home;
        this.detail = response.data.rate_detail;
        this.section = response.data.rate_section;

      } catch (error) {
        console.log(error);
      }
    },

    async editCpd() {
      const data = {
        name: this.nama,
        size: this.size,
        home: parseInt(this.home),
        detail: parseInt(this.detail),
        section: parseInt(this.section),
        rate: parseInt(this.rate),
      };
      const token = sessionStorage.getItem("token");
      try {
        this.btn = true;

        const response = await this.$api.patch(
          `rate-card/cpd/edit-by-id/${this.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          this.edit = false;
          this.editOther = false;
          this.resetForm();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getMitraData();
        }
      } catch (error) {
        this.edit = false;
        this.editOther = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid",
        });
      } finally {
        this.btn = false;
      }
    },
    async deleteCpd(id) {
      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.delete(
          `rate-card/cpd/delete-by-id/${id}`,
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
        this.getMitraData();
      } catch (error) {
        console.log(error);
      }
    },

    DeleteCpd(id) {
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
          this.deleteCpd(id);
        }
      });
    },

    trigerEdit(id, type) {
      type === "other" ? (this.editOther = true) : (this.edit = true);
      this.getCpdById(id);
      this.id = id;
    },
    resetForm() {
      (this.nama = null),
        (this.size = null),
        (this.home = null),
        (this.detail = null),
        (this.section = null),
        (this.rate = null);
    },
  },
};
</script>
