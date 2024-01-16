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
                                <q-btn color="cyan" icon="add" @click="medium = true"/>
                                
                            </div>
                            <div>
                                <q-markup-table>
                                    <thead>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th class="text-center">Name</th>
                                            <th class="text-center">Email</th>
                                            <th class="text-center">Role</th>
                                            <th class="text-center">Status</th>
                                            <th class="text-center">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="(item, index) in custList" :key="item.id">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ item.custname }}</td>
                                            <td class="text-center">
                                                <q-toggle v-model="fourth" checked-icon="check" color="green"
                                                    unchecked-icon="clear" />
                                            </td>
                                            <td class="text-center">-</td>
                                            <td class="text-center">-</td>
                                            <td class="text-center">
                                                <q-btn-group>
                                                    <q-btn color="orange" icon="border_color" />
                                                    <q-btn color="blue" icon="vpn_key" />
                                                    <q-btn color="red" icon="delete" />
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
                <q-scroll-area style="height: 49vh" class="q-pa-sm">
                    <p class="text-center text-bold" style="font-size: x-large">
                        TAMBAH PENGGUNA
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="addCustomer">
                        <div class="col">
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">
                                        Nama</span>
                                </p>
                                <q-input v-model="phoneNumber" class="q-my-md" dense outlined label="Nama network" />
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">
                                        Keterangan</span>
                                </p>
                                <q-input v-model="companyNPWP" class="q-my-md" dense outlined label="Keterangan" />
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">
                                        Status</span>
                                </p>
                                <div>
                                    <label for="">Non Aktif</label>
                                    <q-toggle v-model="fourth" checked-icon="check" color="green" unchecked-icon="clear" />
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
            custList: ref([]),
            current: ref(1),
            totalPage: ref(1),
            medium: ref(false),
            customerName: ref(null),
            contactName: ref(null),
            phoneNumber: ref(null),
            companyEmail: ref(null),
            companyNPWP: ref(null),
            companyAdress: ref(null),
            finNameContact: ref(null),
            finPhone: ref(null),
            type: ref(null),
            btn: ref(false),
            fourth: ref(true)
        };
    },

    mounted() {
        this.getCustData()
    },
    watch: {
        current(newVal) {
            this.getCustData()
        },

    },
    methods: {

        async addCustomer() {
            let formData = new FormData()
            formData.append('name', this.customerName)
            formData.append('type', this.type)
            formData.append('contact', this.contactName)
            formData.append('phone', this.phoneNumber)
            formData.append('email', this.companyEmail)
            formData.append('npwp', this.companyNPWP)
            formData.append('address', this.companyAdress)
            formData.append('fincontact', this.finNameContact)
            formData.append('fincontact_phone', this.finPhone)


            const token = sessionStorage.getItem('token')
            try {
                this.btn = true
                const response = await this.$api.post("/customer/add", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
                }

                // status ? this.$router.push("/order") : ""

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
            this.type = null
            this.customerName = null
            this.contactName = null
            this.phoneNumber = null
            this.companyEmail = null
            this.companyNPWP = null
            this.companyAdress = null
            this.finNameContact = null
            this.finPhone = null

        },
        async getCustData() {
            const token = sessionStorage.getItem("token")
            try {
                const response = await this.$api.get(`/customer/cust?pageNumber=${this.current}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.custList = response.data.data
                this.current = response.data.pageNumber
                this.totalPage = response.data.totalPage

            } catch (error) {
                console.log(error);
            }

        },
    },
};
</script>
