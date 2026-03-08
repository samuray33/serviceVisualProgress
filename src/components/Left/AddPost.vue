<script setup>
import { inject, ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../UIComponents/Button.vue';

const router = useRouter();

let progressBar = ref(0);
let LISTNAME = ref("");
let LISTDESCRIPTION = ref("");

let valProgBar = inject('valProgBar');
let listName = inject('listName');
let listDescription = inject('listDescription');
let stateAddPost = inject('stateAddPost');


const editSession = inject('editSession');
const listPosts = inject('listPosts');


onMounted(() => {
  if (editSession && editSession.isActive) {

    LISTNAME.value = listName.value;
    LISTDESCRIPTION.value = listDescription.value;
    progressBar.value = valProgBar.value;
  } else {

    if (!editSession.isActive) {

    }
  }
});

watch(progressBar, () => {
    if(valProgBar) valProgBar.value = Number(progressBar.value);
});

let Submit = () => {
    if(LISTNAME.value.length > 0 && LISTDESCRIPTION.value.length > 0){
        
        if (editSession && editSession.isActive) {

            
            const index = editSession.itemIndex;
            

            if (listPosts && index !== -1) {
                listPosts.value[index].name = LISTNAME.value;
                listPosts.value[index].description = LISTDESCRIPTION.value;
                listPosts.value[index].progBar = Number(progressBar.value);
            }

   
            editSession.isActive = false;
            editSession.itemIndex = -1;
            

            stateAddPost.value = 0;
            router.push('../../');
            
        } else {

            

            listName.value = LISTNAME.value;
            listDescription.value = LISTDESCRIPTION.value;
            valProgBar.value = Number(progressBar.value);
            
            stateAddPost.value = 0;
            router.push('../../');
        }
    } else {
        alert("Не все поля заполнены");
    }
}
</script>

<template>
    <h2>{{ editSession?.isActive ? 'Редактирование прогресса' : 'Progress Name' }}</h2>
    
    <input class="nameProgress" type="text" v-model="LISTNAME" placeholder="Enter the progress name">

    <h2>Description</h2>
    <textarea class="description" v-model="LISTDESCRIPTION" placeholder="Enter the description"></textarea>

    <h2>Progress Bar</h2>
    <input class="progressBar" type="range" v-model="progressBar">

    <div class="Btms">
        <Button @click="Submit" :value-button="editSession?.isActive ? 'Сохранить' : 'Ready'"/>
    </div>
</template>

<style scoped>
.nameProgress{
    width: 69%;
    height: 30px;
    padding: 5px 10px;
    border-radius: 10px;
    border:none;
    box-shadow: 0px 0px 2px #000;
    outline: none;
    font-size: 15px;
}
.description{
    width: 69%;
    height: 30%;
    font-size: 15px;
    padding: 10px;
    resize: none;
    border-radius: 10px;
    outline: none;
    border:none;
    box-shadow: 0px 0px 2px #000;
}
.progressBar{
    width: 72%;
}
.Btms{
    width: 69%;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
</style>