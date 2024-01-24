<template>
    <q-page>
        <div class="q-my-md">
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
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
                                            <td class="text-center">{{ item.name }}</td>
                                            <td class="text-center">
                                                {{ item.email }}
                                            </td>
                                            <td class="text-center">{{ item.role }}</td>
                                            <td class="text-center">
                                                <q-btn-group>
                                                    <q-btn color="orange" icon="border_color">
                                                        <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                                                            Edit
                                                        </q-tooltip>
                                                    </q-btn>
                                                    <q-btn color="blue" icon="vpn_key">
                                                        <q-tooltip class="bg-blue text-body2" :offset="[10, 10]">
                                                            Reset Password
                                                        </q-tooltip>
                                                    </q-btn>
                                                    <q-btn color="red" icon="delete">
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
                <div class="col-md-1"></div>
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
                                    <span class="text-bold" style="font-size: medium">
                                        Nama</span>
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
                                        Role</span>
                                </p>
                                <q-select outlined v-model="role" :options="roleList" label="Role" emit-value  map-options />
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
            userList: ref([]),
            current: ref(1),
            totalPage: ref(1),
            medium: ref(false),
            nama: ref(null),
            email: ref(null),
            password: ref(null),
            role: ref(null),
            roleList: ref([]),
            btn: ref(false),

        };
    },

    mounted() {
        this.getUserData()
        this.getRole()
    },
    watch: {
        current(newVal) {
            this.getCustData()
        },

    },
    methods: {

        async addRole() {
           
            const token = sessionStorage.getItem('token')
            const data = {
                name: this.nama,
                email : this.email,
                password : this.password,
                repassword: this.password,
                role_id: this.role
            }
            try {
                this.btn = true
                const response = await this.$api.post("/user/register", data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const status = response.status
                if (status == 200) {
                    this.medium = false
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.resetForm()
                    window.location.reload()
                }


            } catch (error) {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "invalid",

                });
            } finally {
                this.btn = false
            }
        },

        resetForm() {
           this.nama = null,
           this.email = null,
           this.password = null,
           this.role = null

        },
        async getUserData() {
            const token = sessionStorage.getItem("token")
            try {
                const response = await this.$api.get(`/user/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.userList = response.data

            } catch (error) {
                console.log(error);
            }

        },
        async getRole() {
            const token = sessionStorage.getItem("token")
            try {
                const response = await this.$api.get(`/role`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                this.roleList = response.data

            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>
