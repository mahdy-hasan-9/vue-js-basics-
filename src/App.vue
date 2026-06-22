<script>

import { ref } from 'vue'

export default {
  setup() {
    const user = ref({
      name: "mhdy",
      status: 'conductor',
      tasks: [
        {
          id: 1,
          link: 'https://google.com',
          name: 'Task-1'
        },
        {
          id: 2,
          link: 'https://linkedin.com',
          name: "Task-2"
        },
        {
          id: 3,
          link: "https://claude.com",
          name: "Task-3"
        },
        {
          id: 4,
          link: "https://facebook.com",
          name: "Task-4"
        },
        {
          id: 5,
          link: "https://youtube.com",
          name: "Task-5"
        }
      ]
    })


    const newTask = ref("");
    const newLink = ref("");

    const clicked = () => {
      console.log('clicked');
      user.value.status = "conductor";
    }

    const addTask = () => {
      const data = {
        link: newLink.value,
        name: newTask.value
      }
      user.value.tasks.unshift(data);
      newTask.value = "";
      newLink.value = "";
    }

    const updateTask = (id) => {
      const element = user.value.tasks.find(item => item.id == id)
      newTask.value = element.name;
      newLink.value = element.link;
      const data = {
        name: newTask.value,
        link: newLink.value
      }
      element.value.name = newTask.value;
      element.value.link = newLink.value;
      newTask.value = "";
      newLink.value = "";
    }


    const deleteTask = (id) => {
      // user.value.tasks.splice(index, 1); remove one element from this index
      const value = user.value.tasks.filter((item) => item.id != id);
      user.value.tasks = value;
    }


    return {
      user,
      clicked,
      addTask,
      newTask,
      newLink,
      deleteTask,
      updateTask
    }
  }
}
</script>

<template lang="">
  <div>
    <h3>this is dynamic data {{user.name}}</h3>
    <!-- <p>
      this user status is : <span>{{ user.status == true ? 'Active' : 'In Active'}}</span>
    </p> -->
    <p>
      this user status is : 
      <span v-if="user.status == 'conductor'" class='px-3 py-1 bg-lime-500 text-sm text-[#555] rounded-full'>
        Conductor 
      </span>
      <span v-else-if='user.status == "semi-conductor"'>
        eida hoilo giya semi-condactor 
      </span>
      <span v-else class='px-3 py-1 bg-orange-500 text-sm text-[#000] rounded-full'>
        contacter 
      </span>
    </p>


    <div>
      <h3 class="mb-3">
        Tasks : 
      </h3>
      <div class='border border-slate-900 inline-block p-5 ml-3 rounded-xl mb-5'>
        <form @submit.prevent="addTask">
          <div>
            <div>
              <label for="">enter task name</label>
            </div>
            <div>
              <input type="text" id='newTask' name='newTask' v-model='newTask' placeholder='Enter name'/>
            </div>
          </div>
          <div>
            <div>
              <label for="">enter task url</label>
            </div>
            <div>
              <input type="text" id="newLink" name="newLink" v-model="newLink" placeholder='Enter link'/>
            </div>
          </div>
          <div>
            <button type="submit" class='border border-orange-500 px-5 mt-2 rounded-md'>
              save 
            </button>
          </div>
        </form>
      </div>
    </div>


    <div>
      <p>
        List of Tasks : 
      </p>
      <p>
        <ul>
          <li v-for="(item , index) in user.tasks" :key='item.id' class="bg-slate-800 text-white mb-3">
            <a :href="item.link">
              {{item.name}} 
            </a>
            <span class="mx-5" @click="updateTask(item.id)">edit</span>
            <span class="" @click="deleteTask(item.id)">del</span>
          </li>
        </ul>
      </p>
    </div> 
    
    <div>
      <button @click="clicked">
        clicked
      </button>
    </div>

  </div>
</template>

<style lang="">

</style>