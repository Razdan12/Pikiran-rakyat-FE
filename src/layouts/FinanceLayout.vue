<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-white text-blue flex" style="height: 80px;">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-img class="q-my-md" src="../assets/prmn.png" style="width: 200px;" />
  
          <q-toolbar-title>
            <p class="text-black text-bold text-right">
              <span class="jam">{{ currentTime }}</span><br>
              <span class="tanggal"> {{ currentDate }}</span>
            </p>
          </q-toolbar-title>
        </q-toolbar>
  
      </q-header>
  
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <div>
          <q-img class="" src="../assets/bg2.jpg">
            <div class="bg-transparent tw-w-full">
              <div class="flex ">
                <div class="">
                  <q-avatar size="56px" class="q-mb-sm">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </div>
                <div class="q-ml-md">
                  <div class="text-weight-bold text-black">{{ name }}</div>
                  <div class="text-black">{{ email }}</div>
                  <div class="text-black">{{ role }}</div>
                </div>
    
              </div>
            </div>
          </q-img>
        </div>
        <!-- <div>
        </div> -->
        <q-list padding class="menu-list">
          
  
          <q-item active clickable v-ripple to="/finance/order-list">
            <q-item-section avatar>
              <q-icon name="supervised_user_circle" />
            </q-item-section>
  
            <q-item-section>
              Order
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/finance/molist">
            <q-item-section avatar>
              <q-icon name="perm_media" />
            </q-item-section>
  
            <q-item-section>
              Media Order
            </q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/finance/report">
            <q-item-section avatar>
              <q-icon name="summarize" />
            </q-item-section>
  
            <q-item-section>
              Report
            </q-item-section>
          </q-item>
  
        </q-list>
        <div class="text-center">
          <q-btn style="background: rgb(248, 87, 87); color: white; width: 90%" label="Logout" @click="logOut" />
        </div>
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <style>
    .jam{
      font-size: larger;
    }
    .tanggal{
      font-size: medium;
    }
    @media (min-width: 768px) and (max-width: 1199px) {
    }
    
    @media (max-width: 768px) {
      .jam{
        font-size: medium;
      }
      .tanggal{
        font-size: small;
      }
    }
    </style>
  
  
  
  <script>
  import Swal from 'sweetalert2';
  import { ref } from 'vue'
  
  export default {
    setup() {
      const leftDrawerOpen = ref(false);
      return {
        leftDrawerOpen,
          toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value;
          },
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
  
      logOut() {
        Swal.fire({
          title: "Log out?",
          text: "anda akan diarahkan ke halaman utama",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, logout"
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.removeItem("token");
            this.$router.push("/");
          }
        });
  
      },
    },
  }
  </script>
    
    
    