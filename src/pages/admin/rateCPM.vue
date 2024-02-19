<template>
    <q-page>
        <div class="">
            <div class="q-pa-md">
                <div class="">
                    <q-card class="full-width">
                        <q-card-section>
                            <p class="text-center text-bold" style="font-size: large">
                                Display Ads / Banner CPM
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
                                            <th class="text-center">Rate</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in cpmList" :key="item.id">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ item.name }}</td>
                                            <td class="text-center">{{ item.type }}</td>

                                            <td class="text-center">{{ item.size }}</td>
                                            <td class="text-center">{{ formatRupiah(item.rate) }}</td>
                                            <td class="text-center">
                                                <q-btn-group>
                                                    <q-btn color="orange" icon="border_color" @click="trigerEdit(item.id)">
                                                        <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                                                            Edit
                                                        </q-tooltip>
                                                    </q-btn>
                                                    <q-btn color="red" icon="delete" @click="DeleteCpm(item.id)">
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
                        Tambah Ads CPM
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="addCpmData">
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
                                <q-select dense outlined v-model="type" :options="typeOption2" label="Type" />
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium; margin-top: 10px;">
                                    <span class="text-bold" style="font-size: medium">Size</span>
                                </p>
                                <q-input v-model="size" class="q-my-md" dense outlined label="Size" />
                            </div>

                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate</span>
                                </p>
                                <q-input v-model="rate" class="q-my-md" prefix="Rp" type="number" dense outlined
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
                <q-scroll-area style="height: 50vh" class="q-pa-sm">
                    <p class="text-center text-bold" style="font-size: x-large">
                        Edit Ads
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="editCpm">
                        <div class="col">
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium"> Nama</span>
                                </p>
                                <div class="" style="margin-bottom: 20px;">
                                    <q-card class="my-card q-pa-sm" flat bordered>

                                        <div class="cursor-pointer">
                                            {{ nama }}
                                            <q-popup-edit v-model="nama" auto-save v-slot="scope">
                                                <q-input v-model="scope.value" dense autofocus counter
                                                    @keyup.enter="scope.set" />
                                            </q-popup-edit>
                                        </div>
                                    </q-card>
                                </div>

                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium"> Size</span>
                                </p>
                                <div class="" style="margin-bottom: 20px;">
                                    <q-card class="my-card q-pa-sm" flat bordered>

                                        <div class="cursor-pointer">
                                            {{ size ? size : '-' }}
                                            <q-popup-edit v-model="size" auto-save v-slot="scope">
                                                <q-input v-model="scope.value" dense autofocus counter
                                                    @keyup.enter="scope.set" />
                                            </q-popup-edit>
                                        </div>
                                    </q-card>
                                </div>

                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate</span>

                                </p>
                                <div class="" style="margin-bottom: 20px;">
                                    <q-card class="my-card q-pa-sm" flat bordered>

                                        <div class="cursor-pointer">
                                            {{ formatRupiah(rate) }}
                                            <q-popup-edit v-model="rate" auto-save v-slot="scope">
                                                <q-input v-model="scope.value" dense autofocus counter
                                                    @keyup.enter="scope.set" />
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
            cpmList: ref([]),
            current: ref(1),
            totalPage: ref(1),
            medium: ref(false),
            upload: ref(false),
            edit: ref(false),
            btn: ref(false),
            nama: ref(null),
            size: ref(null),
            rate: ref(null),
            type: ref(null),
            typeOption2: ["Mobile AMP", "Desktop", "Mobile"],
            id: ref('')


        };
    },

    mounted() {
        this.getCpmData();
    },
    watch: {
        current(newVal) {
            this.getCpmData();
        },
    },
    methods: {

        formatRupiah(value) {
            const formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            })
            return formatter.format(value)
        },

        async addCpmData() {
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
                    type: this.type,
                    size: this.size,
                    rate: parseInt(this.rate),

                };
                const response = await this.$api.post(`/rate-card/cpm/create`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response) {
                    this.medium = false
                    this.resetForm()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.getCpmData()
                }
            } catch (error) {
                this.medium = false
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "gagal menyimpan data",
                });
            } finally {
                this.btn = false;
            }
        },

        async getCpmData() {
            const token = sessionStorage.getItem("token");
            try {
                const response = await this.$api.get(
                    `rate-card/cpm/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                this.cpmList = response.data

            } catch (error) {
                console.log(error);
            }
        },
        async getCpmById(id) {
            const token = sessionStorage.getItem("token");
            try {
                const response = await this.$api.get(
                    `/rate-card/cpm/get-by-id/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                this.nama = response.data.name
                this.size = response.data.size
                this.rate = response.data.rate

            } catch (error) {
                console.log(error);
            }
        },
        async editCpm() {
            const data = {
                name: this.nama,
                size: this.size,
                rate: parseInt(this.rate),
            }
            const token = sessionStorage.getItem("token");
            try {
                this.btn = true;

                const response = await this.$api.patch(`rate-card/cpm/edit-by-id/${this.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response) {
                    this.edit = false
                    this.resetForm()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.getCpmData()
                }
            } catch (error) {
                this.edit = false

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "invalid",
                });
            } finally {
                this.btn = false;
            }

        },
        async deleteCpm(id) {
            try {
                const token = sessionStorage.getItem("token");
                const response = await this.$api.delete(`rate-card/cpm/delete-by-id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                this.getCpmData()
            } catch (error) {
                console.log(error);
            }
        },

        DeleteCpm(id) {
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
                    this.deleteCpm(id)
                }
            });
        },

        trigerEdit(id) {
            this.edit = true
            this.getCpmById(id)
            this.id = id
        },



        resetForm() {
            this.nama = null,
                this.type = null,
                this.rate = null,
                this.size = null
        }
    },
};
</script>
  