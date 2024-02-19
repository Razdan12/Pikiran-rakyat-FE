<template>
  <q-page>
    <div class="q-pa-md">
      <div class="">
        <q-card class="full-width">
          <q-card-section>
            <p class="text-center text-bold" style="font-size: large">
              Rate Article Content
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
                    <th class="text-center">Rate PRMN</th>
                    <th class="text-center">Rate Mitra</th>
                    <th class="text-center">Note</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in articleList" :key="item.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">{{ item.name }}</td>
                    <td class="text-center">
                      {{
                        item.is_custom_price_prmn
                          ? "Custom Price"
                          : formatRupiah(item.prmn)
                      }}
                    </td>
                    <td class="text-center">
                      {{
                        item.is_custom_price_mitra
                          ? "Custom Price"
                          : formatRupiah(item.mitra)
                      }}
                    </td>
                    <td class="text-center">{{ item.note }}</td>
                    <td class="text-center">
                      <q-btn-group>
                        <q-btn
                          color="orange"
                          icon="border_color"
                          @click="openEdit(item.id)"
                        >
                          <q-tooltip
                            class="bg-orange text-body2"
                            :offset="[10, 10]"
                          >
                            Edit
                          </q-tooltip>
                        </q-btn>
                        <q-btn
                          color="red"
                          icon="delete"
                          @click="DeleteArt(item.id)"
                        >
                          <q-tooltip
                            class="bg-red text-body2"
                            :offset="[10, 10]"
                          >
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

    <q-dialog v-model="medium">
      <q-card
        style="width: 700px; max-width: 80vw"
        class="justify-center q-pa-md"
      >
        <q-scroll-area style="height: 70vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            Tambah Article
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="addArticle">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Nama</span>
                </p>
                <q-input
                  v-model="nama"
                  class="q-my-md"
                  dense
                  outlined
                  label="Nama"
                />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"
                    >Rate PRMN</span
                  >
                </p>
                <p>
                  <span>Custom Price ?</span>
                  <q-toggle v-model="prmn" color="green" keep-color />
                </p>

                <q-input
                  v-model="pricePrmn"
                  prefix="Rp"
                  type="number"
                  class="q-my-md"
                  dense
                  outlined
                  label="rate"
                  :disable="prmn"
                />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"
                    >Rate Mitra</span
                  >
                </p>
                <p>
                  <span>Custom Price ?</span>
                  <q-toggle v-model="mitra" color="green" keep-color />
                </p>
                <q-input
                  v-model="priceMitra"
                  class="q-my-md"
                  prefix="Rp"
                  type="number"
                  dense
                  outlined
                  label="rate"
                  :disable="mitra"
                />
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
                <q-btn
                  class="q-mx-sm"
                  type="submit"
                  color="secondary"
                  label="Create"
                  :disable="btn"
                />
                <q-btn color="black" label="Cancel" v-close-popup />
              </q-card-actions>
            </div>
          </q-form>
        </q-scroll-area>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit">
      <q-card
        style="width: 700px; max-width: 80vw"
        class="justify-center q-pa-md"
      >
        <q-scroll-area style="height: 70vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            Edit Article
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="editArticle">
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
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          counter
                          @keyup.enter="scope.set"
                        />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
                <!-- <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" /> -->
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"
                    >Rate PRMN</span
                  >
                </p>
                <p>
                  <span>Custom Price ?</span>
                  <q-toggle v-model="prmn" color="green" keep-color />
                </p>

                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ formatRupiah(pricePrmn) }}
                      <q-popup-edit
                        v-model="pricePrmn"
                        auto-save
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          counter
                          @keyup.enter="scope.set"
                        />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"
                    >Rate Mitra</span
                  >
                </p>
                <p>
                  <span>Custom Price ?</span>
                  <q-toggle v-model="mitra" color="green" keep-color />
                </p>
                <div class="" style="margin-bottom: 20px">
                  <q-card class="my-card q-pa-sm" flat bordered>
                    <div class="cursor-pointer">
                      {{ formatRupiah(pricePrmn) }}
                      <q-popup-edit
                        v-model="priceMitra"
                        auto-save
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          counter
                          @keyup.enter="scope.set"
                        />
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
                      {{ note }}
                      <q-popup-edit buttons v-model="note" v-slot="scope">
                        <q-editor
                          v-model="scope.value"
                          min-height="5rem"
                          autofocus
                          @keyup.enter.stop
                        />
                      </q-popup-edit>
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="text-right">
              <q-card-actions align="right">
                <q-btn
                  class="q-mx-sm"
                  type="submit"
                  color="secondary"
                  label="Create"
                  :disable="btn"
                />
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
      articleList: ref([]),
      current: ref(1),
      totalPage: ref(1),
      medium: ref(false),
      upload: ref(false),
      edit: ref(false),
      btn: ref(false),
      nama: ref(null),
      pricePrmn: ref(),
      priceMitra: ref(),
      note: ref(),
      prmn: ref(false),
      mitra: ref(false),
      idArticel: ref(),
    };
  },

  mounted() {
    this.getArticleData();
  },
  watch: {
    current(newVal) {
      this.getArticleData();
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

    async addArticle() {
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
          prmn: this.prmn ? null : parseInt(this.pricePrmn),
          mitra: this.mitra ? null : parseInt(this.priceMitra),
          note: this.note,
          customPricePrmn: this.prmn,
          customPriceMitra: this.mitra,
        };
        const response = await this.$api.post(
          `/rate-card/article/create`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          this.resetForm();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getArticleData();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid",
        });
      } finally {
        this.btn = false;
      }
    },
    async getArticleData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`rate-card/article/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.articleList = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getArticleById(id) {
      const token = sessionStorage.getItem("token");
      try {
        this.btn = true;
        const response = await this.$api.get(`rate-card/article/by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.nama = response.data.name;
        this.priceMitra = response.data.mitra;
        this.pricePrmn = response.data.prmn;
        this.note = response.data.note;
      } catch (error) {
        console.log(error);
      } finally {
        this.btn = false;
      }
    },

    async editArticle() {
      const token = sessionStorage.getItem("token");
      const data = {
        name: this.nama,
        prmn: parseInt(this.pricePrmn),
        mitra: parseInt(this.priceMitra),
        note: this.note,
        customPricePrmn: this.prmn,
        customPriceMitra: this.mitra,
      };
      try {
        const response = await this.$api.patch(
          `rate-card/article/edit-by-id/${this.idArticel}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        this.resetForm();
        this.edit = false;
        this.getArticleData();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteArticle(id) {
      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.delete(
          `rate-card/article/delete/${id}`,
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
        this.getArticleData();
      } catch (error) {
        console.log(error);
      }
    },

    DeleteArt(id) {
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
          this.deleteArticle(id);
        }
      });
    },

    openEdit(id) {
      this.edit = true;
      this.getArticleById(id);
      this.idArticel = id;
    },

    resetForm() {
      this.medium = false;
      (this.nama = null),
        (this.priceMitra = null),
        (this.pricePrmn = null),
        (this.note = null),
        (this.prmn = false),
        (this.mitra = false);
    },
  },
};
</script>
