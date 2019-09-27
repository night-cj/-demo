<template>
  <i :class="'dj-common- ' + name"></i>
</template>

<script>
  export default {
    name: 'dj-icon',

    props: {
      name: String
    }
  };
</script>
