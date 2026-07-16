<script setup>
import { reactive, computed } from 'vue'

const appState = reactive({
    theme: 'dark',
    userRole: 'user',
    ui: {
        sidebarOpen: true,
        hasError: false
    },
    menu: ['menu-1', 'menu-2', 'menu-3']
})

const toggleTheme = () => {
    appState.theme = appState.theme === 'dark' ? 'light' : 'dark'
}

const sidebarClasses = computed(() => {
    return [
        'border-l-4 w-64 translate-x-0 transition-all duration-300',
        appState.theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900',
        appState.userRole === 'admin' ? 'border-rose-500' : "",
        appState.userRole === 'user' ? 'border-fuchsia-500' : "",
    ]
})

const dynamicStyles = computed(() => {
    return {
        display: appState.ui.sidebarOpen ? 'block' : 'none',
        opacity: appState.ui.hasError ? 0.5 : 1,
    }
})


</script>

<template>
    <div class="p-4">
        <button @click="toggleTheme" class="mb-4 p-2 border rounded">
            Toggle to <span v-if="appState.theme == 'dark'">Light</span> <span v-else>Dark</span> Mode
        </button>

        <div>
            <ul>
                <li v-for="item in appState.menu">
                    <a href="" v-if="item !== 'menu-2'">{{ item }}</a>
                </li>
            </ul>
        </div>

        <aside :class="sidebarClasses" class="p-4 rounded shadow-lg" :style="dynamicStyles">
            <h3>Dashboard Sidebar</h3>
            <p>Role: {{ appState.userRole }}</p>
            <p>Current Theme: {{ appState.theme }}</p>
        </aside>
    </div>
</template>