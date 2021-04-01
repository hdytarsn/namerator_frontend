<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="/img/logo/logo-wh.png" alt="logo">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
            <img src="img/brand/blue.png" alt="logo">
          </router-link>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text font-weight-bold">Namerator Hakkında</span>
          </a>
          <div class="dropdown-menu-inner">
            <router-link class="media d-flex align-items-center" :to="{name:'howToPlay'}">
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">Nasıl Oynanır?</h6>
                <p class="description d-none d-md-inline-block mb-0">Namerator tek başınıza ya da arkadaşlarınızla
                  oynayabileceğiniz bir isim bulma oyunudur.</p>
              </div>
            </router-link>
          </div>
        </base-dropdown>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item  ml-lg-4">
          <router-link :to="{name:isLogged?'profile':'login'}" class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon">
                  <i class="fa fa-user mr-2"></i>
                </span>
            <span class="nav-link-inner--text">{{isLogged?this.$store.state.user.user.name:'GİRİŞ YAP'}}</span>
          </router-link>
        </li>
        <li>
          <button class="btn btn-danger" type="button" @click="logout()" v-if="isLogged">
            Çıkış Yap
          </button>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import {mapGetters} from 'vuex';

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  computed: {
    ...mapGetters([
      'isLogged'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
};
</script>
<style>
</style>
