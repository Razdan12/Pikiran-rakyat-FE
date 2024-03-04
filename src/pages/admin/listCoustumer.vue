<template>
  <q-page>
    <div class="q-pa-md">
      <div class="col-md-10">
        <q-card class="full-width">
          <q-card-section>
            <p class="text-center text-bold" style="font-size: large">
              CUSTOMER LIST
            </p>
            <q-separator class="q-my-md" color="light-blue-7" inset />
            <div class="text-right q-pa-md">
              <q-btn color="cyan" icon="add" @click="medium = true">
                <q-tooltip class="bg-cyan text-body2" :offset="[10, 10]">
                  Tambah Customer
                </q-tooltip>
              </q-btn>
            </div>
            <div>
              <q-markup-table>
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
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in custList" :key="item.id">
                    <td class="text-left">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.custname }}</td>
                    <td class="text-center">{{ item.contactName }}</td>
                    <td class="text-center">
                      {{ item.phone}}
                    </td>
                    <td class="text-center">
                      {{ item.email }}
                    </td>
                    <td class="text-center">
                      {{ item.address }}
                    </td>
                    <td class="text-center">
                      {{ item.finName }}
                    </td>
                    <td class="text-center">
                      {{ item.finContact  }}
                    </td>
                    <td class="text-center">
                      <q-btn-group>
                        <q-btn color="orange" icon="border_color" @click="handleEdit(item.id)">
                          <q-tooltip class="bg-orange text-body2" :offset="[10, 10]">
                            Edit
                          </q-tooltip>
                        </q-btn>
                        <!-- <q-btn color="blue" icon="article">
                          <q-tooltip class="bg-blue text-body2" :offset="[10, 10]">
                            Detail
                          </q-tooltip>
                        </q-btn> -->
                        <q-btn color="red" icon="delete" @click="deleteItem(item.id)">
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
                <q-input v-model="companyNPWP" class="q-my-md" dense outlined label="Company NPWP" mask="##.###.###.#-###.###" fill-mask />
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
    <q-dialog v-model="edit">
      <q-card style="width: 700px; max-width: 80vw" class="justify-center q-pa-md">
        <q-scroll-area style="height: 70vh" class="q-pa-sm">
          <p class="text-center text-bold" style="font-size: x-large">
            EDIT CUSTOMER
          </p>
          <q-separator class="q-my-lg" color="orange" inset />
          <q-form @submit.prevent="editCustomer">
            <div class="col">

              <div class="q-mt-md">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="portrait" />
                  <span class="text-bold" style="font-size: medium">
                    Customer Name</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ customerName == 'null' ? '-' : customerName }}
                    <q-popup-edit v-model="customerName" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
              <div class="tw-mt-5">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="portrait" />
                  <span class="text-bold" style="font-size: medium">
                    Contact Name</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ contactName == 'null' ? '-' : contactName }}
                    <q-popup-edit v-model="contactName" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
              <div class="tw-mt-5">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="local_phone" />
                  <span class="text-bold" style="font-size: medium">
                    Contact Phone Number</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ phoneNumber == 'null' ? '-' : phoneNumber }}
                    <q-popup-edit v-model="phoneNumber" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
              <div class="tw-mt-5">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="email" />
                  <span class="text-bold" style="font-size: medium">
                    Company Email</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ companyEmail == 'null' ? '-' : companyEmail }}
                    <q-popup-edit v-model="companyEmail" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
              <div class="tw-mt-5">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="numbers" />
                  <span class="text-bold" style="font-size: medium">
                    Company NPWP</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ companyNPWP == 'null' ? '-' : companyNPWP }}
                    <q-popup-edit v-model="companyNPWP" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" mask="##.###.###.#-###.###" fill-mask />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
              <div class="tw-mt-5">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="home_filled" />
                  <span class="text-bold" style="font-size: medium">
                    Company Address</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ companyAdress == 'null' ? '-' : companyAdress }}
                    <q-popup-edit v-model="companyAdress" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
              <div class="tw-mt-5">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="portrait" />
                  <span class="text-bold" style="font-size: medium">
                    Finance Contact Name (Optional)</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ finNameContact == 'null' ? '-' : finNameContact }}
                    <q-popup-edit v-model="finNameContact" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
              <div class="tw-mt-5">
                <p class="text-bold text-blue" style="font-size: medium">
                  <q-icon name="local_phone" />
                  <span class="text-bold" style="font-size: medium">
                    Finance Phone Number</span>
                </p>
                <q-card class="my-card q-pa-sm" flat bordered>
                  <div class="cursor-pointer">
                    {{ finPhone == 'null' ? '-' : finPhone }}
                    <q-popup-edit v-model="finPhone" auto-save v-slot="scope">
                      <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>
                </q-card>

              </div>
            </div>
            <div class="text-right">
              <q-card-actions align="right">
                <q-btn class="q-mx-sm" type="submit" color="secondary" label="Create" :disable="btn" />
                <q-btn color="black" label="Cancel" v-close-popup @click="resetForm()" />
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
      edit: ref(false),
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
      id: ref('')
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

      // Check if all form data is filled
      const token = sessionStorage.getItem("token");

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
          this.getCustData();
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
      this.type = '';
      this.customerName = '';
      this.contactName = '';
      this.phoneNumber = '';
      this.companyEmail = '';
      this.companyNPWP = '';
      this.companyAdress = '';
      this.finNameContact = '';
      this.finPhone = '';
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

    async deleteCust(id) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.delete(`/customer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          title: "Deleted!",
          text: "Customer has been deleted.",
          icon: "success",
        });
        this.getCustData()
      } catch (error) {
        console.log(error);
      }
    },

    deleteItem(id) {
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
          this.deleteCust(id);
        }
      });
    },

    async getCustomerById(id) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `/customer/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        this.customerName = response.data.name
        this.contactName = response.data.picName
        this.phoneNumber = response.data.phone
        this.companyEmail = response.data.email
        this.companyNPWP = response.data.npwp
        this.companyAdress = response.data.address
        this.finNameContact = response.data.finContact
        this.finPhone = response.data.finPhone
      } catch (error) {
        console.log(error);
      }
    },

    handleEdit(id) {
      this.edit = true
      this.getCustomerById(id)
      this.id = id
    },

    async editCustomer() {
      const data = {
        name: this.customerName,
        contact: this.contactName,
        phone: this.phoneNumber,
        email: this.companyEmail,
        npwp: this.companyNPWP,
        address: this.companyAdress,
        fincontact: this.finNameContact,
        fincontact_phone: this.finPhone,
      }
      const token = sessionStorage.getItem("token");
      try {
        this.btn = true;

        const response = await this.$api.patch(`/customer/edit-cust/${this.id}`, data, {
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
          this.getCustData()
        }
      } catch (error) {
        // console.log(error);
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

  },
};
</script>
