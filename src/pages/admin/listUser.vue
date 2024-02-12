<template>
  <q-page>
    <div class="">
      <div class="q-pa-md">
        <div class="">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: large">
                Daftar Pengguna
              </p>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div class="text-right q-pa-md">
                <q-btn color="cyan" icon="add" @click="medium = true" />
              </div>
              <div>
                <q-markup-table>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Email</th>
                      <th class="text-center">Role</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in userList" :key="item.id">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center cursor-pointer" @click="idUser = item.id">
                        {{ item.name }}
                        <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                          Edit Nama
                        </q-tooltip>
                        <q-popup-edit v-model="namaEdit" v-slot="scope">
                          <q-input autofocus dense v-model="scope.value" :model-value="scope.value" hint="Your Name"
                            :rules="[
                              (val) =>
                                scope.validate(val) ||
                                'More than 5 chars required',
                            ]">
                            <template v-slot:after>
                              <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel" />

                              <q-btn flat dense color="positive" icon="check_circle" @click.stop.prevent="scope.set" />
                            </template>
                          </q-input>
                        </q-popup-edit>
                      </td>
                      <td class="text-center">
                        {{ item.email }}
                      </td>
                      <td class="text-center">{{ item.role }}</td>
                      <td class="text-center">
                        <q-btn-group>
                          <q-btn color="blue" icon="vpn_key" @click="reset(item.id)">
                            <q-tooltip class="bg-blue text-body2" :offset="[10, 10]">
                              Reset Password
                            </q-tooltip>
                          </q-btn>
                          <q-btn color="red" icon="delete" @click="Delete(item.id)">
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
            TAMBAH PENGGUNA
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="addRole">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Nama</span>
                </p>
                <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">
                    Email</span>
                </p>
                <q-input v-model="email" class="q-my-md" dense outlined label="Email" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">
                    Password</span>
                </p>
                <q-input v-model="password" class="q-my-md" dense outlined label="Password" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">
                    Jabatan</span>
                </p>
                <q-input v-model="jabatan" class="q-my-md" dense outlined label="Jabatan" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium">
                    Nomor Handphone</span>
                </p>
                <q-input v-model="phone" type="number" class="q-my-md" dense outlined label="Nomor Handphone" />
              </div>

              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <span class="text-bold" style="font-size: medium"> Role</span>
                </p>
                <q-select outlined v-model="role" :options="roleList" label="Role" emit-value map-options />
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
    <q-dialog v-model="resetPassword" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Reset Password</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="password"  autofocus @keyup.enter="prompt1 = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Reset" v-close-popup @click="resetPass()" />
        </q-card-actions>
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
      userList: ref([]),
      current: ref(1),
      totalPage: ref(1),
      medium: ref(false),
      resetPassword: ref(false),
      edit: ref(false),
      nama: ref(),
      email: ref(),
      password: ref(),
      role: ref(),
      roleList: ref([]),
      btn: ref(false),
      namaEdit: ref(),
      idUser: ref(),
      jabatan : ref(),
      phone: ref()
    };
  },

  mounted() {
    this.getUserData();
    this.getRole();
  },
  watch: {
    current(newVal) {
      this.getCustData();
    },
    namaEdit(newVal) {
      this.editUser(this.idUser, newVal);
    },
  },
  methods: {
    async addRole() {
      const token = sessionStorage.getItem("token");
      const data = {
        name: this.nama,
        email: this.email,
        password: this.password,
        repassword: this.password,
        role_id: this.role,
        jabatan: this.jabatan,
        phone: this.phone
      };
      if(!this.nama || !this.email || !this.password || !this.role ){
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill all the form data",
        });
        return;
      }
      try {
        this.btn = true;
        const response = await this.$api.post("/user/register", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const status = response.status;
        if (status == 200) {
          this.medium = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.resetForm();
          window.location.reload();
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

    resetForm() {
      (this.nama = null),
        (this.email = null),
        (this.password = null),
        (this.role = null);
    },
    async getUserData() {
      const token = sessionStorage.getItem("token");
      try {

        const response = await this.$api.get(`/user/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.userList = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getRole() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(`/role`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.roleList = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async editUser(id, data) {
      const token = sessionStorage.getItem("token");
      const dataRest = {
        name: data,
      };
      try {
        const response = await this.$api.patch(
          `/user/edit-by-id/${id}`,
          dataRest,
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
        this.getUserData();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser(id) {
      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.delete(`user/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.getUserData()
      } catch (error) {
        console.log(error);
      }
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
          this.deleteUser(id)
        }
      });
    },

    reset(id){
      this.resetPassword = true
      this.idUser = id
    },
    async resetPass(){
      const token = sessionStorage.getItem("token");
      const data = {
        password : this.password
      }
      
      try {
        const response = await this.$api.patch(
          `/user/reset-password-user/${this.idUser}`,
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
        this.getUserData();
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
