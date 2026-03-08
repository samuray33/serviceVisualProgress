<script setup>
import { defineProps, inject } from 'vue';
import ProgressBar from '../UIComponents/ProgressBar.vue';
import Button from '../UIComponents/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});


const editSession = inject('editSession');
const listPosts = inject('listPosts');
const g_listName = inject('listName');
const g_listDescription = inject('listDescription');
const g_valProgBar = inject('valProgBar');
const g_stateAddPost = inject('stateAddPost');

let delPost = (index) => {

  if (listPosts) {
    listPosts.value.splice(index, 1);
  }
}

let valRedact = (item, index) => {

  editSession.isActive = true;
  editSession.itemIndex = index;


  g_listName.value = item.name;
  g_listDescription.value = item.description || '';
  g_valProgBar.value = item.progBar;


  g_stateAddPost.value = 1; 
  router.push('./AddPost');
}
</script>

<template>
    <div 
      v-if="props.items.length > 0" 
      class="lists" 
      v-for="(list, index) in props.items" 
      :key="index"
      @click="valRedact(list, index)"
      style="cursor: pointer;"
    >
        <h1>{{ list.name }}</h1>
        <div class="rightInfo">
          <ProgressBar :value="list.progBar" :size="100"/>

          <Button @click.stop="delPost(index)" value-button="удалить" />
        </div>
    </div>
    <h1 v-else>Нет прогресса или нет подходящего прогресса</h1>
</template>

<style scoped>
.lists{
    display: flex;
    justify-content: space-between;
    margin: 10px;
    padding: 10px;
    border: 1px solid silver;
    border-radius: 10px;
}
.rightInfo{
  display: flex;
  align-items: center;
}
</style>