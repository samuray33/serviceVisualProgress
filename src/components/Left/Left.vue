<script setup>
import { ref, computed, inject } from 'vue'; 
import Button from '../UIComponents/Button.vue';
import List from './List.vue';

const listPosts = inject('listPosts');

const searchQuery = ref('');

const filteredList = computed(() => {
  if (!searchQuery.value) return listPosts.value;
  
  const query = searchQuery.value.toLowerCase();
  return listPosts.value.filter(item => 
    item.name.toLowerCase().includes(query) || 
    (item.description && item.description.toLowerCase().includes(query))
  );
});
</script>

<template>
    <section class="top">
        <input class="searchInput" type="text" placeholder="Search" v-model="searchQuery">
    </section>
    <div class="line"></div>
    <List :items="filteredList" />
</template>

<style scoped>
.top{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.searchInput{
    width: 100%;
    height: 30px;
    padding: 5px 10px;
    border-radius: 10px;
    border:none;
    box-shadow: 0px 0px 2px #000;
    outline: none;
    font-size: 15px;
}

.line{
    border-bottom: 1px solid silver;
    margin-top: 10px;
}
</style>