<script setup>
import { ref, provide, watch, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import ProgressBar from './components/UIComponents/ProgressBar.vue';
import Button from './components/UIComponents/Button.vue';


let valProgBar = ref(0);
let listName = ref('');
let listDescription = ref('');
let stateAddPost = ref(0);

provide("valProgBar", valProgBar);
provide("listName", listName);
provide("listDescription", listDescription);
provide("stateAddPost", stateAddPost);

let listPosts = ref([]);
provide('listPosts', listPosts);


const editSession = reactive({
  isActive: false,      
  itemIndex: -1,       
});
provide('editSession', editSession);


watch([listName, listDescription, valProgBar], () => {

  if (editSession.isActive || !listName.value || !listDescription.value) {
    return;
  }



  if (stateAddPost.value === 0) {

     const last = listPosts.value[listPosts.value.length - 1];
     if (!last || last.name !== listName.value) {
        listPosts.value.push({
          name: listName.value,
          description: listDescription.value,
          progBar: valProgBar.value,
        });
     }
  }
}, { deep: true });

let averageNumber = computed(() => {
  const posts = listPosts.value;
  
  if (posts.length == 0) {
    return 0;
  }

  const totalSum = posts.reduce((sum, post) => {
    return sum + (post.progBar || 0); 
  }, 0);

  return Math.round(totalSum / posts.length);
});

let AddPost = () => {

  editSession.isActive = false;
  editSession.itemIndex = -1;
  

  listName.value = '';
  listDescription.value = '';
  valProgBar.value = 0;

  router.push('./AddPost');
  stateAddPost.value = 1;
}
</script>

<template>
  <div class="content">
    <section class="left">
      <div class="btmAddPost">
        <h1>Service Visual Progress(SVP)</h1>
        <Button @click="AddPost" :valueButton="'+'"/>
      </div>

      <RouterView :items="listPosts" />
    </section>

    <section class="right">
      <h1>Хаитов Некруз Самиджонович</h1>
      <ProgressBar v-show="stateAddPost == 1" :value="valProgBar" :size="400" class="progressBar"/>
      <ProgressBar v-show="stateAddPost == 0" :value="averageNumber" :size="400" class="progressBar"/>
    </section>
  </div>
</template>
  
<style scoped>
.content{
	margin: 0 auto;
  max-width: 1305px;
  display: flex;
  justify-content: space-evenly;
}

.left{
  width: 630px;
}

.right h1{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 70px;
}
.right .progressBar{
  width: 630px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btmAddPost{
  display: flex;
  align-items: center;
}

</style>
