<template>
  <q-page>
    <div class="">
      <div class="q-pa-md">
        <div class="">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: large">
                List Mitra
              </p>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div class="text-right q-pa-md flex items-center justify-between">
                <q-input v-model="search" debounce="500" filled placeholder="Search" style="margin-right: 10px">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <div>
                  <q-btn-group>
                    <q-btn color="cyan" icon="add" @click="medium = true">
                      <q-tooltip class="bg-cyan text-body2" :offset="[10, 10]">
                        Tambah Mitra
                      </q-tooltip>
                    </q-btn>
                    <!-- <q-btn color="green" icon="cloud_upload" @click="upload = true" /> -->
                  </q-btn-group>
                </div>
              </div>
              <div>
                <q-markup-table>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Status</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in mitraList" :key="item.id">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ item.name }}</td>
                      <td class="text-center">
                        {{ item.status ? "Aktif" : "Non Aktif" }}
                      </td>
                      <td class="text-center">
                        <q-btn-group>
                          <q-btn color="orange" icon="border_color" @click="EditMitraTriger(item.id , item.name, item.status)">
                            <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                              Edit Mitra
                            </q-tooltip>
                          </q-btn>
                          <q-btn color="red" icon="delete" @click="Delete(item.id)">
                            <q-tooltip class="bg-red text-body2" :offset="[10, 10]">
                              Hapus Mitra
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
        <q-scroll-area style="height: 39vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            TAMBAH MITRA
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="addMitra">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Nama</span>
                </p>
                <q-input v-model="nama" class="q-my-md" dense outlined label="Nama network" />
              </div>

              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">
                    Status</span>
                </p>
                <div>
                  <label for="">Non Aktif</label>
                  <q-toggle v-model="status" checked-icon="check" color="green" unchecked-icon="clear" />
                  <label for="">Aktif</label>
                </div>
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
        <q-scroll-area style="height: 39vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            TAMBAH MITRA
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="EditMitra">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Nama</span>
                </p>
                <q-input v-model="nama" class="q-my-md" dense outlined label="Nama network" />
              </div>

              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">
                    Status</span>
                </p>
                <div>
                  <label for="">Non Aktif</label>
                  <q-toggle v-model="status" checked-icon="check" color="green" unchecked-icon="clear" />
                  <label for="">Aktif</label>
                </div>
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
  </q-page>
</template>

<script>
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  setup() {
    return {
      mitraList: ref([]),
      current: ref(1),
      totalPage: ref(1),
      medium: ref(false),
      upload: ref(false),
      edit: ref(false),
      btn: ref(false),
      fourth: ref(true),
      nama: ref(null),
      status: ref(false),
      search: ref(null),
      idMitra: ref('')
    };
  },

  mounted() {
    this.getMitraData();
  },
  watch: {
    current(newVal) {
      this.getMitraData();
    },
    search(newVal) {
      if (!newVal) {
        this.getMitraData();
      } else {
        this.findMitra(this.search);
      }
    },
  },
  methods: {
    async addMitra() {
      const token = sessionStorage.getItem("token");
      if(!this.nama || !this.status){
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
          status: this.status,
        };
        const response = await this.$api.post(`/order/create/mitra`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          (this.medium = false), (this.nama = null), (this.status = false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        this.getMitraData()
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
    async getMitraData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `media/mitra/all?pageNumber=${this.current}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.mitraList = response.data.data;
        this.current = response.data.pageNumber;
        this.totalPage = response.data.totalPage;
      } catch (error) {
        console.log(error);
      }
    },
    async findMitra(value) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`media/mitra/find-by-name`, {
          params: {
            name: value,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.mitraList = response.data;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMitra(id) {
      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.delete(`media/mitra/delete-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.getMitraData()
      } catch (error) {
        console.log(error);
      }
    },
    async EditMitra(id) {
      try {
        const token = sessionStorage.getItem("token");
        const data = {
          name: this.nama,
          status: this.status,
        };
        const response = await this.$api.patch(`order/edit-mitra/${this.idMitra}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        (this.edit = false), (this.nama = null), (this.status = false);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        this.getMitraData()
      } catch (error) {
        console.log(error);
      }
    },
    EditMitraTriger(id, nama, status){
    
      this.idMitra = id
      this.edit = true
      this.nama = nama
      this.status = status
    },

    Delete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteMitra(id)
        }
      });
    },
  },
};
</script>
