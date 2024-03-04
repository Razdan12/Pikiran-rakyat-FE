<template>
    <q-page>
        <div class="">
            <div class="q-pa-md">

                <div class="col-md-10">
                    <q-card class="full-width">
                        <q-card-section>
                            <p class="text-center text-bold" style="font-size: large">
                                Rate META
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
                                            <th class="text-center">Instagram</th>
                                            <th class="text-center">Facebook</th>
                                            <th class="text-center">Note</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in metaList" :key="item.id">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ item.name }}</td>
                                            <td class="text-center">{{ item.instagram ? formatRupiah(item.instagram) : '-'
                                            }}</td>
                                            <td class="text-center">{{ item.facebook ? formatRupiah(item.facebook) : '-' }}
                                            </td>
                                            <td class="text-center">
                                                {{ item.note }}
                                            </td>
                                            <td class="text-center">
                                                <q-btn-group>
                                                    <q-btn color="orange" icon="border_color"
                                                        @click="editMetaTriger(item.id)">
                                                        <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                                                            Edit
                                                        </q-tooltip>
                                                    </q-btn>
                                                    <q-btn color="red" icon="delete" @click="DeleteSos(item.id)">
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
            <div class="q-pa-md" style="margin-top: 20px">

                <div class="col-md-10">
                    <q-card class="full-width">
                        <q-card-section>
                            <p class="text-center text-bold" style="font-size: large">
                                Other Sosmed
                            </p>
                            <q-separator class="q-my-md" color="light-blue-7" inset />
                            <div class="text-right q-pa-md">
                                <q-btn-group>
                                    <q-btn color="cyan" icon="add" @click="other = true" />
                                </q-btn-group>
                            </div>
                            <div>
                                <q-markup-table>
                                    <thead>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th class="text-center">Name</th>
                                            <th class="text-center">Type</th>
                                            <th class="text-center">Rate</th>
                                            <th class="text-center">Note</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in otherList" :key="item.id">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ item.name }}</td>
                                            <td class="text-center">{{ item.type }}</td>
                                            <td class="text-center">{{ item.is_custom_price ? 'Custom Price' :
                                                formatRupiah(item.rate) }}</td>

                                            <td class="text-center">
                                                {{ item.note }}
                                            </td>
                                            <td class="text-center">
                                                <q-btn-group>
                                                    <q-btn color="orange" icon="border_color"
                                                        @click="editOtherTriger(item.id)">
                                                        <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                                                            Edit
                                                        </q-tooltip>
                                                    </q-btn>
                                                    <q-btn color="red" icon="delete" @click="DeleteSos(item.id)">
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
                        Tambah Meta
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="addMeta">
                        <div class="col">
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium"> Nama</span>
                                </p>
                                <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" />
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate Instagram</span>
                                </p>
                                <q-input v-model="instagram" class="q-my-md" prefix="Rp" type="number" dense outlined
                                    label="Instagram" />
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate Facebook</span>
                                </p>
                                <q-input v-model="facebook" class="q-my-md" prefix="Rp" type="number" dense outlined
                                    label="Facebook" />
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
        <q-dialog v-model="other">
            <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
                <q-scroll-area style="height: 70vh" class="q-pa-sm">
                    <p class="text-center text-bold" style="font-size: x-large">
                        Tambah Other Sosmed
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="addOther">
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
                                <p class="text-bold text-blue" style="font-size: medium; margin-top: 10px;">
                                    <span class="text-bold" style="font-size: medium">Rate</span>
                                </p>
                                <p>
                                    <span>Custom Price ?</span>
                                    <q-toggle v-model="customPrice" color="green" keep-color />
                                </p>
                                <q-input v-model="rate" class="q-my-md" prefix="Rp" type="number" :disable="customPrice"
                                    dense outlined label="Rate" />
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
        <q-dialog v-model="editOther">
            <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
                <q-scroll-area style="height: 50vh" class="q-pa-sm">
                    <p class="text-center text-bold" style="font-size: x-large">
                        Edit Sosmed
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="editMetaRest">
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
                                <!-- <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" /> -->
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

                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Note</span>
                                </p>
                                <div class="" style="margin-bottom: 20px;">
                                    <q-card class="my-card q-pa-sm" flat bordered>

                                        <div class="cursor-pointer">
                                            {{ note ? note : '-' }}
                                            <q-popup-edit buttons v-model="note" v-slot="scope">
                                                <q-editor v-model="scope.value" min-height="5rem" autofocus
                                                    @keyup.enter.stop />
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
        <q-dialog v-model="editMeta">
            <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
                <q-scroll-area style="height: 60vh" class="q-pa-sm">
                    <p class="text-center text-bold" style="font-size: x-large">
                        Edit Sosmed
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="editMetaRest">
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
                                <!-- <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" /> -->
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate Facebook</span>

                                </p>

                                <div class="" style="margin-bottom: 20px;">
                                    <q-card class="my-card q-pa-sm" flat bordered>

                                        <div class="cursor-pointer">
                                            {{ formatRupiah(facebook) }}
                                            <q-popup-edit v-model="facebook" auto-save v-slot="scope">
                                                <q-input v-model="scope.value" dense autofocus counter
                                                    @keyup.enter="scope.set" />
                                            </q-popup-edit>
                                        </div>
                                    </q-card>
                                </div>
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate Instagram</span>
                                </p>

                                <div class="" style="margin-bottom: 20px;">
                                    <q-card class="my-card q-pa-sm" flat bordered>

                                        <div class="cursor-pointer">
                                            {{ formatRupiah(instagram) }}
                                            <q-popup-edit v-model="instagram" auto-save v-slot="scope">
                                                <q-input v-model="scope.value" dense autofocus counter
                                                    @keyup.enter="scope.set" />
                                            </q-popup-edit>
                                        </div>
                                    </q-card>
                                </div>
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Note</span>
                                </p>
                                <div class="" style="margin-bottom: 20px;">
                                    <q-card class="my-card q-pa-sm" flat bordered>

                                        <div class="cursor-pointer">
                                            {{ note ? note : '-' }}
                                            <q-popup-edit buttons v-model="note" v-slot="scope">
                                                <q-editor v-model="scope.value" min-height="5rem" autofocus
                                                    @keyup.enter.stop />
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
            metaList: ref([]),
            otherList: ref([]),
            current: ref(1),
            totalPage: ref(1),
            medium: ref(false),
            editMeta: ref(false),
            editOther: ref(false),
            other: ref(false),
            btn: ref(false),
            nama: ref(null),
            instagram: ref(null),
            facebook: ref(null),
            note: ref(null),
            type: ref(null),
            typeOption: ["Youtube", "Placement On Program", "Tiktok", "X | Thread"],
            rate: ref(null),
            customPrice: ref(false),
            idSosmed: ref('')
        };
    },

    mounted() {
        this.getRateSosmedData();
    },
    watch: {
        current(newVal) {
            this.getMitraData();
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

        async addMeta() {
            const token = sessionStorage.getItem("token");
            if (!this.nama) {
                this.other = false
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
                    instagram: parseInt(this.instagram),
                    facebook: parseInt(this.facebook),
                    note: this.note,
                };
                const response = await this.$api.post(`/rate-card/sosmed/create/meta`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response) {
                    this.medium = false
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    window.location.reload()
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
        async editMetaRest() {
            const token = sessionStorage.getItem("token");
            try {
                this.btn = true;
                const data = {
                    name: this.nama,
                    instagram: parseInt(this.instagram),
                    facebook: parseInt(this.facebook),
                    rate: parseInt(this.rate),
                    note: this.note,
                };
                const response = await this.$api.patch(`/rate-card/sosmed/edit-by-id/${this.idSosmed}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response) {
                    this.medium = false
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.editMeta = false
                    this.editOther = false
                    this.getRateSosmedData()
                }
            } catch (error) {
                this.medium = false
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "gagal menyimpan data",
                });
            } finally {
                this.resetForm()
                this.btn = false;
            }
        },
        async addOther() {
            const token = sessionStorage.getItem("token");
            if (!this.nama || !this.type || !this.rate) {
                this.other = false
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
                    rate: this.customPrice ? null : parseInt(this.rate),
                    note: this.note,
                    customPrice: this.customPrice,
                };

                const response = await this.$api.post(`/rate-card/sosmed/create/other`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response) {
                    this.other = false
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    window.location.reload()
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
        async getRateSosmedData() {
            const token = sessionStorage.getItem("token");
            try {
                const response = await this.$api.get(`rate-card/sosmed/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.metaList = response.data.meta;
                this.otherList = response.data.other;

            } catch (error) {
                console.log(error);
            }
        },
        async getSosmedById(id) {
            const token = sessionStorage.getItem("token");
            try {
                const response = await this.$api.get(`rate-card/sosmed/get-by-id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.nama = response.data.name
                this.facebook = response.data.facebook
                this.instagram = response.data.instagram
                this.rate = response.data.rate
                this.note = response.data.note



            } catch (error) {
                console.log(error);
            }
        },

        editMetaTriger(id) {
            this.editMeta = true
            this.getSosmedById(id)
            this.idSosmed = id
        },
        editOtherTriger(id) {
            this.editOther = true
            this.getSosmedById(id)
            this.idSosmed = id
        },
        resetForm() {
            this.nama = null
            this.facebook = null
            this.instagram = null
            this.rate = null
            this.note = null
        },

        async deleteSosmed(id) {
            try {
                const token = sessionStorage.getItem("token");
                const response = await this.$api.delete(`rate-card/sosmed/delete-by-id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                this.getRateSosmedData()
            } catch (error) {
                console.log(error);
            }
        },

        DeleteSos(id) {
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
                    this.deleteSosmed(id)
                }
            });
        },
    },

};
</script>
