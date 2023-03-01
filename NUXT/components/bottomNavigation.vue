<template>
  <div
    v-if="!$route.path.includes('/mods') || $route.path.includes('/tweaks')"
    class="bottomNav background"
  >
    <v-divider v-if="!$store.state.tweaks.roundTweak" />
    <v-bottom-navigation
      v-model="tabSelection"
      style="
        box-shadow: none !important;
        padding: 0 !important;
        position: relative;
      "
      class="transparent nav"
      :shift="$store.state.tweaks.navigationShift"
    >
      <v-btn
        v-for="(item, i) in tabs"
        :key="i"
        v-ripple="false"
        active-class="link-active"
        class="navButton link"
        :to="item.link"
        plain
      >
        <span v-if="$store.state.tweaks.navigationText" v-text="item.name" />
        <div
          v-if="$store.state.tweaks.navigationIcons !== 0"
          class="px-3"
          :style="{
            color:
              tabSelection == i
                ? 'var(--v-primary-base)'
                : $vuetify.theme.dark
                ? 'var(--v-background-lighten4)'
                : 'var(--v-background-darken4)',
          }"
          :class="
            tabSelection == i && $store.state.tweaks.navigationShift
              ? $vuetify.theme.dark
                ? 'tab primary darken-4'
                : 'tab primary lighten-4'
              : ''
          "
        >
          <svg
            v-if="$store.state.tweaks.navigationIcons === 1"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 50 50"
            height="1.5rem"
            width="1.5rem"
            class="mt-1"
          >
            <use :href="`/${item.svg}.svg#main`" />
          </svg>
          <svg
            v-if="$store.state.tweaks.navigationIcons === 2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 21 21"
            height="1.5rem"
            width="1.5rem"
            class="mt-1"
          >
            <use :href="`/${item.svg2}.svg#main`" />
          </svg>
          <svg
            v-if="$store.state.tweaks.navigationIcons === 3"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 33 33"
            height="1.5rem"
            width="1.5rem"
            class="mt-1"
          >
            <use :href="`/${item.svg3}.svg#main`" />
          </svg>
        </div>
        <v-icon
          v-if="$store.state.tweaks.navigationIcons === 0"
          class="my-1"
          :color="
            tabSelection == i
              ? 'primary'
              : $vuetify.theme.dark
              ? 'background lighten-4'
              : 'background darken-4'
          "
          :class="
            tabSelection == i && $store.state.tweaks.navigationShift
              ? $vuetify.theme.dark
                ? 'tab primary darken-4'
                : 'tab primary lighten-4'
              : ''
          "
          v-text="item.icon"
        />
        <!-- + (tabSelection == i ? '' : '-outline') -->
      </v-btn>
      <div
        v-if="!$store.state.tweaks.navigationShift"
        :style="{
          top: $store.state.tweaks.navigationText ? '0.35rem' : '0.75rem',
        }"
        class="link-anime"
      ></div>
      <!-- <v-btn
        text
        class="navButton mr-2 fill-height"
        color="white"
        @click="searchBtn()"
        ><v-icon>mdi-magnify</v-icon></v-btn
      > -->
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabSelection: 0,
      tabs: [
        // TODO: pull from Vuex & localStorage for customizations
        {
          name: "",
          icon: "mdi-home",
          svg: "home",
          svg2: "fhome",
          svg3: "chome",
          link: "/home",
        },
        // { name: "Shorts", icon: "mdi-lightning-bolt", link: "/shorts" },
        // { name: "Upload", icon: "mdi-plus", link: "/upload" },
        {
          name: "",
          icon: "mdi-youtube-subscription",
          svg: "subs",
          svg2: "fsubs",
          svg3: "csubs",
          link: "/subscriptions",
        },
        {
          name: "",
          icon: "mdi-view-list",
          svg: "list",
          svg2: "flist",
          svg3: "clist",
          link: "/library",
        },
        // { name: "Settings", icon: "mdi-menu", link: "/settings" },
      ],
    };
  },

  mounted() {
    const lang = this.$lang("global");
    this.tabs[0].name = lang.home;
    this.tabs[1].name = lang.subscriptions;
    this.tabs[2].name = lang.library;
  },
};
</script>

<style scoped>
.link-anime {
  right: 0;
  height: 2rem;
  width: 3.25rem;
  position: absolute;
  transition: transform 0.15s ease-in-out, scale 0.1s ease;
  background-color: var(--v-primary-base);
  padding: 0.1em 0.5em 0.1em 0.5em;
  border-radius: 2rem;
  opacity: 0.25;
  z-index: -1;
  scale: 0;
}
/* TODO: calculate inside <template></template> based on tabs.length */
.nav .link:first-child.link-active ~ .link-anime {
  transform: translateX(calc(-75vw + 50%));
  scale: 1;
}
.nav .link:nth-child(2).link-active ~ .link-anime {
  transform: translateX(calc(-50vw + 50%));
  scale: 1;
}
.nav .link:nth-child(3).link-active ~ .link-anime {
  transform: translateX(calc(-25vw + 50%));
  scale: 1;
}
.bottomNav {
  /* box-shadow: inset 0 0 10rem var(--v-background-base) !important; */
  height: calc(4rem + env(safe-area-inset-bottom)) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  box-shadow: none !important;
  position: fixed;
  z-index: 100;
  width: 100%;
  bottom: 0;
}
.navButton {
  width: 25vw !important;
  font-size: 0.66rem !important;
}
.tab {
  padding: 0.1em 0.5em 0.1em 0.5em;
  border-radius: 2rem;
}
</style>
