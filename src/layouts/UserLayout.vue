<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-img class="q-my-md" src="../assets/prmn.png" style="width: 15%;" />

        <q-toolbar-title>

        </q-toolbar-title>

        <div class="absolute-top-right">
          <p class="text-black text-bold text-right q-mx-md q-my-sm">
            <span style="font-size: 40px;">{{ currentTime }}</span><br>
            <span> {{ currentDate }}</span>
          </p>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" show-if-above>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple class="q-mt-md" to="/user" disable>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/customer">
            <q-item-section avatar>
              <q-icon name="supervised_user_circle" />
            </q-item-section>

            <q-item-section>
              Customer Form
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/order">
            <q-item-section avatar>
              <q-icon name="shop_two" />
            </q-item-section>

            <q-item-section>
              Order
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/quotation">
            <q-item-section avatar>
              <q-icon name="request_quote" />
            </q-item-section>

            <q-item-section>
              Quotation
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/molist">
            <q-item-section avatar>
              <q-icon name="perm_media" />
            </q-item-section>

            <q-item-section>
              Media Order
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/oti">
            <q-item-section avatar>
              <q-icon name="content_copy" />
            </q-item-section>

            <q-item-section>
              Order Tayang Iklan
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/report">
            <q-item-section avatar>
              <q-icon name="summarize" />
            </q-item-section>

            <q-item-section>
              Report
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="download" />
            </q-item-section>

            <q-item-section>
              Download
            </q-item-section>
          </q-item>
        </q-list>

      </q-scroll-area>



      <q-img class="absolute-top" src="../assets/bg2.png">
        <div class="absolute-bottom bg-transparent">
          <div class="row">
            <div class="col-md-4">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </div>
            <div class="col-md-8">
              <div class="text-weight-bold text-black">{{ name }}</div>
              <div class="text-black">{{ email }}</div>
              <div class="text-black">{{ role }}</div>
            </div>

          </div>
        </div>
      </q-img>
    </q-drawer>
    <div>
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>


  </q-layout>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      drawer: ref(false),
      name: ref(sessionStorage.getItem("name")),
      email: ref(sessionStorage.getItem("email")),
      role: ref(sessionStorage.getItem("role")),
      currentDate: ref(''),
      currentTime: ref(''),
    }
  },
  mounted() {
    this.getCurrentDateTime();
    setInterval(() => {
      this.getCurrentDateTime();
    }, 60000);
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' });
      const formattedTime = now.toLocaleTimeString('id-ID', { hour: 'numeric', minute: 'numeric' });
      this.currentDate = formattedDate;
      this.currentTime = formattedTime;
    },
  },
}
</script>


