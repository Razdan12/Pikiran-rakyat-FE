<template>
  <q-page>
    <div class="q-pa-md">
      <div class="">
        <q-card class="full-width">
          <q-card-section>
            <p class="text-center text-bold" style="font-size: large">
              CUSTOMER LIST
            </p>
            <q-separator class="q-my-md" color="light-blue-7" inset />
            <div class="text-right q-pa-md">
              <q-btn color="secondary" label="TAMBAH" @click="medium = true" />
            </div>
            <div class="q-pa-md">
              <q-markup-table style="">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Contact Name</th>
                    <th class="text-center">Phone</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Address</th>
                    <th class="text-center">Finance Name</th>
                    <th class="text-center">Finance Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in custList" :key="item.id">
                    <td class="text-left">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.custname }}</td>
                    <td class="text-center">{{ item.contactName }}</td>
                    <td class="text-center">{{ item.phone }}</td>
                    <td class="text-center">{{ item.email }}</td>
                    <td class="text-center">{{ item.address }}</td>
                    <td class="text-center">{{ item.finName }}</td>
                    <td class="text-center">{{ item.finContact }}</td>
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
      <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
        <q-scroll-area style="height: 70vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            CUSTOMER FORM
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="addCustomer">
            <div class="col">
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="business" />
                  <span> Customer Type</span>
                </p>

                <q-card class="bg-light-blue-1 text-center text-bold" flat>
                  <q-card-section>
                    <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                      val="AGENCY" label="AGENCY" style="font-size: larger" />
                    <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                      val="BRAND" label="BRAND" style="font-size: larger" />
                    <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                      val="COMPANY" label="COMPANY" style="font-size: larger" />
                    <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                      val="FREELANCER" label="FREELANCER" style="font-size: larger" />
                  </q-card-section>
                </q-card>
              </div>
              <div class="q-mt-md">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="portrait" />
                  <span class="text-bold" style="font-size: medium">
                    Customer Name</span>
                </p>
                <q-input v-model="customerName" class="q-my-md" dense outlined label="Customer Name" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="portrait" />
                  <span class="text-bold" style="font-size: medium">
                    Contact Name</span>
                </p>
                <q-input v-model="contactName" class="q-my-md" dense outlined label="Contact Name" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="local_phone" />
                  <span class="text-bold" style="font-size: medium">
                    Contact Phone Number</span>
                </p>
                <q-input v-model="phoneNumber" class="q-my-md" dense outlined label="Contact Phone Number" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="email" />
                  <span class="text-bold" style="font-size: medium">
                    Company Email</span>
                </p>
                <q-input v-model="companyEmail" class="q-my-md" dense outlined label="Company Email" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="numbers" />
                  <span class="text-bold" style="font-size: medium">
                    Company NPWP</span>
                </p>
                <q-input v-model="companyNPWP" class="q-my-md" dense outlined label="Company NPWP"
                  mask="##.###.###.#-###.###" fill-mask />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="home_filled" />
                  <span class="text-bold" style="font-size: medium">
                    Company Address</span>
                </p>
                <q-input v-model="companyAdress" class="q-my-md" dense outlined label="Company Address" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="portrait" />
                  <span class="text-bold" style="font-size: medium">
                    Finance Contact Name (Optional)</span>
                </p>
                <q-input v-model="finNameContact" class="q-my-md" dense outlined label="Finance Contact Name" />
              </div>
              <div>
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="local_phone" />
                  <span class="text-bold" style="font-size: medium">
                    Finance Phone Number</span>
                </p>
                <q-input v-model="finPhone" class="q-my-md" dense outlined label="Finance Phone Number" />
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
      customerName: ref(),
      contactName: ref(),
      phoneNumber: ref('-'),
      companyEmail: ref(),
      companyNPWP: ref('-'),
      companyAdress: ref('-'),
      finNameContact: ref('-'),
      finPhone: ref('-'),
      type: ref(),
      btn: ref(false),
    };
  },

  mounted() {
    this.getCustData();
  },
  watch: {
    current(newVal) {
      this.getCustData();
    },
  },
  methods: {
    async addCustomer() {
      if (
        !this.customerName ||
        !this.type  ||
        !this.contactName  ||
        !this.companyEmail
      ) {
       
        this.medium = false;
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill all the form data",
        });
        return;
      }
      let formData = new FormData();
      formData.append("name", this.customerName);
      formData.append("type", this.type);
      formData.append("contact", this.contactName);
      formData.append("phone", this.phoneNumber);
      formData.append("email", this.companyEmail);
      formData.append("npwp", this.companyNPWP);
      formData.append("address", this.companyAdress);
      formData.append("fincontact", this.finNameContact);
      formData.append("fincontact_phone", this.finPhone);

      const token = sessionStorage.getItem("token");
      try {
        this.btn = true;
        const response = await this.$api.post("/customer/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
        }
        this.getCustData()

        // status ? this.$router.push("/order") : ""
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
      this.type = null;
      this.customerName = null;
      this.contactName = null;
      this.phoneNumber = null;
      this.companyEmail = null;
      this.companyNPWP = null;
      this.companyAdress = null;
      this.finNameContact = null;
      this.finPhone = null;
    },
    async getCustData() {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `/customer/cust?pageNumber=${this.current}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.custList = response.data.data;
        this.current = response.data.pageNumber;
        this.totalPage = response.data.totalPage;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
