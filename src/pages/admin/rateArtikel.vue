<template>
    <q-page>
        <div class="q-my-md">
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
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
                                            <td class="text-center">{{ item.is_custom_price_prmn ? 'Custom Price' :
                                                'Rp.' + item.prmn }}</td>
                                            <td class="text-center">{{ item.is_custom_price_mitra ? 'Custom Price' :
                                                'Rp.' + item.mitra }}</td>
                                            <td class="text-center">{{ item.note }}</td>
                                            <td class="text-center">
                                                <q-btn-group>
                                                    <q-btn color="orange" icon="border_color">
                                                        <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                                                            Edit
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
                        Tambah Article
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="addArticle">
                        <div class="col">
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium"> Nama</span>
                                </p>
                                <q-input v-model="nama" class="q-my-md" dense outlined label="Nama" />
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate PRMN</span>

                                </p>
                                <p>
                                    <span>Custom Price ?</span>
                                    <q-toggle v-model="prmn" color="green" keep-color />
                                </p>

                                <q-input v-model="pricePrmn" prefix="Rp" type="number" class="q-my-md" dense outlined
                                    label="rate" :disable="prmn" />
                            </div>
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">Rate Mitra</span>
                                </p>
                                <p>
                                    <span>Custom Price ?</span>
                                    <q-toggle v-model="mitra" color="green" keep-color />
                                </p>
                                <q-input v-model="priceMitra" class="q-my-md" prefix="Rp" type="number" dense outlined
                                    label="rate" :disable="mitra" />
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
                <q-scroll-area style="height: 39vh" class="q-pa-sm">
                    <p class="text-center text-bold" style="font-size: x-large">
                        EDIT NETWORK
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <q-form @submit.prevent="addNetwork">
                        <div class="col">
                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium"> Nama</span>
                                </p>
                                <div class="cursor-pointer text-bold" style="margin-bottom: 20px">
                                    {{ nama == null ? dataNetwork.name : nama }}
                                    <q-popup-edit v-model="nama" v-slot="scope">
                                        <q-input color="blue" v-model="scope.value" dense autofocus counter
                                            @keyup.enter="scope.set">
                                            <template v-slot:append>
                                                <q-icon name="edit" />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </div>

                            <div>
                                <p class="text-bold text-blue" style="font-size: medium">
                                    <span class="text-bold" style="font-size: medium">
                                        Status</span>
                                </p>
                                <div>
                                    <label for="">Non Aktif</label>
                                    <q-toggle v-model="dataNetwork.status" checked-icon="check" color="green"
                                        unchecked-icon="clear" />
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
        <q-dialog v-model="upload">
            <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
                <q-scroll-area style="height: 55vh" class="q-pa-sm">
                    <p class="text-center text-bold" style="font-size: x-large">
                        UPLOAD MITRA
                    </p>
                    <q-separator class="q-my-lg" color="orange" inset />
                    <div class="text-left" style="margin-bottom: 10px">
                        <q-btn class="q-mx-sm" type="submit" color="secondary" icon="cloud_download" />
                    </div>
                    <div class="">
                        <q-uploader url="http://localhost:4444/upload" label="No thumbnails" color="amber"
                            text-color="black" no-thumbnails style="width: 650px; height: 300px" />
                    </div>

                    <div class="text-right">
                        <q-card-actions align="right">
                            <q-btn color="black" label="Cancel" v-close-popup />
                        </q-card-actions>
                    </div>
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
            pricePrmn: ref(null),
            priceMitra: ref(null),
            note: ref(null),
            prmn: ref(false),
            mitra: ref(false)
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
        async addArticle() {
            const token = sessionStorage.getItem("token");
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
                const response = await this.$api.post(`/rate-card/article/create`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    this.resetForm()
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

        resetForm() {
            this.medium = false
            this.nama = null,
                this.priceMitra = null,
                this.pricePrmn = null,
                this.note = null,
                this.prmn = false,
                this.mitra = false
        },
    },
};
</script>
