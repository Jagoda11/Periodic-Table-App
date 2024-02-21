<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/periodic-table">Periodic Table</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px; /* Base font size */
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem; /* Adjust font size for larger screens */
    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media (max-width: 767px) {
  nav {
    font-size: 0.8rem; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 480px) {
  nav {
    font-size: 0.7rem; /* Adjust font size for extra small screens */
  }
}

@media (max-width: 320px) {
  nav {
    font-size: 0.6rem; /* Adjust font size for smallest mobile screens */
  }
}

/* Ensure compatibility with all evergreen browsers */
@supports (-ms-ime-align: auto) {
  /* Styles for Microsoft Edge */
  nav {
    font-size: 0.9rem; /* Adjust font size for Microsoft Edge */
  }
}

@supports (-webkit-touch-callout: none) {
  /* Styles for Safari and other WebKit browsers */
  nav {
    font-size: 0.9rem; /* Adjust font size for Safari and other WebKit browsers */
  }
}

/* Media queries for larger screens */
@media (min-width: 1200px) {
  nav {
    font-size: 1.1rem; /* Adjust font size for larger screens */
  }
}

@media (min-width: 1440px) {
  nav {
    font-size: 1.2rem; /* Adjust font size for even larger screens */
  }
}

@media (min-width: 1920px) {
  nav {
    font-size: 1.4rem; /* Adjust font size for very large screens */
  }
}
</style>


